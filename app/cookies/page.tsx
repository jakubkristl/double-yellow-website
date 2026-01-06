"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import "../privacy/styles.css";

export default function CookiesPage() {
  const [language, setLanguage] = useState<"bg" | "en">("bg");

  return (
    <div className="page-container">
      <Breadcrumbs />
      
      <div className="legal-header">
        <div className="legal-header-top">
          <h1>{language === "bg" ? "Политика за бисквитки" : "Cookie Policy"}</h1>
          <button 
            onClick={() => window.history.back()} 
            className="close-btn"
            aria-label="Go back"
          >
            ✕
          </button>
        </div>
        <div className="language-toggle">
          <button 
            onClick={() => setLanguage("bg")} 
            className={language === "bg" ? "active" : ""}
            aria-label="Switch to Bulgarian"
            title="Български"
          >
            🇧🇬
          </button>
          <button 
            onClick={() => setLanguage("en")} 
            className={language === "en" ? "active" : ""}
            aria-label="Switch to English"
            title="English"
          >
            🇬🇧
          </button>
        </div>
      </div>

      {language === "bg" ? <BulgarianContent /> : <EnglishContent />}
    </div>
  );
}

function BulgarianContent() {
  return (
    <div className="legal-content">
      {/* TL;DR Section */}
      <div className="tldr-section">
        <h2>📋 Накратко (TL;DR)</h2>
        <ul className="tldr-list">
          <li>🍪 Използваме бисквитки за работата и подобряването на сайта</li>
          <li>✅ Технически бисквитки са задължителни за функционирането</li>
          <li>📊 Аналитични бисквитки ни помагат да подобрим сайта</li>
          <li>📧 Маркетингови бисквитки (Meta/Facebook) само при ваше съгласие</li>
          <li>⚙️ Можете да управлявате бисквитките от браузъра си</li>
        </ul>
      </div>

      <section>
        <h2>1. Какво представляват бисквитките</h2>
        <p>
          Бисквитките („cookies") са малки текстови файлове, които се съхраняват на устройството на потребителя 
          (компютър, таблет, мобилен телефон) при посещение на уебсайта <strong>www.doubleyellowsquash.com</strong>.
        </p>
        <p>
          Те позволяват сайтът да разпознава устройството на потребителя и да подобрява неговото функциониране 
          и потребителското изживяване.
        </p>
      </section>

      <section>
        <h2>2. Защо използваме бисквитки</h2>
        <p>Double Yellow squash център използва бисквитки за следните цели:</p>
        <ul>
          <li>✅ Правилно функциониране на уебсайта</li>
          <li>✅ Подобряване на производителността и сигурността</li>
          <li>📊 Анализ на посещаемостта и поведението на потребителите</li>
          <li>📧 Маркетингови и рекламни цели (само при изрично съгласие)</li>
        </ul>
      </section>

      <section>
        <h2>3. Видове бисквитки, които използваме</h2>
        
        <h3>3.1. Задължителни (технически) бисквитки</h3>
        <div className="info-box">
          <p>
            Тези бисквитки са <strong>необходими</strong> за нормалната работа на сайта и не могат 
            да бъдат изключени. Те позволяват:
          </p>
          <ul>
            <li>🔐 Навигация в сайта</li>
            <li>🔒 Достъп до защитени зони</li>
            <li>💾 Запазване на направени избори (напр. език)</li>
          </ul>
        </div>

        <h3>3.2. Аналитични бисквитки</h3>
        <div className="info-box">
          <p>Използват се за събиране на анонимна информация относно:</p>
          <ul>
            <li>👥 Броя посетители</li>
            <li>📄 Посещаваните страници</li>
            <li>⏱️ Времето, прекарано на сайта</li>
          </ul>
          <p>
            Тази информация ни помага да подобрим съдържанието и функционалността на сайта.
          </p>
        </div>

        <h3>3.3. Функционални бисквитки</h3>
        <p>
          Позволяват на сайта да запомни направени от потребителя избори и предпочитания 
          с цел по-добро персонализиране.
        </p>

        <h3>3.4. Маркетингови бисквитки</h3>
        <div className="info-box marketing-consent">
          <h3>📧 Важно: Само при ваше съгласие</h3>
          <p>Използват се за:</p>
          <ul>
            <li>📢 Показване на релевантни реклами</li>
            <li>📊 Анализ на ефективността на маркетингови кампании</li>
          </ul>
          <p>
            <strong>Тези бисквитки се използват само след изрично съгласие на потребителя.</strong>
          </p>
        </div>
      </section>

      <section>
        <h2>4. Маркетингови бисквитки (Facebook / Meta)</h2>
        <div className="gdpr-contact-box">
          <h3>📘 Facebook Pixel</h3>
          <p>
            Сайтът използва <strong>Facebook Pixel</strong>, предоставен от Meta Platforms Ireland Ltd., с цел:
          </p>
          <ul>
            <li>📊 Измерване ефективността на рекламните кампании</li>
            <li>🎯 Показване на персонализирани реклами</li>
            <li>📈 Анализ на поведението на потребителите след посещение на сайта</li>
          </ul>
          
          <h4>Събирана информация:</h4>
          <p>Facebook Pixel събира информация като:</p>
          <ul>
            <li>Посетени страници</li>
            <li>Действия на сайта (напр. резервация, изпратена форма)</li>
            <li>IP адрес</li>
            <li>Тип устройство и браузър</li>
          </ul>
          
          <h4>⚠️ Прехвърляне на данни:</h4>
          <p>
            Тези данни могат да бъдат обработвани от Meta и <strong>прехвърляни извън Европейския съюз</strong> 
            при спазване на приложимите механизми за защита.
          </p>
          
          <h4>🔐 Вашият контрол:</h4>
          <p>
            Маркетинговите бисквитки се активират само след изрично съгласие на потребителя чрез cookie банера.
          </p>
        </div>
      </section>

      <section>
        <h2>5. Бисквитки на трети страни</h2>
        <p>Сайтът използва бисквитки на следните трети страни:</p>
        <ul>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong> (Facebook Pixel) – за маркетингови и рекламни цели
          </li>
        </ul>
        <p>
          Възможно е сайтът да използва услуги на други трети страни, които поставят свои бисквитки, като например:
        </p>
        <ul>
          <li>Google Analytics (за анализ на трафика)</li>
          <li>YouTube (за видео съдържание)</li>
          <li>Платежни оператори</li>
        </ul>
        <p>
          Тези бисквитки се управляват съгласно политиките за поверителност на съответните трети страни.
        </p>
        <p>
          Повече информация за обработката на данни от Meta можете да намерите в тяхната политика за поверителност: 
          <br />
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
            https://www.facebook.com/privacy/policy
          </a>
        </p>
      </section>

      <section>
        <h2>6. Управление на бисквитките</h2>
        <div className="info-box">
          <h3>🎛️ Вашият избор</h3>
          <p>При първото посещение на сайта се показва банер за бисквитки, чрез който потребителят може:</p>
          <ul>
            <li>✅ Да приеме всички бисквитки</li>
            <li>❌ Да откаже незадължителните бисквитки</li>
            <li>⚙️ Да направи персонализиран избор</li>
          </ul>
          <p>
            Потребителят може по всяко време да промени настройките си чрез настройките на браузъра.
          </p>
        </div>
      </section>

      <section>
        <h2>7. Как да изтриете или блокирате бисквитки</h2>
        <p>Повечето браузъри позволяват:</p>
        <ul>
          <li>👀 Преглед на съхранените бисквитки</li>
          <li>🗑️ Изтриване на всички или избрани бисквитки</li>
          <li>🚫 Блокиране на бъдещо използване</li>
        </ul>
        
        <div className="info-box marketing-consent">
          <h3>⚠️ Важно</h3>
          <p>
            Имайте предвид, че блокирането на някои бисквитки може да повлияе на функционалността на сайта.
          </p>
        </div>

        <h3>Инструкции за популярни браузъри:</h3>
        <ul>
          <li>
            <strong>Chrome:</strong> Настройки → Поверителност и сигурност → Бисквитки и други данни от сайтове
          </li>
          <li>
            <strong>Firefox:</strong> Настройки → Поверителност и сигурност → Бисквитки и данни от сайтове
          </li>
          <li>
            <strong>Safari:</strong> Предпочитания → Поверителност → Управление на данни от уебсайтове
          </li>
          <li>
            <strong>Edge:</strong> Настройки → Бисквитки и разрешения за сайтове → Управление и изтриване на бисквитки
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Връзка с Политиката за защита на личните данни</h2>
        <p>
          Повече информация за начина, по който обработваме лични данни, можете да намерите в нашата 
          <a href="/privacy"> Политика за защита на личните данни</a>.
        </p>
      </section>

      <section>
        <h2>9. Промени в Политиката за бисквитки</h2>
        <p>
          Настоящата политика може да бъде актуализирана при промяна в законодателството или използваните технологии. 
          Всички промени се публикуват на тази страница.
        </p>
        <p><strong>Последна актуализация:</strong> 03.01.2026</p>
      </section>
    </div>
  );
}

function EnglishContent() {
  return (
    <div className="legal-content">
      {/* TL;DR Section */}
      <div className="tldr-section">
        <h2>📋 Quick Summary (TL;DR)</h2>
        <ul className="tldr-list">
          <li>🍪 We use cookies for website operation and improvement</li>
          <li>✅ Technical cookies are required for functionality</li>
          <li>📊 Analytics cookies help us improve the site</li>
          <li>📧 Marketing cookies (Meta/Facebook) only with your consent</li>
          <li>⚙️ You can manage cookies through your browser</li>
        </ul>
      </div>

      <section>
        <h2>1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on a user's device (computer, tablet, mobile phone) 
          when visiting the website <strong>www.doubleyellowsquash.com</strong>.
        </p>
        <p>
          They allow the website to recognize the user's device and improve its functionality 
          and user experience.
        </p>
      </section>

      <section>
        <h2>2. Why We Use Cookies</h2>
        <p>Double Yellow squash center uses cookies for the following purposes:</p>
        <ul>
          <li>✅ Proper website functionality</li>
          <li>✅ Improving performance and security</li>
          <li>📊 Analyzing traffic and user behavior</li>
          <li>📧 Marketing and advertising purposes (only with explicit consent)</li>
        </ul>
      </section>

      <section>
        <h2>3. Types of Cookies We Use</h2>
        
        <h3>3.1. Essential (Technical) Cookies</h3>
        <div className="info-box">
          <p>
            These cookies are <strong>necessary</strong> for the normal operation of the site and cannot 
            be disabled. They enable:
          </p>
          <ul>
            <li>🔐 Site navigation</li>
            <li>🔒 Access to secure areas</li>
            <li>💾 Saving your choices (e.g., language)</li>
          </ul>
        </div>

        <h3>3.2. Analytics Cookies</h3>
        <div className="info-box">
          <p>Used to collect anonymous information about:</p>
          <ul>
            <li>👥 Number of visitors</li>
            <li>📄 Pages visited</li>
            <li>⏱️ Time spent on site</li>
          </ul>
          <p>
            This information helps us improve site content and functionality.
          </p>
        </div>

        <h3>3.3. Functional Cookies</h3>
        <p>
          Allow the site to remember user choices and preferences 
          for better personalization.
        </p>

        <h3>3.4. Marketing Cookies</h3>
        <div className="info-box marketing-consent">
          <h3>📧 Important: Only With Your Consent</h3>
          <p>Used for:</p>
          <ul>
            <li>📢 Displaying relevant advertisements</li>
            <li>📊 Analyzing marketing campaign effectiveness</li>
          </ul>
          <p>
            <strong>These cookies are used only after explicit user consent.</strong>
          </p>
        </div>
      </section>

      <section>
        <h2>4. Marketing Cookies (Facebook / Meta)</h2>
        <div className="gdpr-contact-box">
          <h3>📘 Facebook Pixel</h3>
          <p>
            The site uses <strong>Facebook Pixel</strong>, provided by Meta Platforms Ireland Ltd., to:
          </p>
          <ul>
            <li>📊 Measure advertising campaign effectiveness</li>
            <li>🎯 Display personalized ads</li>
            <li>📈 Analyze user behavior after visiting the site</li>
          </ul>
          
          <h4>Information Collected:</h4>
          <p>Facebook Pixel collects information such as:</p>
          <ul>
            <li>Pages visited</li>
            <li>Actions on site (e.g., booking, form submission)</li>
            <li>IP address</li>
            <li>Device type and browser</li>
          </ul>
          
          <h4>⚠️ Data Transfer:</h4>
          <p>
            This data may be processed by Meta and <strong>transferred outside the European Union</strong> 
            in compliance with applicable protection mechanisms.
          </p>
          
          <h4>🔐 Your Control:</h4>
          <p>
            Marketing cookies are activated only after explicit user consent through the cookie banner.
          </p>
        </div>
      </section>

      <section>
        <h2>5. Third-Party Cookies</h2>
        <p>The site uses cookies from the following third parties:</p>
        <ul>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong> (Facebook Pixel) – for marketing and advertising purposes
          </li>
        </ul>
        <p>
          The site may use services from other third parties that set their own cookies, such as:
        </p>
        <ul>
          <li>Google Analytics (for traffic analysis)</li>
          <li>YouTube (for video content)</li>
          <li>Payment operators</li>
        </ul>
        <p>
          These cookies are managed according to the privacy policies of the respective third parties.
        </p>
        <p>
          More information about data processing by Meta can be found in their privacy policy: 
          <br />
          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer">
            https://www.facebook.com/privacy/policy
          </a>
        </p>
      </section>

      <section>
        <h2>6. Managing Cookies</h2>
        <div className="info-box">
          <h3>🎛️ Your Choice</h3>
          <p>On first visit to the site, a cookie banner is displayed, allowing the user to:</p>
          <ul>
            <li>✅ Accept all cookies</li>
            <li>❌ Reject non-essential cookies</li>
            <li>⚙️ Make a personalized choice</li>
          </ul>
          <p>
            Users can change their settings at any time through browser settings.
          </p>
        </div>
      </section>

      <section>
        <h2>7. How to Delete or Block Cookies</h2>
        <p>Most browsers allow you to:</p>
        <ul>
          <li>👀 View stored cookies</li>
          <li>🗑️ Delete all or selected cookies</li>
          <li>🚫 Block future use</li>
        </ul>
        
        <div className="info-box marketing-consent">
          <h3>⚠️ Important</h3>
          <p>
            Please note that blocking some cookies may affect site functionality.
          </p>
        </div>

        <h3>Instructions for Popular Browsers:</h3>
        <ul>
          <li>
            <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
          </li>
          <li>
            <strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data
          </li>
          <li>
            <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
          </li>
          <li>
            <strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies
          </li>
        </ul>
      </section>

      <section>
        <h2>8. Link to Privacy Policy</h2>
        <p>
          More information about how we process personal data can be found in our 
          <a href="/privacy"> Privacy Policy</a>.
        </p>
      </section>

      <section>
        <h2>9. Changes to Cookie Policy</h2>
        <p>
          This policy may be updated due to changes in legislation or technologies used. 
          All changes are published on this page.
        </p>
        <p><strong>Last updated:</strong> January 3, 2026</p>
      </section>
    </div>
  );
}
