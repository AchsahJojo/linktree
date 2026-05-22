# Achsah Jojo Linktree

This is a custom Linktree profile page based on Achsah Jojo. This was made to complete the Senior Associate Technical Assessment for BizzNEST. It includes a profile card, links to GitHub, LinkedIn, portfolio, and resume, and a new feature that I would like to roll out if I was a link-tree engineer. This feature is a demo that is frontend only at the moment, and it is an AI Chatbot.

Live site:

```txt
https://achsahjojo.github.io/linktree/
```

## What It Is

This is a small app built with Create React App. The main page is a personal Linktree with various links. In Addition, there is a new feature that I added: an AI Chatbot that helps visitors figure out which link they should click based on commonly aksed questions about the creator. 

The chatbot does not use a real backend or AI API yet. It uses mock profile data and keyword matching to simulate what a real Linktree AIchatbot could do.

## Feature

The AI Chatbot is a floating widget on the page. Visitors can ask questions like:

- Where can I see her projects?
- Is she graduating soon?
- What is her most recent job?
- How can I contact her?
- What did she do with Apple?

The chatbot reads from mock source snapshots for the profile links, then returns:

- a short answer
- the source it is using
- action buttons that open the relevant link

The goal is to demo a Linktree feature where visitors can ask natural questions instead of scanning every link manually.

## How To Run It

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

Then open:

```txt
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

Deploy to GitHub Pages:

```bash
npm run deploy
```

## Project Structure

```txt
src/App.js
src/components/ProfilePage.js
src/components/AIChatbot.js
src/data/profileData.js
src/helpers/getChatbotAnswer.js
src/App.css
```

- `ProfilePage.js` renders the main profile card and links.
- `AIChatbot.js` renders the chatbot UI and manages chat state.
- `profileData.js` stores the links, suggested prompts, and mock responses.
- `getChatbotAnswer.js` matches a visitor question to the best mock response.
- `App.css` handles the page and chatbot styling.
