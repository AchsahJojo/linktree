import "./App.css";
import AIChatbot from "./components/AIChatbot";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <main className="page">
      <ProfilePage />
      <AIChatbot />
    </main>
  );
}

export default App;
