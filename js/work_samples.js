$(document).ready(function(){

  $.getJSON("./data/work_samples.json", function(data) {
    addWorkSamples(data);
  }).fail(function(){
    console.log("An error has occurred during $.getJSON");
  });

 parseURLQuery();
 setTimeout(updateVisibilityByTag, 50); //hacky fix for what's probably a glaring hole in my JavaScript knowledge

});

function addWorkSamples(data) {
  /* Add work samples from JSON data to HTML unordered list */
  data.forEach( function(entry) {

    var links_str = "";
    entry.links.forEach( link => links_str += `<a href=${link[1]} target="_blank">${link[0]}</a>\n` );

    var html_str = `
      <li data-tags="${entry.tags.join(", ")}">
        ${entry.title}
        <div class="description">
          <p>
            ${entry.summary}
            <br><br>
            ${entry.demonstrates}
          </p>
        </div>
        <div class="links-tags">
          ${links_str}
          <p class="tags">Tags: ${entry.tags.join(", ")}</p>
        </div>
      </li>`;

    $(".work-samples > ul").append(html_str);

  });

  //addTagCheckboxes();
}

function getURLParameter(sParam) //from learningjquery.com
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function parseURLQuery() {
  /* Check any filters specified in URL */
  var params = getURLParameter("checked");

  if (typeof(params) == "string") {
    params = params.split(",");

    params.forEach( function(param) {
      var checkbox = document.getElementById(param);
      if (checkbox != null) {
        $(checkbox).prop("checked", true);
        console.log("Checking " + param);
      }
      else {
        console.log("Element " + param + " in parseURLQuery() does not exist.");
      }
    });
  }
}

function getTagsList(onlyChecked=false) {
  /* Get list of tags in use, option to filter only selected tags */
  var tags = [];

  $(".work-samples li").each(function(index) {
    // get tag list for a given work sample
    var string = this.dataset.tags;
    var data = string.split(", ");

    // update master list of tags
    data.forEach(function(tag) {
      var tagID = getTagID(tag);
      let isChecked = $(`#${tagID}`).is(":checked");

      if (tag!="" && !tags.includes(tag)) {
        if (isChecked || !onlyChecked) {
          tags.push(tag);
        }
      }
    });
  });

  return tags;
}

function getAllTags() {
  return getTagsList(onlyChecked=false);
}

function getCheckedTags() {
  return getTagsList(onlyChecked=true);
}

function getTagID(tag) {
  /* Handles forbidden characters in HTML tags (+, whitespace, etc.) */
  if (tag === "C++") {return "Cpp"}
  if (tag === "C#") {return "Cs"}
  if (tag === "Data analysis") {return "Data-analysis"}
  if (tag === "Web design") {return "Web-design"}
  if (tag === "HTML/CSS") {return "HTML-CSS"}
  if (tag === "Audio/Video") {return "Audio-Video"}
  else {return tag}
}

/* Not currently in use! */
function addTagCheckboxes() {
  /* Insert checkboxes into HTML to enable tag-based filtering */
  var tags = getAllTags();

  console.log(tags);

  tags.forEach(function(tag) {
    var tagID = getTagID(tag);
    var html = `
      <div class="tag-selector" id="${tagID + "-div"}">
        <input type="checkbox" id="${tagID}" name="accept" value="yes" onclick=updateVisibilityByTag()>
        <label for="${tagID}"> ${tag} </label>
      </div>`;
    $("#tag-selector-div").append(html);
  });
}

function updateVisibilityByTag() {
  /* Update work sample visibility when a tag checkbox is toggled */
  var atLeastOneVisible = false;
  var checkedTags = getCheckedTags();
  console.log("Checked tags: " + checkedTags);

  // If a work sample has at least one tag checked, make it visible
  $(".work-samples li").each(function(index) {
    var entry = this;
    entry.style.display = "none";  // set to invisible by default

    entry.dataset.tags.split(", ").forEach(function(tag) {
      if (checkedTags.includes(tag)) {
        entry.style.display = "flex"; // previously "block"; modified to test new layout
        atLeastOneVisible = true;
      }
    });
  });

  // If no work samples are visible, make all visible (could be more efficient)
  if (!atLeastOneVisible) {
    $(".work-samples li").each(function(index) {
      var entry = this;
      entry.style.display = "flex";
    });
  }
}
