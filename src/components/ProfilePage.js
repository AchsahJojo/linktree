import { profileLinks } from "../data/profileData";

function ProfilePage() {
  return (
    <section className="profile-card">
      <section className="profile">
        <div className="avatar" aria-label="Achsah Jojo profile picture">
          <span>AJ</span>
          <img
            src={`${process.env.PUBLIC_URL}/profile_pic.jpg`}
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
        Future Advanced Machine Learning TA and Former Apple Innovation Scholar
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
  );
}

export default ProfilePage;
