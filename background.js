// background.js

// listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "pageInfo") {
      // generate a response using ChatGPT API
      generateResponse(message.data.title, message.data.content)
        .then(response => {
          // send the response back to the content script
          sendResponse({ type: "response", data: response });
        })
        .catch(error => {
          console.error(error);
          // send an error message back to the content script
          sendResponse({ type: "error", data: "Error generating response." });
        });
      // inform Chrome that we will send a response asynchronously
      return true;
    }
  });
  
  // function to generate a response using ChatGPT API
  async function generateResponse(title, content) {
    // set up the API request
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/engine/davinci-codex/completions";
    const prompt = `Write an question related to "${title}".\n\nQuestion: `;
    const query = `${prompt}${content}`;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        prompt: query,
        max_tokens: 100,
        temperature: 0.5,
        n: 1,
        stop: ["\n"]
      })
    };
  
    // send the API request and parse the response
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    const answer = data.choices[0].text.trim();
  
    return answer;
  }