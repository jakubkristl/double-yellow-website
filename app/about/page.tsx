// app/about/page.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function AboutPage() {
  const [zoomedImg, setZoomedImg] = useState<{ src: string; alt: string } | null>(null);
  return (
    <section className="container about-section">
      <div className="membership-header">
        <h1 className="page-title">За Double Yellow</h1>
        <div className="membership-sub">
          Страст, реновация и малко скуош прах.
        </div>
      </div>

      <div className="about-content">
        <p>
          <strong>Double Yellow Squash Club</strong>, operated by{" "}
          <strong>Sport And Beyond EOOD</strong>, се роди от една проста идея:
          да върне живот на дълго забравените скуош кортове в Националната
          спортна академия в София - и да изгради модерен клуб, движен от
          общността и любовта към играта.
        </p>

        <p>
          Проектът започна като реновационна мисия и бързо се превърна в
          истинско възраждане. Кортовете бяха виждали и по-добри дни - напукани
          стени, слабо осветление, износени настилки. Но това, което им липсваше
          като вид, го компенсираха с огромен потенциал.
        </p>

        <p>
          През следващите месеци демонтирахме, ремонтирахме и изградихме наново.{" "}
          <strong>HPL панели на предната стена</strong>, ново <strong>LED осветление</strong>,
          обновени подове, преработена рецепция - всеки детайл имаше значение.
          От логото над тина до линиите на корта, целта беше ясна:{" "}
          <em>да върнем енергията, видимостта и гордостта в българския скуош.</em>
        </p>

        <p>
          Днес Double Yellow е повече от клуб. Това е място за играчи,
          начинаещи и фенове - със седмични сесии, турнири и общностни събития,
          които държат играта жива и достъпна.
        </p>

        <p className="about-signoff">
          <strong>— Jakub Kristl</strong>
          <br />
          Основател, Double Yellow Squash Club • Sport And Beyond EOOD
        </p>
      </div>

      {/* FROM DUST TO DOUBLE YELLOW */}
      <div className="about-gallery-intro">
        <h2 className="gallery-title">От прах до Double Yellow</h2>
        <div className="gallery-underline"></div>
        <p className="gallery-sub">
          Поглед назад към това как започна, как се разви и как изглежда днес.
        </p>
      </div>

      {/* BEFORE / DURING / AFTER visual story */}
      <div className="about-gallery-grid">
        <div className="gallery-group">
          <h3 className="gallery-heading">Преди</h3>
            <div className="gallery-row">
                <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/before1.jpg", alt: "Преди реновацията - износени стени" })}>
                <Image src="/about/before1.jpg" alt="Преди реновацията - износени стени" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
              </div>
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/before2.jpg", alt: "Преди реновацията - детайл на щетите" })}>
                <Image src="/about/before2.jpg" alt="Преди реновацията - детайл на щетите" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
              </div>
            </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">По време</h3>
          <div className="gallery-row">
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/during1.jpg", alt: "Реновация в процес - предна стена" })}>
              <Image src="/about/during1.jpg" alt="Реновация в процес - предна стена" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/during2.jpg", alt: "Реновация в процес - нови панели" })}>
              <Image src="/about/during2.jpg" alt="Реновация в процес - нови панели" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>

        <div className="gallery-group">
          <h3 className="gallery-heading">След</h3>
          <div className="gallery-row">
              <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/after1.jpg", alt: "Реновирани скуош кортове - Double Yellow" })}>
              <Image src="/about/after1.jpg" alt="Реновирани скуош кортове - Double Yellow" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
            <div style={{ position: "relative", width: "100%", flex: 1, minWidth: 200, cursor: "pointer" }} onClick={() => setZoomedImg({ src: "/about/after2.jpg", alt: "Завършен корт със зона за публика" })}>
              <Image src="/about/after2.jpg" alt="Завършен корт със зона за публика" width={800} height={600} style={{ objectFit: "cover", borderRadius: 8 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Lightbox */}
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
