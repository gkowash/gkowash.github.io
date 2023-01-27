$(document).ready(function(){

  $.getJSON("./data/work_samples.json", function(data) {
    addWorkSamples(data);
  }).fail(function(){
    console.log("An error has occurred during $.getJSON");
  });
});



function addWorkSamples(data) {
  /* Add work samples from JSON data to HTML unordered list */
  data.forEach( function(entry) {

    var links_str = "";
    entry.links.forEach( link => links_str += `<a href=${link[1]}>${link[0]}</a>\n` );

    var html_str = `
      <li data-tags="${entry.tags.join(", ")}">
        ${entry.title}
        <p>
          ${entry.summary}
          <br><br>
          ${entry.demonstrates}
        </p>
        <div class="links-tags">
          ${links_str}
          <p class="tags">Tags: ${entry.tags.join(", ")}</p>
        </div>
      </li>`;

    $(".work-samples > ul").append(html_str);

  });

  addTagCheckboxes();
};

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
};

function getAllTags() {
  return getTagsList(onlyChecked=false);
};

function getCheckedTags() {
  return getTagsList(onlyChecked=true);
};

function getTagID(tag) {
  /* Handles forbidden characters in HTML tags (+, whitespace, etc.) */
  if (tag === "C++") {return "Cpp"}
  if (tag === "Data analysis") {return "Data-analysis"}
  else {return tag}
};

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
};

function updateVisibilityByTag() {
  /* Update work sample visibility when a tag checkbox is toggled */
  var checkedTags = getCheckedTags();
  console.log(checkedTags);

  // If at least one of a work sample's tags is checked, make it visible
  $(".work-samples li").each(function(index) {
    var entry = this;
    entry.style.display = "none";  // set to invisible by default

    entry.dataset.tags.split(", ").forEach(function(tag) {
      if (checkedTags.includes(tag)) {
        entry.style.display = "flex"; // previously "block"; modified to test new layout
      }
    });
  });
};
