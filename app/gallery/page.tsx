"use client";

import Image from "next/image";
import { useState } from "react";

const galleryCategories = [
  {
    title: "The Courts",
    description: "Our renovated squash courts with WSF specifications",
    images: [
      { src: "/hero/01.jpg", alt: "Main squash court - Double Yellow" },
      { src: "/hero/02.jpg", alt: "Court view with lighting" },
      { src: "/hero/03.jpg", alt: "Professional court setup" },
      { src: "/hero/04.jpg", alt: "Court flooring and walls" },
    ],
  },
  {
    title: "Transformation",
    description: "From renovation to revival — our journey",
    images: [
      { src: "/about/before1.jpg", alt: "Before renovation - worn walls" },
      { src: "/about/before2.jpg", alt: "Before renovation - damage detail" },
      { src: "/about/during1.jpg", alt: "Renovation in progress - front wall" },
      { src: "/about/during2.jpg", alt: "Renovation in progress - new panels" },
      { src: "/about/after1.jpg", alt: "Renovated squash courts - Double Yellow" },
      { src: "/about/after2.jpg", alt: "Finished court with seating area" },
    ],
  },
  {
    title: "Activities & Events",
    description: "Community sessions, tournaments, and coaching",
    images: [
      { src: "/activities/timeforladies.jpg", alt: "Time for Ladies session" },
      { src: "/activities/minisquash.jpg", alt: "Mini Squash for kids" },
      { src: "/activities/magnificent7.jpg", alt: "Magnificent 7 tournament" },
      { src: "/activities/comeandplay.jpg", alt: "Come and Play session" },
      { src: "/activities/beginners.jpg", alt: "Squash for Beginners class" },
      { src: "/activities/glasschallenge.jpg", alt: "Glass Challenge event" },
      { src: "/events/tomas.jpg", alt: "Special event with Tomas" },
    ],
  },
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <main style={{ padding: "40px 20px", maxWidth: "1400px", margin: "0 auto" }}>
      <h1 className="page-title">Gallery</h1>
      <p style={{ color: "#ccc", fontSize: "20px", marginBottom: "60px", textAlign: "center" }}>
        A visual journey through Double Yellow — courts, community, and everything in between.
      </p>

      {galleryCategories.map((category, idx) => (
        <section key={category.title} style={{ marginBottom: "80px" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ 
              color: "var(--accent)", 
              fontSize: "clamp(24px, 3vw, 32px)", 
              fontWeight: 700,
              marginBottom: "8px"
            }}>
              {category.title}
            </h2>
            <p style={{ color: "#999", fontSize: "16px" }}>
              {category.description}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {category.images.map((image, imgIdx) => (
              <div
                key={imgIdx}
                onClick={() => setSelectedImage(image)}
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 204, 0, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
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
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxWidth: "90vw",
              maxHeight: "90vh",
              cursor: "default",
            }}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
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
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: "absolute",
                top: "-40px",
                right: "0",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "32px",
                cursor: "pointer",
                padding: "10px",
                lineHeight: 1,
              }}
              aria-label="Close"
            >
              ✕
            </button>
            <p style={{
              color: "#ccc",
              textAlign: "center",
              marginTop: "16px",
              fontSize: "14px",
            }}>
              {selectedImage.alt}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
