import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4 className="footer-title">Double Yellow Squash Club</h4>
          <p className="muted">
            National Sports Academy (NSA), ul. “Akad. Stefan Mladenov” 21, 1700
            Sofia
          </p>
          <p className="muted">
            Open daily • MultiSport, CoolFit &amp; card payments accepted
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Quick links</h4>
          <ul className="link-list">
            <li>
              <Link href="/booking">Book a court</Link>
            </li>
            <li>
              <Link href="/membership">Membership packs</Link>
            </li>
            <li>
              <Link href="/events">Events &amp; programs</Link>
            </li>
            <li>
              <Link href="/gallery">Photo gallery</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Contact</h4>
          <p className="muted">+359 896 754 014</p>
          <p className="muted">
            <a href="mailto:jakub@doubleyellowsquash.com">
              jakub@doubleyellowsquash.com
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-note">
        © {new Date().getFullYear()} Double Yellow Squash Club
      </div>
    </footer>
  );
}
