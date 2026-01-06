import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-col">
          <h4 className="footer-title">Double Yellow Squash Club</h4>
          <p className="muted">
            National Sports Academy (NSA), ul. "Akad. Stefan Mladenov" 21, 1700
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
            <a href="mailto:jakub@doubleyellowsquash.com" aria-label="Email Double Yellow">
              jakub@doubleyellowsquash.com
            </a>
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Legal</h4>
          <ul className="link-list">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-note">
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()} Double Yellow Squash Club
        </p>
        <p style={{ fontSize: "0.8rem", margin: "0.5rem 0 0 0", opacity: 0.7 }}>
          Operated by Sport And Beyond EOOD • EIK 208134448 • Lyuben Rusev 6, 1113 Sofia
        </p>
      </div>
    </footer>
  );
}
