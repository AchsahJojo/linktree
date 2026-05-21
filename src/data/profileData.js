// an object with keys that store each link's label and url
export const profileLinks = {
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
export const promptSuggestions = [
  "Where can I see her projects?",
  "Is she graduating soon?",
  "What is her most recent job?",
  "How can I contact her?",
  "What did she do with Apple?",
  "Which link should I click for work samples?",
];

// an object called sourceSnapshots with keys that stores the mock data for the chatbot's responses
// source: where the answer is sourced from
// checking: the temporary "Checking..." text
// answer: the chatbot's response
// actions: which links the user should visit
export const sourceSnapshots = {
  portfolio: {
    source: "Portfolio link",
    checking: "Checking Portfolio...",
    answer:
      "Achsah's portfolio is the best place to see her polished project writeups, technical background, leadership experience, and work samples in one place.",
    actions: [profileLinks.portfolio],
  },
  github: {
    source: "GitHub link",
    checking: "Checking GitHub...",
    answer:
      "For code-level work, GitHub is the strongest source. It points to her repositories and technical projects.",
    actions: [profileLinks.github],
  },
  graduation: {
    source: "Resume snapshot",
    checking: "Checking Resume...",
    answer:
      "Achsah graduates December 2026, her resume has more information about that.",
    actions: [profileLinks.resume],
  },
  recentRole: {
    source: "LinkedIn and Resume snapshot",
    checking: "Checking LinkedIn...",
    answer:
      "The most recent role other than being an Apple Innovation Schloar was that she worked as a Resident Advisor and Data Science TA at CSU Monterey Bay. ",
    actions: [profileLinks.linkedin, profileLinks.resume],
  },
  contact: {
    source: "LinkedIn and Portfolio links",
    checking: "Checking contact links...",
    answer:
      "LinkedIn is the clearest professional contact path. The portfolio is also useful if someone wants context on her before reaching out.",
    actions: [profileLinks.linkedin, profileLinks.portfolio],
  },
  apple: {
    source: "Resume snapshot",
    checking: "Checking Apple context...",
    answer:
      "Achsah's resume and portfolio highlight her as a former Apple Innovation Scholar, where she did research on AI Autocompletion with a $10k grant over the course of 1.5 years.",
    actions: [profileLinks.resume, profileLinks.linkedin],
  },
  fallback: {
    source: "Profile links",
    checking: "Checking Achsah's links...",
    answer:
      "I couldn't find an exact match, but I can still help route you. Try the portfolio for projects and work samples, LinkedIn for roles like Resident Advisor and TA experience, GitHub for code, and the resume for a quick background summary.",
    actions: [
      profileLinks.portfolio,
      profileLinks.linkedin,
      profileLinks.github,
      profileLinks.resume,
    ],
  },
};
