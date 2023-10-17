// content.js

// extract the page title
const pageTitle = document.title;

// extract the page content
const pageContent = document.body.innerText;

// send the page information to the background script
chrome.runtime.sendMessage({
  type: "pageInfo",
  data: {
    title: pageTitle,
    content: pageContent
  }
});