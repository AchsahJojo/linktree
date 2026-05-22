import { sourceSnapshots } from "../data/profileData";

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

// the function that allows us to simulate AI answers
export function getChatbotAnswer(question) {
  // standardize the words to all lower case
  const normalizedQuestion = question.toLowerCase();

  // checks if the user's question has any project or portfolio keywords
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
    // return the portfolio object from the sourceSnapshots object
    return sourceSnapshots.portfolio;
  }

  // checks if the user's question has any GitHub or code keywords
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

  // checks if the user's question has any graduation or school keywords
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

  // checks if the user's question has any job, role, or experience keywords
  if (
    includesAny(normalizedQuestion, [
      "most recent",
      "latest job",
      "recent job",
      "current role",
      "job",
      "experience",
      "role",
      "resident advisor",
      "RA",
      "TA",
      "teaching assistant",
      "machine learning",
    ])
  ) {
    return sourceSnapshots.recentRole;
  }

  // checks if the user's question has any contact or hiring keywords
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

  // checks if the user's question asks about Apple or the Innovation Scholar experience
  if (includesAny(normalizedQuestion, ["apple", "innovation scholar"])) {
    return sourceSnapshots.apple;
  }

  // default response to questions that cannot be answered yet
  return sourceSnapshots.fallback;
}
