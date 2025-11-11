import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Squash Activities & Programs | Double Yellow Squash Club",
  description: "Join our diverse squash programs in Sofia - ladies' sessions, kids' mini squash, beginner classes, and community events. Weekly sessions and challenges for all levels.",
  openGraph: {
    title: "Squash Programs & Activities at Double Yellow Club Sofia",
    description: "Discover our weekly squash activities - from beginner lessons to community events. Ladies' sessions, kids' programs, and competitive challenges available.",
    images: [
      {
        url: "/activities/timeforladies.jpg",
        width: 1200,
        height: 630,
        alt: "Squash activities at Double Yellow Club"
      }
    ]
  },
  keywords: ["squash sofia", "squash lessons", "squash for beginners", "ladies squash", "kids squash", "squash club sofia", "squash activities"]
};

import { bg } from "@/lib/translations";

export default function ActivitiesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsClub",
    "name": "Double Yellow Squash Club",
    "event": [
      {
        "@type": "SportsEvent",
        "name": "Time for Ladies",
        "description": "Women-only squash session: friendly pace, great vibes, quick progress.",
        "startDate": "2025-01-01T18:00",
        "endDate": "2025-12-31T19:30",
        "eventStatus": "EventScheduled",
        "eventAttendanceMode": "OfflineEventAttendanceMode",
        "recurringEvent": {
          "@type": "Schedule",
          "byDay": "https://schema.org/Wednesday",
          "startTime": "18:00",
          "endTime": "19:30"
        }
      },
      {
        "@type": "SportsEvent",
        "name": "Mini Squash (Kids)",
        "description": "Fun skills & games for kids to fall in love with squash.",
        "startDate": "2025-01-01T10:00",
        "endDate": "2025-12-31T11:30",
        "eventStatus": "EventScheduled",
        "eventAttendanceMode": "OfflineEventAttendanceMode",
        "recurringEvent": {
          "@type": "Schedule",
          "byDay": ["https://schema.org/Saturday", "https://schema.org/Sunday"],
          "startTime": "10:00",
          "endTime": "11:30"
        }
      },
      {
        "@type": "SportsEvent",
        "name": "Squash for Beginners",
        "description": "Start from zero: movement basics, swing shape and simple drills.",
        "startDate": "2025-01-01T18:00",
        "endDate": "2025-12-31T19:30",
        "eventStatus": "EventScheduled",
        "eventAttendanceMode": "OfflineEventAttendanceMode",
        "recurringEvent": {
          "@type": "Schedule",
          "byDay": ["https://schema.org/Monday", "https://schema.org/Friday"],
          "startTime": "18:00",
          "endTime": "19:30"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "64px", marginBottom: "16px", fontWeight: 800, lineHeight: 1.1 }}>{(bg as any).activitiesPage.title}</h1>
      <p style={{ color: "#ccc", fontSize: "22px", marginBottom: "40px" }}>{(bg as any).activitiesPage.subtitle}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/* --- Time for Ladies --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/timeforladies.jpg"
              alt="Time for Ladies"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Time for Ladies
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>
              Wednesdays • 18:00
            </p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Women-only session: friendly pace, great vibes, quick progress.
              Bring a friend or come solo — we’ll pair you up.
            </p>
          </div>
        </div>

        {/* --- Mini Squash --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/minisquash.jpg"
              alt="Mini Squash"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Mini Squash (Kids)
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>
              Saturday & Sunday • 10:00
            </p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Fun skills & games for kids to fall in love with squash. Small
              groups — up to 6 kids per coach. Equipment included.
            </p>
          </div>
        </div>

        {/* --- Magnificent 7 --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/magnificent7.jpg"
              alt="Magnificent 7"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Magnificent 7
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>
              Thursdays • 18:00–20:30
            </p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Round-robin for seven players — tight matches, quick rotations,
              scoreboard thrills. Ranking and registration available on RankedIn.
            </p>
          </div>
        </div>

        {/* --- Come-and-Play --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/comeandplay.jpg"
              alt="Come and Play"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Come-and-Play
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>
              Tuesdays • 18:00 | Saturdays • 11:00–13:00
            </p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Open community session — rotate courts, meet partners, find your
              level. The most social way to play.
            </p>
          </div>
        </div>

        {/* --- Squash for Beginners --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/beginners.jpg"
              alt="Squash for Beginners"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Squash for Beginners
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>
              Mondays • 18:00 | Fridays • 18:00
            </p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Start from zero: movement basics, swing shape and simple drills so
              you can start rallying fast.
            </p>
          </div>
        </div>

        {/* --- Glass Challenge --- */}
        <div
          style={{
            background: "#111",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 0 16px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ height: "200px", overflow: "hidden" }}>
            <Image
              src="/activities/glasschallenge.jpg"
              alt="Glass Challenge"
              width={600}
              height={400}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <h2 style={{ color: "#ffcc00", fontSize: "1.4rem", fontWeight: 700 }}>
              Challenges — Glass Challenge
            </h2>
            <p style={{ fontWeight: 700, margin: "6px 0 14px" }}>Ongoing</p>
            <p style={{ color: "#ddd", lineHeight: 1.5 }}>
              Beat the Glass! Ongoing challenge on our back-wall courts. Log
              attempts at the desk; monthly leaderboard and bragging rights.
            </p>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
