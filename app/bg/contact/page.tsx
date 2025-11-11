// app/contact/page.tsx
import React from "react";
import { bg } from "@/lib/translations";

export default function ContactPage() {
  return (
    <section className="container contact-section">
      <div className="membership-header">
        <h1 className="membership-title">{(bg as any).contactPage.title}</h1>
        <div className="membership-sub">{(bg as any).contactPage.subtitle}</div>
      </div>

      {/* Quick contacts */}
      <div className="contact-grid">
        <a className="contact-card" href="tel:+359896754014">
          <div className="contact-title">Phone</div>
          <div className="contact-data">+359 896 754 014</div>
          <div className="contact-note">Call / Viber / WhatsApp</div>
        </a>

        <a className="contact-card" href="mailto:jakub@doubleyellowsquash.com">
          <div className="contact-title">Email</div>
          <div className="contact-data">jakub@doubleyellowsquash.com</div>
          <div className="contact-note">Bookings • Events • Partnerships</div>
        </a>

        <a
          className="contact-card"
          href="https://www.doubleyellowsquash.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Website</div>
          <div className="contact-data">doubleyellowsquash.com</div>
          <div className="contact-note">News • Memberships • Schedules</div>
        </a>

        <a
          className="contact-card"
          href="https://www.facebook.com/profile.php?id=61576296615086"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Facebook</div>
          <div className="contact-data">@DoubleYellowSquashClub</div>
          <div className="contact-note">Updates, photos & events</div>
        </a>

        <a
          className="contact-card"
          href="https://www.instagram.com/doubleyellowsquashclub/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">Instagram</div>
          <div className="contact-data">@doubleyellowsquashclub</div>
          <div className="contact-note">Stories, reels & daily fun</div>
        </a>

        <a
          className="contact-card"
          href="https://www.tiktok.com/@doubleyellowsquash"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="contact-title">TikTok</div>
          <div className="contact-data">@doubleyellowsquash</div>
          <div className="contact-note">Clips, rallies & behind-the-scenes</div>
        </a>
      </div>

      {/* Location & directions */}
      <div className="contact-cols">
        <div className="contact-left">
          <h3 className="contact-heading">Where to find us</h3>
          <p className="contact-address">
            <strong>Double Yellow Squash Club</strong><br />
            National Sports Academy (NSA) — Multifunctional Hall<br />
            ул. акад. Стефан Малденов 21, 1700 София, Bulgaria
          </p>

          <div className="directions">
            <div className="dir-block">
              <div className="dir-title">Opening hours</div>
              <ul>
                <li><strong>Every day:</strong> 07:00 – 22:00</li>
              </ul>
            </div>

            <div className="dir-block">
              <div className="dir-title">Directions</div>
              <ul>
                <li>
                  We’re in the <em>Multifunctional Hall</em> at NSA — squash
                  courts are on <strong>floor –1</strong>.
                </li>
                <li>
                  <strong>Parking:</strong> available inside the NSA campus.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <div className="map-wrap">
            <iframe
              title="Double Yellow Squash Club – NSA"
              width="100%"
              height="420"
              style={{ border: 0, borderRadius: "12px" }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=42.64691445104994,23.34826493526649&z=17&output=embed"
            />
          </div>
          <div className="map-note">
            Inside the NSA campus — look for the Multifunctional Hall with the
            glass-back courts (level –1).
          </div>
        </div>
      </div>
    </section>
  );
}
