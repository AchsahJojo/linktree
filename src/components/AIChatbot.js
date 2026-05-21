import { useState } from "react";
import { promptSuggestions } from "../data/profileData";
import { getChatbotAnswer } from "../helpers/getChatbotAnswer";

// the function that allows the chatbot to work
function AIChatbot() {
  // isOpen is a React state that manages whether the AI chat panel is open or closed
  const [isOpen, setIsOpen] = useState(false);
  // input is another state that keeps track of what the user typed in the chatbot textbox
  const [input, setInput] = useState("");
  // isChecking decides whether the "Checking..." text pops up while the chatbot is answering
  const [isChecking, setIsChecking] = useState(false);
  // checkingLabel stores what text to show, like "Checking Resume" or "Checking GitHub"
  const [checkingLabel, setCheckingLabel] = useState("");

  // the initial message the user sees each time they reload the page
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm Achsah's AI Chatbot. Ask a question and I'll point you to the right source.",
    },
  ]);

  // this function handles a question from either the text input or a suggested prompt
  function askChatbot(question) {
    // trim removes extra spaces from the beginning and end of the question
    const trimmedQuestion = question.trim();

    // if there is no question, or the chatbot is already checking, stop the function
    if (!trimmedQuestion || isChecking) {
      return;
    }

    // answer stores the chatbot's matched response from the mock source data
    const answer = getChatbotAnswer(trimmedQuestion);
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };

    // adds the user's new message to the message history so previous questions stay visible
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    // clears the textbox after the user sends a question
    setInput("");
    // stores the specific Checking label for the matched source
    setCheckingLabel(answer.checking);
    // turns on the Checking state before the chatbot response appears
    setIsChecking(true);

    // creates a short delay so the UI can show "Checking..." and feel like mock live retrieval
    window.setTimeout(() => {
      // after the delay, add the chatbot's answer to the message history
      setMessages((currentMessages) => [
        // copies all previous messages before adding the new chatbot response
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: answer.answer,
          source: answer.source,
          actions: answer.actions,
        },
      ]);
      // turns off the Checking state after the chatbot response appears
      setIsChecking(false);
      // clears the Checking label so it is ready for the next question
      setCheckingLabel("");
    }, 650);
  }

  function handleSubmit(event) {
    // prevents the page from refreshing when the form is submitted
    event.preventDefault();
    // sends the text input value into the chatbot question handler
    askChatbot(input);
  }

  return (
    <section className="chatbot">
      <button
        className="chatbot-toggle"
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-expanded={isOpen}
        aria-controls="chatbot-panel"
      >
        <span className="chatbot-toggle-mark">AI</span>
        <span>{isOpen ? "Close" : "Ask"}</span>
      </button>

      {isOpen && (
        <div className="chatbot-panel" id="chatbot-panel">
          <header className="chatbot-header">
            <div>
              <p className="chatbot-kicker">AI Chatbot</p>
              <h2>Ask Achsah's Linktree</h2>
            </div>
            <button
              className="chatbot-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Chatbot"
            >
              x
            </button>
          </header>

          <div className="prompt-grid" aria-label="Suggested questions">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askChatbot(prompt)}
                disabled={isChecking}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="messages" aria-live="polite">
            {messages.map((message) => (
              <article
                className={`message message-${message.role}`}
                key={message.id}
              >
                <p>{message.text}</p>

                {message.source && (
                  <span className="message-source">
                    Source: {message.source}
                  </span>
                )}

                {message.actions && (
                  <div className="message-actions">
                    {message.actions.map((action) => (
                      <a
                        href={action.url}
                        target="_blank"
                        rel="noreferrer"
                        key={`${message.id}-${action.label}`}
                      >
                        Open {action.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}

            {isChecking && (
              <article className="message message-assistant message-loading">
                <span>{checkingLabel}</span>
              </article>
            )}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects, graduation, work..."
              aria-label="Ask the AI Chatbot a question"
            />
            <button type="submit" disabled={isChecking || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default AIChatbot;
