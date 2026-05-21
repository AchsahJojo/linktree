import { useState } from "react";
import "./App.css";

// an object with keys that store each link's label and url
const profileLinks = {
  github: {
    label: "GitHub",
    url: "https://github.com/AchsahJojo",
  },
  linkedin: {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/achsah-jojo/",
  },
  portfolio: {
    label: "Portfolio",
    url: "https://ajojo7.wixsite.com/achsahjojo",
  },
  resume: {
    label: "Resume",
    url: "https://drive.google.com/file/d/13Oz3rAJTLj_Dr6WVHLTMvSrLLXO14Glz/view?usp=sharing",
  },
};

// an array of the prompts that users can click to ask
const promptSuggestions = [
  "Where can I see her projects?",
  "Is she graduating soon?",
  "What is her most recent job?",
  "How can I contact her?",
  "What did she do with Apple?",
  "Which link should I click for work samples?",
];

// An object called sourceSnapshots with keys that store the mock data for the chatbot's responses, including the link source, the temporary "checking" text, the answer, and the actions, which suggest which links the user should visit.
const sourceSnapshots = {
  portfolio: {
    source: "Portfolio link",
    checking: "Checking Portfolio",
    answer:
      "Achsah's portfolio is the best place to see her polished project writeups, technical background, and work samples in one place.",
    actions: [profileLinks.portfolio],
  },
  github: {
    source: "GitHub link",
    checking: "Checking GitHub",
    answer:
      "For code-level work, GitHub is the strongest source. It points to her repositories and technical projects.",
    actions: [profileLinks.github],
  },
  graduation: {
    source: "Resume snapshot",
    checking: "Checking Resume",
    answer:
      "Achsah will graduate December 2026. Currently, she is a Computer Science major at CSU Monterey Bay, with 1 semester left.",
    actions: [profileLinks.resume],
  },
  recentRole: {
    source: "LinkedIn and Resume snapshot",
    checking: "Checking LinkedIn",
    answer:
      "The most recent role highlighted on Achsah's profile is Apple Innovation Scholar. However she also worked as a Resident Advisor and a Data Science TA.",
    actions: [profileLinks.linkedin, profileLinks.resume],
  },
  contact: {
    source: "LinkedIn and Portfolio links",
    checking: "Checking contact links",
    answer:
      "LinkedIn is the clearest professional contact path. The portfolio is also useful if someone wants more context before reaching out.",
    actions: [profileLinks.linkedin, profileLinks.portfolio],
  },
  apple: {
    source: "Resume snapshot",
    checking: "Checking Apple context",
    answer:
      "Achsah is a former Apple Innovation Scholar, where did research on AI Autocompletion with a $10k grant over the course of 1.5 years. Learn more about it through these links!",
    actions: [profileLinks.resume, profileLinks.linkedin],
  },
  fallback: {
    source: "Profile links",
    checking: "Checking Achsah's links",
    answer:
      "I couldn't find an exact match, but I can still help route you. Try the portfolio for projects, LinkedIn for contact or experience, GitHub for code, and the resume for a quick background summary.",
    actions: [
      profileLinks.portfolio,
      profileLinks.linkedin,
      profileLinks.github,
      profileLinks.resume,
    ],
  },
};
// This is a simple function that checks whether any keyword in terms appears inside text.
// terms look like this: ["cat", "world", "dog"]
function includesAny(text, terms) {
  for (const term of terms) {
    if (text.includes(term)) {
      return true;
    }
  }
  return false;
}
// the function that allows to simulate AI answers
function getChatbotAnswer(question) {
  // standerize the words to all lower case
  const normalizedQuestion = question.toLowerCase();

  // find if any of these terms are found in terms form the includesAny function
  if (
    includesAny(normalizedQuestion, [
      "work sample",
      "portfolio",
      "project",
      "built",
      "building",
      "case study",
    ])
  ) {
    // return the portfolio object from the sourceSnapshots dict
    return sourceSnapshots.portfolio;
  }

  if (
    includesAny(normalizedQuestion, [
      "github",
      "code",
      "repo",
      "repository",
      "technical",
    ])
  ) {
    return sourceSnapshots.github;
  }

  if (
    includesAny(normalizedQuestion, [
      "graduating",
      "graduate",
      "graduation",
      "senior",
      "school",
      "college",
      "csumb",
    ])
  ) {
    return sourceSnapshots.graduation;
  }

  if (
    includesAny(normalizedQuestion, [
      "most recent",
      "latest job",
      "recent job",
      "current role",
      "job",
      "experience",
      "role",
    ])
  ) {
    return sourceSnapshots.recentRole;
  }

  if (
    includesAny(normalizedQuestion, [
      "contact",
      "email",
      "reach",
      "message",
      "connect",
      "hire",
    ])
  ) {
    return sourceSnapshots.contact;
  }

  if (includesAny(normalizedQuestion, ["apple", "innovation scholar"])) {
    return sourceSnapshots.apple;
  }
  // default response to questions that cannot be answered yet
  return sourceSnapshots.fallback;
}

