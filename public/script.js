$(document).ready(function() {
  $("#get-comments").click(function() {
    var url =
      "https://smpjhi7oel.execute-api.us-east-1.amazonaws.com/development/comments";
    $.getJSON(url, showComments);
  });
  $("#get-user-comments").click(function() {
    var user = $("#current-user").val();
    var url =
      "https://smpjhi7oel.execute-api.us-east-1.amazonaws.com/development/comments?user=" +
      user;
    $.getJSON(url, showComments);
  });
  $("#delete-comments").click(function() {
    var url =
      "https://smpjhi7oel.execute-api.us-east-1.amazonaws.com/development/comments";
    $.ajax({
      url: url,
      type: "DELETE",
      success: function(result) {
        $("#comments > ul").html("");
      }
    });
  });
  $("#new-comment").click(function() {
    var payload = {
      user: $("#current-user").val(),
      text: $("#new-comment-text").val()
    };
    $("#request").html(JSON.stringify(payload));
    var url =
      "https://smpjhi7oel.execute-api.us-east-1.amazonaws.com/development/comments";
    $.ajax({
      url: url,
      type: "post",
      dataType: "json",
      contentType: "application/json",
      success: function(data) {
        $("#request").html("success");
        var result =
          '<div class="card"> ' +
          "<h4>" +
          payload.user +
          "</h4>" +
          "<p>" +
          payload.text +
          "</p>" +
          "</div>";
        $("#comments > ul").append($(result));
      },
      data: JSON.stringify(payload)
    });
  });
});

function showComments(data) {
  var list = $("#comments > ul");
  var results = "";
  $.each(data, function(i, item) {
    results +=
      '<div class="card"> ' +
      "<h4>" +
      data[i].user +
      "</h4>" +
      "<p>" +
      data[i].text +
      "</p>" +
      "</div>";
  });
  list.html(results);
}
