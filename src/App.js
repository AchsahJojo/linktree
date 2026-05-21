import { useState } from "react";
import "./App.css";

// a dict that has has an array of social media profiles with links and its label
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

// a dict of objects on where the question's answer will be sourced from so users can navigate there
const sourceSnapshots = {
  portfolio: {
    source: "Portfolio link",
    checking: "Checking Portfolio...",
    answer:
      "Achsah's portfolio is the best place to see polished project writeups, technical background, and work samples in one place.",
    actions: [profileLinks.portfolio],
  },
  github: {
    source: "GitHub link",
    checking: "Checking GitHub...",
    answer:
      "For code-level work, GitHub is the strongest source. It points visitors to Achsah's repositories and technical projects.",
    actions: [profileLinks.github],
  },
  graduation: {
    source: "Resume snapshot",
    checking: "Checking Resume...",
    answer:
      "Yes. The resume snapshot identifies Achsah as a Computer Science major at CSU Monterey Bay who is approaching graduation.",
    actions: [profileLinks.resume],
  },
  recentRole: {
    source: "LinkedIn and Resume snapshot",
    checking: "Checking LinkedIn...",
    answer:
      "The most recent role highlighted on Achsah's profile is Apple Innovation Scholar, alongside her current Computer Science work at CSU Monterey Bay.",
    actions: [profileLinks.linkedin, profileLinks.resume],
  },
  contact: {
    source: "LinkedIn and Portfolio links",
    checking: "Checking contact links...",
    answer:
      "LinkedIn is the clearest professional contact path. The portfolio is also useful if someone wants more context before reaching out.",
    actions: [profileLinks.linkedin, profileLinks.portfolio],
  },
  apple: {
    source: "Resume snapshot",
    checking: "Checking Apple context...",
    answer:
      "Achsah's profile highlights her as a former Apple Innovation Scholar, which is the experience visitors should look for when they want to understand that part of her background.",
    actions: [profileLinks.resume, profileLinks.linkedin],
  },
  fallback: {
    source: "Profile links",
    checking: "Checking Achsah's links...",
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

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

// the function that allows to simulate AI answers
function getConciergeAnswer(question) {
  // standerize the words to all lower case
  const normalizedQuestion = question.toLowerCase();

  // optimize the process of finding the right source by looking for key words that indicate which link the user is looking for
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
  // error handle any questions that cannot be answered
  return sourceSnapshots.fallback;
}

// the function that allows the chatbot to work
function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [checkingLabel, setCheckingLabel] = useState("");

  // the initial message the user would see each time they reload the page
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi, I'm Achsah's AI Concierge. Ask a question and I'll point you to the right source.",
    },
  ]);
  // break the chatbot into another function
  function askConcierge(question) {
    // clean and standerdize the question to be analyzed
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isChecking) {
      return;
    }
    // store the result of the user's message in a dict and remember their id, what role they are, and their question
    const answer = getConciergeAnswer(trimmedQuestion);
    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmedQuestion,
    };
    // what this do??**
    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setCheckingLabel(answer.checking);
    setIsChecking(true);

    window.setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: answer.answer,
          source: answer.source,
          actions: answer.actions,
        },
      ]);
      setIsChecking(false);
      setCheckingLabel("");
    }, 650);
  }
  // once u submit the question, it prevents thw
  function handleSubmit(event) {
    // this prevents the page from refreshing when the submit button is clicked
    event.preventDefault();
    // calls the function above and it basically matches the user's question, checks if any of the words is found in any of the key words in the function
    askConcierge(input);
  }

  return (
    <section className={`concierge ${isOpen ? "concierge-open" : ""}`}>
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
              <p className="concierge-kicker">AI Concierge</p>
              <h2>Ask Achsah's Linktree</h2>
            </div>
            <button
              className="concierge-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Concierge"
            >
              ×
            </button>
          </header>

          <div className="prompt-grid" aria-label="Suggested questions">
            {promptSuggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => askConcierge(prompt)}
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
              aria-label="Ask the AI Concierge a question"
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
            <img src="/profile_pic.jpg" alt="Achsah Jojo" />
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

      <AIConcierge />
    </main>
  );
}

export default App;
