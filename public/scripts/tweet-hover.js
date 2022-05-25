$(document).ready(function () {

$("article").hover(function () {
  $(this).addClass("hover-article")
}, function() {
  $(this).removeClass("hover-article")
});

$(".flag").hover(
  function() {
  $(this).addClass("hover-icon")
}, function() {
  $(this).removeClass("hover-icon")
});

$(".retweet").hover(
  function() {
  $(this).addClass("hover-icon")
}, function() {
  $(this).removeClass("hover-icon")
});

$(".like").hover(
  function() {
  $(this).addClass("hover-icon")
}, function() {
  $(this).removeClass("hover-icon")
});

});