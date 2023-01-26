// Tag setup
$(document).ready(function(){

  /*** Read tag data and update list items ***/
  var tags = [];

  $(".work-samples li").each(function(index) {
    // get tag list from data attribute
    var string = this.dataset.tags;
    var data = string.split(", ");

    // update list of all tags
    data.forEach(function(tag) {
      if (tag!="" && !tags.includes(tag)) {
        tags.push(tag);
      }
    });

    // insert tag text into each list item
    $("p.tags", this).text("Tags: " + string);
  });

  console.log("All tags: " + tags);


  /*** Insert checkboxes for tag filtering ***/
  var tagDiv = $("#tag-selector");

  tags.forEach(function(tag) {
    tagDiv.append(`<input type="checkbox" id="${tag}" name="accept" value="yes" onclick=toggleVisibilityByTag(this)>`);
    tagDiv.append(`<label for="${tag}"> ${tag} </label>`);
  });

});


// Update visibility by tag

function toggleVisibilityByTag(obj) {
  var tag = obj.id;

  if ($(obj).is(":checked")) {
    var display = "block";
  }
  else {
    var display = "none";
  }

  console.log(obj);

  $(".work-samples li").each(function(index) {
    if (this.dataset.tags.includes(tag)) {
      this.style.display = display;
    }
  });

  /*if ($(obj).is(":checked")) {
    $(obj).style.display = "block";
  }
  else {
    $(obj).style.display = "none";
  }*/
}