// the function that allows the chatbot to work
function AIChatbot() {
  // isOpen is a react state that manages whether the AI chat panel is open or closed.
  const [isOpen, setIsOpen] = useState(false);
  // input is another state that manages and keeps track of when there is/isnt input in the textbox area of the chatbot
  const [input, setInput] = useState("");
  // a react state that decided weather the " checking.." text pops up or not to indicate the chatbot is searching for information
  const [isChecking, setIsChecking] = useState(false);
  // syores what text to show like " Checking Resume" or "Checking github"
  const [checkingLabel, setCheckingLabel] = useState("");

  // the initial message the user would see each time they reload the page
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm Achsah's AI Chatbot. Ask a question and I'll point you to the right source.",
    },
  ]);
  // break the chatbot into another function
  function askChatbot(question) {
    // clean and standerdize the question to be analyzed
    const trimmedQuestion = question.trim();
    // making sure that if there is no question or is the checking process is currently happening, to stop and return the progam
    if (!trimmedQuestion || isChecking) {
      return;
    }
    // answer here -> stores the chatbot's response from the sourceSnapshot object's "answer key"
    const answer = getChatbotAnswer(trimmedQuestion);
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };
    // updating react states ** important **
    // I want to keep updating my messages because I want to save the hisyory of my previous messages.
    // if i dont add my current message to this message array that holds the id,role, and text of each question i ask,
    // then i wont see my previpus querstions i asked to the chatbot.
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setCheckingLabel(answer.checking);
    setIsChecking(true);
    // I added a timeoit because I wanted to create a delay so that the chatbot's response is late by 650ms so the UI can show "Checking..." and feel like mock live retrieval is happening.
    window.setTimeout(() => {
      // a callback function that runs after the delay
      setMessages((currentMessages) => [
        // copies the old (named as currentMessages) messages and then adds the new message's id,role,text etc.. into the currentMessages list
        ...currentMessages,
        {
          // new message
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: answer.answer,
          source: answer.source,
          actions: answer.actions,
        },
      ]);
      setIsChecking(false);
      setCheckingLabel("");
      // waiting 650 milliseconds
    }, 650);
  }
  function handleSubmit(event) {
    // this prevents the page from refreshing when the submit button is clicked
    event.preventDefault();
    // calls getChatbotAnswer and it basically matches the user's question, checks if any of the words is found in any of the key words and then returns the correct reponse based on the sourceSnapshort object and key values
    askChatbot(input);
  }

  return (
    <section className="concierge">
      <button
        className="concierge-toggle"
        type="button"
        onClick={() => setIsOpen((currentState) => !currentState)}
        aria-expanded={isOpen}
        aria-controls="concierge-panel"
      >
        <span className="concierge-toggle-mark">AI</span>
        <span>{isOpen ? "Close" : "Ask"}</span>
      </button>

      {isOpen && (
        <div className="concierge-panel" id="concierge-panel">
          <header className="concierge-header">
            <div>
              <p className="concierge-kicker">AI Chatbot</p>
              <h2>Ask Achsah's Linktree</h2>
            </div>
            <button
              className="concierge-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Chatbot"
            >
              ×
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
                <span className="loading-dots" aria-hidden="true">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
              </article>
            )}
          </div>

          <form className="concierge-form" onSubmit={handleSubmit}>
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

function App() {
  return (
    <main className="page">
      <section className="profile-card">
        <section className="profile">
          <div className="avatar" aria-label="Achsah Jojo profile picture">
            <span>AJ</span>
            <img
              src="/profile_pic.jpg"
              alt="Achsah Jojo"
              fetchPriority="high"
            />
          </div>

          <h1>Achsah Jojo</h1>

          <p className="profile-title">
            Computer Science Major · California State University Monterey Bay
          </p>

          <p className="profile-location">📍 Hollister, CA</p>
        </section>

        <p className="bio">
          Future Advanced Machine Learning TA and Former Apple Innovation
          Scholar
        </p>
        <div className="links">
          <a href={profileLinks.github.url} target="_blank" rel="noreferrer">
            GitHub
          </a>

          <a href={profileLinks.linkedin.url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>

          <a href={profileLinks.portfolio.url} target="_blank" rel="noreferrer">
            Portfolio
          </a>

          <a href={profileLinks.resume.url} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>

        <footer className="site-footer">
          <p>Made by Achsah Jojo for Senior Associate Technical Assessment</p>
        </footer>
      </section>

      <AIChatbot />
    </main>
  );
}

export default App;
