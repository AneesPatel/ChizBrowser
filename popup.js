// Get the current tab's URL
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
  
    // Set up the question form submit event handler
    var form = document.getElementById('question-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var questionInput = document.getElementById('question-input');
      var question = questionInput.value;
  
      // Generate the answer using ChatGPT
      generateAnswer(question, url, function(answer) {
        // Update the answer box with the generated answer
        var answerBox = document.getElementById('answer-box');
        var answerMessage = document.getElementById('answer-message');
        var answerText = document.getElementById('answer');
        answerText.textContent = answer;
        answerBox.style.display = 'block';
        answerMessage.style.display = 'none';
      });
    });
  });
  
  // Function to generate an answer using ChatGPT
  function generateAnswer(question, url, callback) {
    // Send a message to the background script to generate an answer
    chrome.runtime.sendMessage({
      type: 'generate-answer',
      question: question,
      url: url
    }, function(response) {
      // Call the callback with the generated answer
      callback(response.answer);
    });
  }