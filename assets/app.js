$(document).ready(function() {

var actions = ["chinese", "tailand","england","spanish","american","australia"]

function generateButtons() {
  $("#buttonList").empty();
  for (var i = 0; i < actions.length; i++) {
    var Button = $("<button>");
    Button.addClass("action");
    Button.addClass("btn btn-primary");
    Button.attr("data-name", actions[i]);
    Button.text(actions[i]);
    $("#buttonList").append(Button);
  }
}

function newButton() {
  $("#newGif").on("click", function(){
    var action = $("#action-input").val().trim();
    if (action == "") {
      return false;
    }
    else{
      actions.push(action);
      generateButtons();
      return false;
    }
  });
}

function playGifs() {
  var action = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=2wmHdUdU2HuK5fbC3pTponVmPi6k5dBM";

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
   // console.log(response);
    $("#gifs").empty();
    var results = response.data;
   // console.log(results);
    if (results == "") {
      alert("try again!")
    }
    else{
      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");
        gifDiv.addClass("gifDiv");
        var rating = $("<p>").text(results[i].rating);
        gifDiv.append(rating);
        console.log(rating);

        var gif = $("<img>");
         gif.attr("src", results[i].images.fixed_height_small_still.url); 
         gif.attr("data-still",results[i].images.fixed_height_small_still.url); 
         gif.attr("data-animate",results[i].images.fixed_height_small.url); 
         gif.attr("data-state", "still"); 
         gif.addClass("image");
         gifDiv.append(gif);

         $("#gifs").prepend(gifDiv);
      }
    }
  });
}

generateButtons();
newButton();

$(document).on("click",".action", playGifs);
$(document).on("click",".image", function() {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).data('animate'));
    $(this).attr('data-state','animate');
  }
  else{
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state','still');
  }
});

});