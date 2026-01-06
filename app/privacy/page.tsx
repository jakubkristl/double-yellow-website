"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import "./styles.css";

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<"bg" | "en">("bg");

  return (
    <div className="page-container">
      <Breadcrumbs />
      
      <div className="legal-header">
        <div className="legal-header-top">
          <h1>{language === "bg" ? "Политика за защита на личните данни" : "Privacy Policy"}</h1>
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
          <li>✅ Събираме само необходими данни за резервации и услуги</li>
          <li>✅ Данните ви се използват само за заявените цели</li>
          <li>✅ Имате право на достъп, корекция и изтриване по всяко време</li>
          <li>✅ Видеозаписи от камерите се съхраняват до 30 дни</li>
          <li>✅ За GDPR заявки: <strong>jakub@doubleyellowsquash.com</strong></li>
        </ul>
      </div>

      <section>
        <h2>1. Обща информация</h2>
        <p>
          Настоящата Политика за защита на личните данни има за цел да информира потребителите на уебсайта 
          doubleyellowsquash.com, собственост на Спорт енд бионд ЕООД, относно начина, по който се събират, 
          използват, съхраняват и защитават личните им данни.
        </p>
        <p>
          Политиката е изготвена в съответствие с Регламент (ЕС) 2016/679 (GDPR) и приложимото българско законодателство.
        </p>
      </section>

      <section>
        <h2>2. Администратор на лични данни</h2>
        <p>Администратор на личните данни е:</p>
        <ul>
          <li><strong>Фирма:</strong> Спорт енд бионд ЕООД</li>
          <li><strong>ЕИК:</strong> 208134448</li>
          <li><strong>Адрес:</strong> гр. София, ул. Любен Русев 6, ап.6</li>
          <li><strong>Имейл:</strong> <a href="mailto:jakub@doubleyellowsquash.com">jakub@doubleyellowsquash.com</a></li>
          <li><strong>Телефон:</strong> <a href="tel:+359896754014">+359 896 754 014</a></li>
        </ul>
      </section>

      <section>
        <h2>3. Какви лични данни събираме</h2>
        <p>В зависимост от използваните услуги, можем да събираме следните лични данни:</p>
        <ul>
          <li>Име и фамилия</li>
          <li>Имейл адрес</li>
          <li>Телефонен номер</li>
          <li>Данни за резервации (дата, час, услуга)</li>
          <li>Данни за плащане (чрез външни платежни оператори)</li>
          <li>IP адрес и данни за използване на сайта</li>
          <li>Данни, предоставени чрез контактни форми</li>
          <li>Данни за посещения: видеозаписи от охранителни камери, регистрация за събития, абонаментни карти</li>
          <li>Здравни данни: само при необходимост за специализирани спортни услуги (напр. медицинско свидетелство)</li>
          <li>Данни за плащане: банкови сметки, детайли за плащане чрез ПОС терминал</li>
        </ul>
        <p>
          <strong>Важно:</strong> Всеки потребител предоставя доброволно своите лични данни и по-конкретно данни за 
          контакт при запазване и физическо посещение на услугите на скуош центъра.
        </p>
        
        <div className="info-box">
          <h3>🎥 Видеонаблюдение (CCTV)</h3>
          <p>
            В спортния комплекс е налична система за видеонаблюдение с цел осигуряване на безопасност на лицата и имуществото.
          </p>
          <p>
            <strong>Срок на съхранение:</strong> Видеозаписите се съхраняват за срок до <strong>30 дни</strong>, 
            след което автоматично се изтриват, освен ако не са необходими за разследване на инцидент.
          </p>
        </div>
      </section>

      <section>
        <h2>4. Цели на обработването</h2>
        <p>Личните данни се обработват за следните цели:</p>
        <ul>
          <li>✅ Обработка на резервации за игри и тренировки</li>
          <li>✅ Комуникация с клиенти</li>
          <li>✅ Администриране на потребителски акаунти (ако има)</li>
          <li>✅ Изпълнение на договорни задължения</li>
          <li>✅ Счетоводни и законови изисквания</li>
          <li>✅ Подобряване на услугите и функционалността на сайта</li>
          <li>📧 Маркетингови цели (само при изрично съгласие)</li>
        </ul>
        
        <div className="info-box marketing-consent">
          <h3>📧 Маркетингови съобщения</h3>
          <p>
            Маркетинговите комуникации са <strong>напълно отделни</strong> от общите условия за ползване на услугите. 
            Вие можете да откажете маркетингови съобщения, без това да засегне достъпа ви до спортните услуги.
          </p>
          <p>
            За да откажете маркетингови съобщения, изпратете имейл на: 
            <a href="mailto:jakub@doubleyellowsquash.com"> jakub@doubleyellowsquash.com</a>
          </p>
        </div>
      </section>

      <section>
        <h2>5. Правно основание за обработване</h2>
        <p>Обработваме лични данни на следните основания:</p>
        <ul>
          <li>Изпълнение на договор</li>
          <li>Законово задължение</li>
          <li>Легитимен интерес</li>
          <li>Изрично съгласие на субекта на данни</li>
        </ul>
      </section>

      <section>
        <h2>6. Срок на съхранение</h2>
        <p>Личните данни се съхраняват:</p>
        <ul>
          <li>За периода, необходим за изпълнение на целите</li>
          <li>Съгласно законовите срокове (напр. 5 години за счетоводни данни)</li>
          <li>До оттегляне на съгласието (когато е приложимо)</li>
          <li>Видеозаписи от охранителни камери: <strong>до 30 дни</strong></li>
        </ul>
      </section>

      <section>
        <h2>7. Предоставяне на данни на трети лица</h2>
        <p>Лични данни могат да бъдат предоставяни на:</p>
        <ul>
          <li>Платежни оператори (за обработка на плащания)</li>
          <li>Счетоводни и IT доставчици</li>
          <li>Партньори за обработка на Multisport и CoolFit карти</li>
          <li>Държавни органи, когато това е изискано по закон</li>
        </ul>
        <p>Всички трети страни обработват данните при спазване на GDPR.</p>
      </section>

      <section>
        <h2>8. Бисквитки (Cookies)</h2>
        <p>
          Сайтът използва бисквитки за подобряване на потребителското изживяване. 
          Подробна информация е налична в нашата <a href="/cookies">Политика за бисквитки</a>.
        </p>
      </section>

      <section>
        <h2>9. Права на субектите на данни</h2>
        <p>Всеки потребител има право да:</p>
        <ul className="rights-list">
          <li>📄 Получи информация за обработваните си данни</li>
          <li>✏️ Поиска корекция на неточни данни</li>
          <li>🗑️ Поиска изтриване („право да бъдеш забравен")</li>
          <li>⏸️ Ограничи обработването</li>
          <li>🚫 Възрази срещу обработването</li>
          <li>📦 Пренесе данните си към друг администратор</li>
          <li>❌ Оттегли съгласието си по всяко време</li>
        </ul>
        
        <div className="gdpr-contact-box">
          <h3>📬 Контакт за GDPR заявки</h3>
          <p>За упражняване на вашите права, моля изпратете заявка на:</p>
          <p>
            <strong>Имейл:</strong> <a href="mailto:jakub@doubleyellowsquash.com">jakub@doubleyellowsquash.com</a><br />
            <strong>Телефон:</strong> <a href="tel:+359896754014">+359 896 754 014</a><br />
            <strong>Срок за отговор:</strong> До 30 дни от получаване на заявката
          </p>
        </div>
      </section>

      <section>
        <h2>10. Сигурност на данните</h2>
        <p>
          Прилагаме подходящи технически и организационни мерки за защита на личните данни от 
          неоторизиран достъп, загуба или злоупотреба.
        </p>
      </section>

      <section>
        <h2>11. Обработка на лични данни на деца</h2>
        <p>
          Скуош центърът обработва лични данни на деца само във връзка с участието им в детската школа, 
          тренировки, състезания и свързани спортни дейности.
        </p>
        <p>
          Обработването на лични данни на деца се извършва само след съгласие на родител или законен настойник, 
          в съответствие с чл. 8 от Регламент (ЕС) 2016/679 (GDPR).
        </p>

        <h3>Данни на деца</h3>
        <p>В рамките на детската школа могат да се обработват следните данни:</p>
        <ul>
          <li>Три имена на детето</li>
          <li>Дата на раждане / възраст</li>
          <li>Информация за група и ниво на подготовка</li>
          <li>Данни за посещаемост и тренировки</li>
          <li>Медицинска информация, предоставена доброволно от родителя (напр. алергии)</li>
          <li>Снимки и видеоматериали (само при изрично съгласие)</li>
        </ul>

        <h3>Данни на родител/настойник</h3>
        <p>За целите на комуникацията и администрирането се обработват:</p>
        <ul>
          <li>Три имена на родител/настойник</li>
          <li>Телефонен номер</li>
          <li>Имейл адрес</li>
        </ul>

        <h3>Цели на обработването</h3>
        <p>Личните данни се обработват с цел:</p>
        <ul>
          <li>Организиране и провеждане на тренировки</li>
          <li>Осигуряване на безопасността на децата</li>
          <li>Комуникация с родители/настойници</li>
          <li>Административна отчетност</li>
          <li>Участие в състезания и събития (когато е приложимо)</li>
        </ul>

        <h3>Правно основание</h3>
        <p>Правното основание за обработването е:</p>
        <ul>
          <li>Изрично съгласие на родител или законен настойник</li>
          <li>Изпълнение на договор за спортна услуга</li>
          <li>Законово задължение</li>
        </ul>

        <h3>Срок на съхранение</h3>
        <p>Данните на децата се съхраняват:</p>
        <ul>
          <li>За срока на участие в детската школа</li>
          <li>До оттегляне на съгласието от родителя/настойника</li>
          <li>Съгласно законовите срокове за отчетност</li>
        </ul>

        <h3>Права на родителите/настойниците</h3>
        <p>Родителите или законните настойници имат право:</p>
        <ul>
          <li>На достъп до личните данни</li>
          <li>На корекция или изтриване</li>
          <li>На ограничаване или възражение срещу обработването</li>
          <li>Да оттеглят съгласието си по всяко време</li>
        </ul>

        <h3>Снимки и видеоматериали</h3>
        <p>
          Снимки и видеоматериали на деца се използват само след изрично писмено съгласие на родител/настойник 
          и единствено за:
        </p>
        <ul>
          <li>Вътрешна комуникация</li>
          <li>Уебсайт и социални мрежи на скуош центъра</li>
          <li>Промоционални материали</li>
        </ul>
        <p><strong>Важно:</strong> Съгласието може да бъде оттеглено по всяко време.</p>
      </section>

      <section>
        <h2>12. Подаване на жалби</h2>
        <p>Ако считате, че правата ви са нарушени, имате право да подадете жалба до:</p>
        <p>
          <strong>Комисия за защита на личните данни (КЗЛД)</strong><br />
          <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>
        </p>
      </section>

      <section>
        <h2>13. Промени в политиката</h2>
        <p>
          Настоящата политика може да бъде актуализирана. Всички промени ще бъдат публикувани на тази страница.
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
          <li>✅ We collect only necessary data for bookings and services</li>
          <li>✅ Your data is used only for stated purposes</li>
          <li>✅ You have the right to access, correct, and delete at any time</li>
          <li>✅ CCTV recordings are stored for up to 30 days</li>
          <li>✅ For GDPR requests: <strong>jakub@doubleyellowsquash.com</strong></li>
        </ul>
      </div>

      <section>
        <h2>1. General Information</h2>
        <p>
          This Privacy Policy aims to inform users of the website doubleyellowsquash.com, owned by Sport And Beyond EOOD, 
          about how their personal data is collected, used, stored, and protected.
        </p>
        <p>
          The policy is prepared in accordance with Regulation (EU) 2016/679 (GDPR) and applicable Bulgarian legislation.
        </p>
      </section>

      <section>
        <h2>2. Data Controller</h2>
        <p>The data controller is:</p>
        <ul>
          <li><strong>Company:</strong> Sport And Beyond EOOD</li>
          <li><strong>UIC:</strong> 208134448</li>
          <li><strong>Address:</strong> Sofia, 6 Lyuben Rusev str., apt. 6</li>
          <li><strong>Email:</strong> <a href="mailto:jakub@doubleyellowsquash.com">jakub@doubleyellowsquash.com</a></li>
          <li><strong>Phone:</strong> <a href="tel:+359896754014">+359 896 754 014</a></li>
        </ul>
      </section>

      <section>
        <h2>3. What Personal Data We Collect</h2>
        <p>Depending on the services used, we may collect the following personal data:</p>
        <ul>
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Booking data (date, time, service)</li>
          <li>Payment data (through external payment operators)</li>
          <li>IP address and website usage data</li>
          <li>Data provided through contact forms</li>
          <li>Visit data: CCTV recordings, event registration, membership cards</li>
          <li>Health data: only when necessary for specialized sports services (e.g., medical certificate)</li>
          <li>Payment data: bank accounts, POS terminal payment details</li>
        </ul>
        <p>
          <strong>Important:</strong> Each user voluntarily provides their personal data, specifically contact data 
          when booking and physically visiting the squash center services.
        </p>
        
        <div className="info-box">
          <h3>🎥 Video Surveillance (CCTV)</h3>
          <p>
            The sports complex has a video surveillance system to ensure the safety of individuals and property.
          </p>
          <p>
            <strong>Retention period:</strong> Video recordings are stored for up to <strong>30 days</strong>, 
            after which they are automatically deleted unless required for incident investigation.
          </p>
        </div>
      </section>

      <section>
        <h2>4. Purposes of Processing</h2>
        <p>Personal data is processed for the following purposes:</p>
        <ul>
          <li>✅ Processing game and training bookings</li>
          <li>✅ Communication with clients</li>
          <li>✅ Managing user accounts (if applicable)</li>
          <li>✅ Fulfilling contractual obligations</li>
          <li>✅ Accounting and legal requirements</li>
          <li>✅ Improving services and website functionality</li>
          <li>📧 Marketing purposes (only with explicit consent)</li>
        </ul>
        
        <div className="info-box marketing-consent">
          <h3>📧 Marketing Communications</h3>
          <p>
            Marketing communications are <strong>completely separate</strong> from the general terms of service use. 
            You can opt out of marketing messages without affecting your access to sports services.
          </p>
          <p>
            To opt out of marketing communications, send an email to: 
            <a href="mailto:jakub@doubleyellowsquash.com"> jakub@doubleyellowsquash.com</a>
          </p>
        </div>
      </section>

      <section>
        <h2>5. Legal Basis for Processing</h2>
        <p>We process personal data on the following grounds:</p>
        <ul>
          <li>Performance of contract</li>
          <li>Legal obligation</li>
          <li>Legitimate interest</li>
          <li>Explicit consent of the data subject</li>
        </ul>
      </section>

      <section>
        <h2>6. Retention Period</h2>
        <p>Personal data is stored:</p>
        <ul>
          <li>For the period necessary to fulfill the purposes</li>
          <li>According to legal retention periods (e.g., 5 years for accounting data)</li>
          <li>Until withdrawal of consent (when applicable)</li>
          <li>CCTV recordings: <strong>up to 30 days</strong></li>
        </ul>
      </section>

      <section>
        <h2>7. Disclosure to Third Parties</h2>
        <p>Personal data may be disclosed to:</p>
        <ul>
          <li>Payment operators (for payment processing)</li>
          <li>Accounting and IT providers</li>
          <li>Partners for processing Multisport and CoolFit cards</li>
          <li>Government authorities when required by law</li>
        </ul>
        <p>All third parties process data in compliance with GDPR.</p>
      </section>

      <section>
        <h2>8. Cookies</h2>
        <p>
          The website uses cookies to improve user experience. 
          Detailed information is available in our <a href="/cookies">Cookie Policy</a>.
        </p>
      </section>

      <section>
        <h2>9. Data Subject Rights</h2>
        <p>Every user has the right to:</p>
        <ul className="rights-list">
          <li>📄 Obtain information about their processed data</li>
          <li>✏️ Request correction of inaccurate data</li>
          <li>🗑️ Request deletion ("right to be forgotten")</li>
          <li>⏸️ Restrict processing</li>
          <li>🚫 Object to processing</li>
          <li>📦 Transfer their data to another controller</li>
          <li>❌ Withdraw consent at any time</li>
        </ul>
        
        <div className="gdpr-contact-box">
          <h3>📬 Contact for GDPR Requests</h3>
          <p>To exercise your rights, please send a request to:</p>
          <p>
            <strong>Email:</strong> <a href="mailto:jakub@doubleyellowsquash.com">jakub@doubleyellowsquash.com</a><br />
            <strong>Phone:</strong> <a href="tel:+359896754014">+359 896 754 014</a><br />
            <strong>Response time:</strong> Up to 30 days from receiving the request
          </p>
        </div>
      </section>

      <section>
        <h2>10. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect personal data from 
          unauthorized access, loss, or misuse.
        </p>
      </section>

      <section>
        <h2>11. Processing of Children's Personal Data</h2>
        <p>
          The squash center processes children's personal data only in connection with their participation in 
          junior school, training, competitions, and related sports activities.
        </p>
        <p>
          Processing of children's personal data is performed only with the consent of a parent or legal guardian, 
          in accordance with Article 8 of Regulation (EU) 2016/679 (GDPR).
        </p>

        <h3>Children's Data</h3>
        <p>Within the junior school, the following data may be processed:</p>
        <ul>
          <li>Child's full name</li>
          <li>Date of birth / age</li>
          <li>Information about group and skill level</li>
          <li>Attendance and training data</li>
          <li>Medical information voluntarily provided by the parent (e.g., allergies)</li>
          <li>Photos and videos (only with explicit consent)</li>
        </ul>

        <h3>Parent/Guardian Data</h3>
        <p>For communication and administration purposes, we process:</p>
        <ul>
          <li>Parent/guardian's full name</li>
          <li>Phone number</li>
          <li>Email address</li>
        </ul>

        <h3>Processing Purposes</h3>
        <p>Personal data is processed for:</p>
        <ul>
          <li>Organizing and conducting training sessions</li>
          <li>Ensuring children's safety</li>
          <li>Communication with parents/guardians</li>
          <li>Administrative reporting</li>
          <li>Participation in competitions and events (when applicable)</li>
        </ul>

        <h3>Legal Basis</h3>
        <p>The legal basis for processing is:</p>
        <ul>
          <li>Explicit consent of parent or legal guardian</li>
          <li>Performance of contract for sports services</li>
          <li>Legal obligation</li>
        </ul>

        <h3>Retention Period</h3>
        <p>Children's data is stored:</p>
        <ul>
          <li>For the duration of participation in junior school</li>
          <li>Until withdrawal of consent by parent/guardian</li>
          <li>According to legal retention periods for reporting</li>
        </ul>

        <h3>Parents'/Guardians' Rights</h3>
        <p>Parents or legal guardians have the right to:</p>
        <ul>
          <li>Access personal data</li>
          <li>Request correction or deletion</li>
          <li>Restrict or object to processing</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h3>Photos and Videos</h3>
        <p>
          Photos and videos of children are used only after explicit written consent from parent/guardian 
          and solely for:
        </p>
        <ul>
          <li>Internal communication</li>
          <li>Squash center website and social media</li>
          <li>Promotional materials</li>
        </ul>
        <p><strong>Important:</strong> Consent can be withdrawn at any time.</p>
      </section>

      <section>
        <h2>12. Filing Complaints</h2>
        <p>If you believe your rights have been violated, you have the right to file a complaint with:</p>
        <p>
          <strong>Commission for Personal Data Protection (CPDP)</strong><br />
          <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer">www.cpdp.bg</a>
        </p>
      </section>

      <section>
        <h2>13. Policy Changes</h2>
        <p>
          This policy may be updated. All changes will be published on this page.
        </p>
        <p><strong>Last updated:</strong> January 3, 2026</p>
      </section>
    </div>
  );
}
