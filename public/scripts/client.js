/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1653345262138,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1653431662138,
    },
  ];

  const createTweetElement = function (tweetData) {
    let tweetElement = `<article>
  <header>
    <span class="profile">
      <span class="profile-image"><img src="${tweetData.user.avatars}"></span>
      <span class="name">${tweetData.user.name}</span>
    </span>
    <span class="tag">${tweetData.user.handle}</span>
  </header>
  <div class="tweet-body">${tweetData.content.text}</div>
  <div class="tweet-spacer"></div>
  <footer>
    <span class="date">${tweetData.created_at}</span>
    <span class="icons">
      <span class="flag"><i class="fa-brands fa-font-awesome"></i></span>
      <span class="retweet"><i class="fa-solid fa-retweet"></i></span>
      <span class="like"><i class="fa-solid fa-heart"></i></span>
    </span>
  </footer>
</article>`;

    return tweetElement;
  };

  // pushes past tweets to #tweets-container
  const rendertweets = function (tweets) {
    // adds space between tweets
    const articleSpacer = "<div class='article-spacer'></div>";

    // loops through tweets
    for (const twat of tweets) {
      const $tweet = createTweetElement(twat);
      $("#tweets-container").append($tweet, articleSpacer);
    }
  };

  //on page load, .append in tweet articles
  rendertweets(tweetData);

  //listen for submit on tweet creation form
  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/tweets/",
      data: data,
      datatype: "query",
    })
    .done(function (responseData) {
      console.log("success: ", responseData);
    })
    .fail(function (errorData) {
      console.log("fail: ", errorData);
    })
  });
});
