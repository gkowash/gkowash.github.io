/* Get list of tags in use, option to filter only selected tags */
function getTagsList(onlyChecked=false) {
  var tags = [];

  $(".work-samples li").each(function(index) {
    // get tag list for a given work sample
    var string = this.dataset.tags;
    var data = string.split(", ");

    // update master list of tags
    data.forEach(function(tag) {
      let isChecked = $(`#${tag}`).is(":checked");

      if (tag!="" && !tags.includes(tag)) {
        if (isChecked || !onlyChecked) {
          tags.push(tag);
        }
      }
    });

    return tags;
  });
};

function getAllTags() {
  return getTagsList(onlyChecked=false);
};

function getCheckedTags() {
  return getTagsList(onlyChecked=true);
};


/* Insert checkboxes into HTML to enable tag-based filtering */
function addTagCheckboxes() {
  var tags = getAllTags();

  tags.forEach(function(tag) {
    $("#tag-selector").append(`<input type="checkbox" id="${tag}" name="accept" value="yes" onclick=updateVisibilityByTag()>`);
    $("#tag-selector").append(`<label for="${tag}"> ${tag} </label>`);
  });
};


/* Update work sample visibility when a tag checkbox is toggled */
function updateVisibilityByTag() {
  var checkedTags = getCheckedTags();

  // If at least one of a work sample's tags is checked, make it visible
  $(".work-samples li").each(function(index) {
    this.style.display = "none";  // set to invisible by default

    this.dataset.tags.forEach(function(tag) {
      if (checkedTags.includes(tag)) {
        this.style.display = "flex"; // previously "block"; modified to test new layout
        break;
      }
    };
  });
}
