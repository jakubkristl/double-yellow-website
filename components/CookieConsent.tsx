"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay to avoid flash on page load
      setTimeout(() => setShowBanner(true), 500);
    } else {
      // Load saved preferences
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        // Invalid data, show banner again
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = (prefs: typeof preferences) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    setShowBanner(false);
    setShowCustomize(false);
    
    // Here you would initialize analytics/marketing scripts based on preferences
    if (prefs.analytics) {
      // Initialize analytics (e.g., Google Analytics)
      console.log("Analytics enabled");
    }
    if (prefs.marketing) {
      // Initialize marketing pixels (e.g., Facebook Pixel)
      console.log("Marketing enabled");
    }
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectNonEssential = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        {!showCustomize ? (
          // Main Banner
          <div className="cookie-banner-main">
            <div className="cookie-header">
              <h3>🍪 Използваме бисквитки / We Use Cookies</h3>
            </div>
            
            <div className="cookie-body">
              <p>
                <strong>BG:</strong> Използваме бисквитки за подобряване на функционалността на сайта, 
                анализ на трафика и показване на персонализирани реклами. Можете да изберете какви 
                бисквитки да приемете.
              </p>
              <p>
                <strong>EN:</strong> We use cookies to improve website functionality, analyze traffic, 
                and display personalized ads. You can choose which cookies to accept.
              </p>
              
              <div className="cookie-links">
                <Link href="/cookies" target="_blank">
                  Политика за бисквитки / Cookie Policy
                </Link>
                {" • "}
                <Link href="/privacy" target="_blank">
                  Поверителност / Privacy
                </Link>
              </div>
            </div>

            <div className="cookie-actions">
              <button 
                onClick={acceptAll} 
                className="cookie-btn cookie-btn-primary"
                aria-label="Accept all cookies"
              >
                ✓ Приемам всички / Accept All
              </button>
              <button 
                onClick={rejectNonEssential} 
                className="cookie-btn cookie-btn-secondary"
                aria-label="Reject non-essential cookies"
              >
                Само задължителни / Essential Only
              </button>
              <button 
                onClick={() => setShowCustomize(true)} 
                className="cookie-btn cookie-btn-tertiary"
                aria-label="Customize cookie preferences"
              >
                ⚙️ Персонализиране / Customize
              </button>
            </div>
          </div>
        ) : (
          // Customize Panel
          <div className="cookie-banner-customize">
            <div className="cookie-header">
              <h3>⚙️ Персонализиране / Customize Cookies</h3>
              <button 
                onClick={() => setShowCustomize(false)} 
                className="cookie-close"
                aria-label="Close customize panel"
              >
                ✕
              </button>
            </div>

            <div className="cookie-body">
              <div className="cookie-option">
                <div className="cookie-option-header">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={preferences.essential} 
                      disabled 
                    />
                    <strong>🔐 Задължителни / Essential</strong>
                  </label>
                  <span className="cookie-required">Задължителни / Required</span>
                </div>
                <p className="cookie-option-desc">
                  <strong>BG:</strong> Необходими за основното функциониране на сайта (навигация, сигурност).<br />
                  <strong>EN:</strong> Required for basic site functionality (navigation, security).
                </p>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-header">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={preferences.analytics}
                      onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    />
                    <strong>📊 Аналитични / Analytics</strong>
                  </label>
                </div>
                <p className="cookie-option-desc">
                  <strong>BG:</strong> Помагат ни да разберем как посетителите използват сайта (анонимни данни).<br />
                  <strong>EN:</strong> Help us understand how visitors use the site (anonymous data).
                </p>
              </div>

              <div className="cookie-option">
                <div className="cookie-option-header">
                  <label>
                    <input 
                      type="checkbox" 
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    />
                    <strong>📧 Маркетингови / Marketing</strong>
                  </label>
                </div>
                <p className="cookie-option-desc">
                  <strong>BG:</strong> Използват се за показване на персонализирани реклами (Facebook Pixel, Meta).<br />
                  <strong>EN:</strong> Used to display personalized ads (Facebook Pixel, Meta).
                </p>
              </div>
            </div>

            <div className="cookie-actions">
              <button 
                onClick={saveCustom} 
                className="cookie-btn cookie-btn-primary"
                aria-label="Save custom preferences"
              >
                ✓ Запази избора / Save Preferences
              </button>
              <button 
                onClick={() => setShowCustomize(false)} 
                className="cookie-btn cookie-btn-secondary"
                aria-label="Cancel customization"
              >
                Назад / Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
