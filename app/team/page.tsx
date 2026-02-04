"use client";

import { useState } from "react";
import Image from "next/image";
import OptimizedImage from "@/components/OptimizedImage";

type Member = {
  name: string;
  role?: string;
  photo: string;
  bio: string;
};

const TEAM: Member[] = [
  {
    name: "Jakub Kristl",
    role: "Owner / Head Enthusiast",
    photo: "/team/jakub.jpg",
    bio:
      "Former karate medal collector turned squash evangelist. Favorite drill: 'one more.' Believes any ball is retrievable with correct footwork and mild stubbornness. Probably reorganizing the club while you read this.",
  },
  {
    name: "Ognyan Chorbadzhiev",
    role: "Coach / Court Whisperer",
    photo: "/team/ognyan.jpg",
    bio:
      "Believes squash is 80% movement, 15% decisions, and 5% creative excuses. Spots lazy footwork from the next court and calls it out with a grin. Says “relax” right before doubling the tempo.",
  },
];

export default function TeamPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  
  return (
    <section className="container">
      <h1 className="page-title">Team</h1>

      <ul className="team-list team-centered">
        {TEAM.map((m) => (
          <li key={m.name} className="team-row card">
            <div className="cell avatar">
              <div onClick={() => setZoomedImg({ src: m.photo, alt: m.name })} style={{ cursor: "pointer" }}>
                <OptimizedImage src={m.photo} alt={m.name} width={220} height={220} className="team-photo" style={{ borderRadius: 8 }} />
              </div>
            </div>

            <div className="cell info">
              <div className="team-name">{m.name}</div>
              {m.role && <div className="team-role">{m.role}</div>}
              <p className="team-bio">{m.bio}</p>
            </div>
          </li>
        ))}
      </ul>

      {zoomedImg && (
        <div
          onClick={() => setZoomedImg(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setZoomedImg(null);
            }}
            style={{
              position: "fixed",
              top: "30px",
              right: "30px",
              background: "rgba(0, 0, 0, 0.5)",
              border: "2px solid #fff",
              borderRadius: "50%",
              color: "#fff",
              fontSize: "28px",
              cursor: "pointer",
              padding: "8px 12px",
              lineHeight: 1,
              zIndex: 1002,
              width: "48px",
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Close"
          >
            ✕
          </button>
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <Image
              src={zoomedImg.src}
              alt={zoomedImg.alt}
              width={1200}
              height={900}
              style={{
                maxWidth: "100%",
                maxHeight: "90vh",
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
