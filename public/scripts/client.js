$(document).ready(function () {
  // Escape function to prevent script injection in tweets
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Inserts tweet object info from new tweet into new tweet article
  const createTweetElement = function (tweetData) {
    let tweetElement =
    `<article>
      <header>
        <span class="profile">
          <span class="profile-image"><img src="${tweetData.user.avatars}"></span>
          <span class="name">${tweetData.user.name}</span>
        </span>
        <span class="tag">${tweetData.user.handle}</span>
      </header>
      <div class="tweet-body">${escape(tweetData.content.text)}</div>
      <div class="tweet-spacer"></div>
      <footer>
        <span class="date">${timeago.format(tweetData.created_at)}</span>
        <span class="icons">
          <span class="flag"><i class="fa-brands fa-font-awesome"></i></span>
          <span class="retweet"><i class="fa-solid fa-retweet"></i></span>
          <span class="like"><i class="fa-solid fa-heart"></i></span>
        </span>
      </footer>
    </article>`;

    return tweetElement;
  };

  // .append tweet articles - pushes past tweets to #tweets-container
  const rendertweets = function (tweets) {
    // empties out #tweets-container first
    $("#tweets-container").empty();

    const varrr = document.createElement("script");
    varrr.type = "text/javascript";
    varrr.src = "/scripts/tweet-hover.js";
    $("head").append(varrr);

    // adds space between tweets
    const articleSpacer = "<div class='article-spacer'></div>";

    // loops through tweets
    for (const twit of tweets) {
      const $tweet = createTweetElement(twit);
      $("#tweets-container").prepend($tweet, articleSpacer);
    }
  };

  //query database for list of tweet objects
  const loadTweets = function () {
    $.ajax({
      type: "GET",
      url: "/tweets/",
    })
      .done(function (responseData) {
        rendertweets(responseData);
      })
      .fail(function (errorData) {
        console.log("fail: ", errorData);
      });
  };

  //run once when page first loads
  loadTweets();

  //listen for user hitting submit on tweet creation form
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();

    let tweetText = $("#new-tweet-form").find("#tweet-text").val();
    let currentLength = tweetText.length;
    const maxTweetLength = 140;

    // form validation: if form isn't correct, alert error, else clear errors and submit
    if (tweetText === "" || tweetText === null) {
      $("#submit-errors").text(
        "We don't take kindly to empty tweets in these here parts. Better try again"
      );
    } else if (currentLength > maxTweetLength) {
      $("#submit-errors").text(
        "We don't take kindly to big tweets in these here parts. Better try again"
      );
    } else {
      //clear errors
      $("#submit-errors").text("");

      const data = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "/tweets/",
        data: data,
        datatype: "query",
      })
        .done(function (responseData) {
          console.log("success: ", responseData);
          loadTweets();

          //reset new tweet form text field
          $("#new-tweet-form").find("#tweet-text").val("");
        })
        .fail(function (errorData) {
          console.log("fail: ", errorData);
        });
    }
  });
});
