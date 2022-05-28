$(document).ready(function () {

  // When user inputs into tweet textarea, update counter
  $("#tweet-text").on("input", function () {
    let currentLength = $(this).val().length;
    const maxTweetLength = 140;
    const $form = $(this).closest("form");
    const $counter = $form.find(".counter");
    $counter.text(maxTweetLength - currentLength);

    // if counter is longer than maxtweetlengyh, add too-long class
    if (currentLength > maxTweetLength) {
      $counter.addClass("too-long");
    } else if (currentLength < maxTweetLength) {
      $counter.removeClass("too-long");
    }

  });

});
