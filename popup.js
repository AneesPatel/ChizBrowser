
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    var tab = tabs[0];
    var url = tab.url;
  
    var form = document.getElementById('question-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var questionInput = document.getElementById('question-input');
      var question = questionInput.value;
  
   
      generateAnswer(question, url, function(answer) {
      
        var answerBox = document.getElementById('answer-box');
        var answerMessage = document.getElementById('answer-message');
        var answerText = document.getElementById('answer');
        answerText.textContent = answer;
        answerBox.style.display = 'block';
        answerMessage.style.display = 'none';
      });
    });
  });
  

  function generateAnswer(question, url, callback) {
   
    chrome.runtime.sendMessage({
      type: 'generate-answer',
      question: question,
      url: url
    }, function(response) {
      callback(response.answer);
    });
  }
