$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let currentLength = $(this).val().length;
    const maxTweetLength = 140;
    const $form = $(this).closest("form");
    const $counter = $form.find(".counter");
    $counter.html(maxTweetLength - currentLength);

    if (currentLength > maxTweetLength) {
      $counter.addClass("too-long");
    }
  });
});
