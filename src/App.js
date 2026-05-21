import "./App.css";

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
          Schloar
        </p>
        <div className="links">
          <a
            href="https://github.com/AchsahJojo"
            target="_blank" // takes user to a new browser tab when clicked
            rel="noreferrer" // adds security and privacy when opening a new tab
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/achsah-jojo/"
            target="_blank"
            rel="noreferrer"
          >
            Linkedin
          </a>

          <a
            href="https://ajojo7.wixsite.com/achsahjojo"
            target="_blank"
            rel="noreferrer"
          >
            Portfolio
          </a>

          <a
            href="https://drive.google.com/file/d/13Oz3rAJTLj_Dr6WVHLTMvSrLLXO14Glz/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
        </div>

        <footer className="site-footer">
          <p>Made by Achsah Jojo for Senior Associate Technical Assessment</p>
        </footer>
      </section>
    </main>
  );
}

export default App;
