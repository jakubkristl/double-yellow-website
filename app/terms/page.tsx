"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import "../privacy/styles.css";

export default function TermsPage() {
  const [language, setLanguage] = useState<"bg" | "en">("bg");

  return (
    <div className="page-container">
      <Breadcrumbs />
      
      <div className="legal-header">
        <div className="legal-header-top">
          <h1>{language === "bg" ? "Общи условия" : "Terms & Conditions"}</h1>
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
            <Image src="/flags/bg.svg" alt="Bulgarian" width={32} height={20} />
          </button>
          <button 
            onClick={() => setLanguage("en")} 
            className={language === "en" ? "active" : ""}
            aria-label="Switch to English"
            title="English"
          >
            <Image src="/flags/gb.svg" alt="English" width={32} height={20} />
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
          <li>⏰ Резервациите са по 60 минути, явете се 5 мин преди началото</li>
          <li>❌ Анулирайте поне <strong>4 часа предварително</strong>, иначе таксуваме пълния час</li>
          <li>👟 Задължителни чисти спортни обувки и спортно облекло</li>
          <li>💳 Приемаме MultiSport, CoolFit карти, в брой и с карта</li>
          <li>🏸 При форс-мажорни обстоятелства си запазваме правото да отменим/пренасрочим резервации</li>
          <li>⚖️ За турнири: участвате на собствен риск, спазвайте феърплей</li>
        </ul>
      </div>

      <section>
        <h2>1. Общи положения</h2>
        <p>
          Настоящите Общи условия и правила уреждат реда и условията за ползване на спортните зали и услуги, 
          предоставяни от Double Yellow squash club, собственост на <strong>Спорт енд бионд ЕООД</strong>, 
          ЕИК 208134448, находящ се в НСА „Васил Левски", София, наричан по-долу „Центърът".
        </p>
        <p>
          С използването на залите, резервацията на час или участието в тренировки и турнири, всеки клиент 
          декларира, че е запознат с настоящите правила и ги приема безусловно.
        </p>
      </section>

      <section>
        <h2>2. Достъп и резервации</h2>
        <h3>2.1. Как да резервирате</h3>
        <p>Ползването на залите се извършва само след предварителна резервация, направена:</p>
        <ul>
          <li>🌐 Онлайн чрез сайта</li>
          <li>🏢 На място</li>
          <li>📞 По телефон: <a href="tel:+359896754014" onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
              return (window as any).gtag_report_conversion('tel:+359896754014');
            }
          }}>+359 896 754 014</a></li>
        </ul>

        <h3>2.2. Продължителност</h3>
        <p>Един резервиран час е с продължителност <strong>60 минути</strong>, освен ако не е уговорено друго.</p>

        <h3>2.3. Пристигане</h3>
        <p>Клиентите са длъжни да се явят <strong>най-малко 5 минути преди началото</strong> на часа.</p>
        <p>⚠️ <strong>Важно:</strong> Закъснение не удължава времето за ползване.</p>
      </section>

      <section>
        <h2>3. Анулации и неявяване</h2>
        <div className="info-box marketing-consent">
          <h3>⏰ Срокове за анулация</h3>
          <p>
            <strong>Анулациите трябва да бъдат направени най-малко 4 часа предварително.</strong>
          </p>
          <p>При неявяване или късна анулация (под 4 часа преди началото), Центърът си запазва правото:</p>
          <ul>
            <li>Да таксува пълната стойност на часа</li>
            <li>Да приспадне посещението от карта/абонамент</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>4. Такси и плащания</h2>
        <h3>4.1. Цени</h3>
        <p>Всички цени са обявени на сайта и на място.</p>

        <h3>4.2. Начини на плащане</h3>
        <div className="info-box">
          <h3>💳 Приемаме:</h3>
          <ul>
            <li>💵 В брой</li>
            <li>💳 С банкова карта (ПОС терминал)</li>
            <li>🏃 MultiSport карти</li>
            <li>❄️ CoolFit карти</li>
            <li>🎫 Други партньорски спортни карти (при наличие)</li>
          </ul>
        </div>

        <h3>4.3. Възстановяване на суми</h3>
        <p>
          Закупени карти, пакети и абонаменти <strong>не подлежат на възстановяване</strong>, 
          освен в предвидените от закона случаи.
        </p>
      </section>

      <section>
        <h2>5. Правила за ползване на залите</h2>
        <h3>5.1. Облекло и екипировка</h3>
        <p>В залите се допуска само:</p>
        <ul>
          <li>👕 Спортно облекло</li>
          <li>👟 Чисти спортни обувки, подходящи за скуош (с непишеща подметка)</li>
        </ul>

        <h3>5.2. Забранено е:</h3>
        <ul>
          <li>🚭 Тютюнопушене</li>
          <li>🚫 Употребата на наркотични вещества</li>
          <li>😡 Агресивно или неспортсменско поведение</li>
          <li>🔨 Повреждане на оборудването и настилките</li>
        </ul>

        <h3>5.3. Отговорност за щети</h3>
        <p>
          Клиентите носят <strong>имуществена отговорност</strong> за нанесени щети, 
          причинени умишлено или поради груба небрежност.
        </p>
      </section>

      <section>
        <h2>6. Безопасност и здраве</h2>
        <div className="gdpr-contact-box">
          <h3>⚠️ Важна информация за безопасност</h3>
          <p>
            Всеки клиент носи <strong>лична отговорност</strong> за здравословното си състояние и 
            физическата си подготовка.
          </p>
          <p>Центърът не носи отговорност за:</p>
          <ul>
            <li>Инциденти, настъпили поради неспазване на правилата</li>
            <li>Здравословни проблеми, възникнали по време на игра</li>
            <li>Травми, получени вследствие на физическо натоварване</li>
          </ul>
          <p>
            <strong>Препоръчва се:</strong> Загрявка преди игра и използване на предпазни средства 
            (очила за скуош, китки за китката и др.).
          </p>
        </div>
      </section>

      <section>
        <h2>7. Тренировки и детска школа</h2>
        <h3>7.1. Записване</h3>
        <p>Участието в тренировки и детска школа се извършва след записване.</p>

        <h3>7.2. За деца под 18 години</h3>
        <p>За деца под 18 години се изисква <strong>съгласие от родител или законен настойник</strong>.</p>
        <p>
          Родителите декларират, че детето е клинично здраво и може да участва в спортни занимания.
        </p>

        <h3>7.3. Регистрация на непълнолетни</h3>
        <p>
          В случай че курсистът е непълнолетен, при завършването на регистрацията, той декларира 
          информираност с Общите условия и съгласие на своите родители или попечители за приемане 
          на настоящите Общи условия и извършване на регистрация.
        </p>
        <p>
          В случай че клиентът/участникът е малолетен, изявлението за приемане на настоящите Общи 
          условия и за извършване на регистрация се извършва от родител или настойник.
        </p>
      </section>

      <section>
        <h2>8. Лични вещи</h2>
        <p>
          ⚠️ Центърът <strong>не носи отговорност</strong> за изгубени, откраднати или повредени лични вещи.
        </p>
        <p>Препоръчва се използването на шкафчета (ако са налични).</p>
      </section>

      <section>
        <h2>9. Снимки и видеозаписи, реклама</h2>
        <h3>9.1. Маркетингови материали</h3>
        <p>
          Възможно е в Центъра да се правят снимки и видеоматериали за маркетингови и информационни цели.
        </p>

        <h3>9.2. Съгласие за деца</h3>
        <p>За деца се изисква <strong>изрично съгласие от родител/настойник</strong>.</p>

        <h3>9.3. Маркетингови съобщения</h3>
        <div className="info-box marketing-consent">
          <h3>📧 Важно: Отделно съгласие за маркетинг</h3>
          <p>
            Маркетинговите съобщения са <strong>напълно отделни</strong> от приемането на настоящите 
            Общи условия.
          </p>
          <p>
            При записване имате възможност да изберете дали искате да получавате:
          </p>
          <ul>
            <li>Месечни бюлетини</li>
            <li>Промоционални съобщения</li>
            <li>Информация за нови услуги и събития</li>
          </ul>
          <p>
            Можете да откажете маркетинговите съобщения по всяко време, като изпратите имейл на 
            <a href="mailto:jakub@doubleyellowsquash.com"> jakub@doubleyellowsquash.com</a>
          </p>
          <p>
            <strong>Отказът от маркетингови съобщения не засяга достъпа ви до услугите на Центъра.</strong>
          </p>
        </div>
      </section>

      <section>
        <h2>10. Отказ от достъп</h2>
        <p>Центърът си запазва правото да откаже достъп или да прекрати ползването на залите при:</p>
        <ul>
          <li>Системно неспазване на правилата</li>
          <li>Агресивно поведение</li>
          <li>Застрашаване на безопасността на други лица</li>
        </ul>
      </section>

      <section>
        <h2>11. Форс-мажорни обстоятелства</h2>
        <div className="info-box">
          <h3>⚡ Форс-мажор</h3>
          <p>
            При настъпване на форс-мажорни обстоятелства, Центърът си запазва правото да 
            отмени или пренасрочи резервации без отговорност за щети.
          </p>
          <p>Форс-мажорни обстоятелства включват, но не се ограничават до:</p>
          <ul>
            <li>⚡ Прекъсване на електрозахранването</li>
            <li>💧 Наводнения или аварии във водоснабдяването</li>
            <li>🏗️ Аварийни ремонти на съоръженията</li>
            <li>🌪️ Природни бедствия</li>
            <li>🚨 Разпореждания от компетентни органи</li>
            <li>🔥 Пожар или други извънредни ситуации</li>
          </ul>
          <p>
            В такива случаи, Центърът ще се свърже с клиентите за пренасрочване или възстановяване 
            на таксата (ако е приложимо).
          </p>
        </div>
      </section>

      <section>
        <h2>12. Промени в правилата</h2>
        <p>
          Центърът си запазва правото да променя настоящите Общи условия, като актуалната версия 
          се публикува на сайта.
        </p>
      </section>

      <section>
        <h2>13. Приложимо право</h2>
        <p>За всички неуредени въпроси се прилага <strong>българското законодателство</strong>.</p>
      </section>

      <section>
        <h2>14. Турнири и състезания</h2>
        
        <h3>14.1. Общи условия за участие</h3>
        <p>
          Участието в турнири и състезания, организирани от Спорт енд бионд ЕООД, е доброволно и 
          се извършва след предварителна регистрация.
        </p>
        <p>С регистрацията си участниците декларират, че:</p>
        <ul>
          <li>Са запознати с настоящите Общи условия</li>
          <li>Отговарят на условията за участие</li>
          <li>Са в добро здравословно състояние</li>
        </ul>

        <h3>14.2. Регистрация и такси</h3>
        <p>Регистрацията за турнир може да се извършва:</p>
        <ul>
          <li>Онлайн</li>
          <li>На място</li>
          <li>По друг обявен от организатора начин</li>
        </ul>
        <p>
          Таксата за участие (ако има такава) се обявява предварително и <strong>не подлежи на 
          възстановяване при отказ от участие</strong>, освен ако изрично не е посочено друго.
        </p>

        <h3>14.3. Правила на турнира</h3>
        <p>Всеки турнир има обявен формат, който може да включва:</p>
        <ul>
          <li>Групи</li>
          <li>Елиминации</li>
          <li>Класиране по точки</li>
        </ul>
        <p>Организаторът си запазва правото да:</p>
        <ul>
          <li>Прави промени в програмата</li>
          <li>Променя формата при необходимост</li>
          <li>Обединява или разделя категории</li>
        </ul>

        <h3>14.4. Поведение и феърплей</h3>
        <div className="gdpr-contact-box">
          <h3>🏆 Кодекс на спортсмена</h3>
          <p>По време на турнири участниците са длъжни да спазват:</p>
          <ul>
            <li>Принципите на спортсменството</li>
            <li>Указанията на организаторите и съдиите</li>
            <li>Правилата за безопасност</li>
          </ul>
          <p><strong>Организаторът има право да дисквалифицира участник при:</strong></p>
          <ul>
            <li>Неспортсменско поведение</li>
            <li>Агресия</li>
            <li>Умишлено нарушаване на правилата</li>
          </ul>
        </div>

        <h3>14.5. Отговорност и здравословно състояние</h3>
        <div className="info-box marketing-consent">
          <h3>⚠️ Важна информация за отговорност при турнири</h3>
          <p>
            <strong>Всеки участник носи лична отговорност за здравословното си състояние и участва 
            на собствен риск.</strong>
          </p>
          <p>Организаторът не носи отговорност за:</p>
          <ul>
            <li>Травми, настъпили по време на турнира</li>
            <li>Здравословни инциденти, възникнали вследствие на физическо натоварване</li>
            <li>Щети на лично имущество</li>
          </ul>
          <p>
            <strong>Препоръчва се:</strong> Консултация с лекар преди участие в състезания, 
            особено при наличие на здравословни проблеми.
          </p>
        </div>

        <h3>14.6. Участие на деца и непълнолетни</h3>
        <p>
          Участието на лица под 18 години е възможно само с <strong>писмено съгласие на родител 
          или законен настойник</strong>.
        </p>
        <p>
          Родителят/настойникът декларира, че детето е клинично здраво и може да участва в 
          спортни състезания.
        </p>

        <h3>14.7. Награди и класиране</h3>
        <p>Наградите (ако са предвидени) се обявяват предварително.</p>
        <p>
          <strong>Решенията на организатора относно класиране и награждаване са окончателни.</strong>
        </p>

        <h3>14.8. Снимки и видеоматериали от турнири</h3>
        <p>По време на турнири могат да се заснемат снимки и видеоматериали за:</p>
        <ul>
          <li>Уебсайта на центъра</li>
          <li>Социални мрежи</li>
          <li>Рекламни материали</li>
        </ul>
        <p>
          С участието си в турнира, пълнолетните участници дават съгласие за използване на 
          такива материали.
        </p>
        <p>
          <strong>За деца се изисква изрично съгласие от родител/настойник.</strong>
        </p>

        <h3>14.9. Отмяна или прекратяване на турнир</h3>
        <p>Организаторът си запазва правото да:</p>
        <ul>
          <li>Отмени турнир при форс-мажорни обстоятелства</li>
          <li>Промени дата или формат</li>
        </ul>
        <p>
          В тези случаи условията за възстановяване на такси (ако има) се обявяват допълнително.
        </p>
      </section>

      <section>
        <p><strong>Дата на последна актуализация:</strong> 03.01.2026</p>
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
          <li>⏰ Bookings are 60 minutes, arrive 5 min before start</li>
          <li>❌ Cancel at least <strong>4 hours in advance</strong>, or you'll be charged the full hour</li>
          <li>👟 Clean sports shoes and sportswear required</li>
          <li>💳 We accept MultiSport, CoolFit cards, cash, and card payments</li>
          <li>🏸 We reserve the right to cancel/reschedule in case of force majeure</li>
          <li>⚖️ Tournaments: you participate at your own risk, fair play required</li>
        </ul>
      </div>

      <section>
        <h2>1. General Provisions</h2>
        <p>
          These Terms and Conditions govern the procedures and conditions for using the sports facilities and services 
          provided by Double Yellow squash club, owned by <strong>Sport And Beyond EOOD</strong>, 
          UIC 208134448, located at NSA "Vasil Levski", Sofia, hereinafter referred to as "the Center".
        </p>
        <p>
          By using the facilities, booking a court, or participating in training sessions and tournaments, each client 
          declares that they are familiar with these rules and accept them unconditionally.
        </p>
      </section>

      <section>
        <h2>2. Access and Reservations</h2>
        <h3>2.1. How to Book</h3>
        <p>Use of the courts is only possible after prior reservation made through:</p>
        <ul>
          <li>🌐 Online via the website</li>
          <li>🏢 On-site</li>
          <li>📞 By phone: <a href="tel:+359896754014" onClick={() => {
            if (typeof window !== 'undefined' && (window as any).gtag_report_conversion) {
              return (window as any).gtag_report_conversion('tel:+359896754014');
            }
          }}>+359 896 754 014</a></li>
        </ul>

        <h3>2.2. Duration</h3>
        <p>One booked hour is <strong>60 minutes</strong> in duration, unless otherwise agreed.</p>

        <h3>2.3. Arrival</h3>
        <p>Clients must arrive <strong>at least 5 minutes before</strong> the start of their session.</p>
        <p>⚠️ <strong>Important:</strong> Late arrival does not extend the usage time.</p>
      </section>

      <section>
        <h2>3. Cancellations and No-Shows</h2>
        <div className="info-box marketing-consent">
          <h3>⏰ Cancellation Policy</h3>
          <p>
            <strong>Cancellations must be made at least 4 hours in advance.</strong>
          </p>
          <p>In case of no-show or late cancellation (less than 4 hours before start), the Center reserves the right to:</p>
          <ul>
            <li>Charge the full price of the session</li>
            <li>Deduct the visit from a card/membership</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>4. Fees and Payments</h2>
        <h3>4.1. Pricing</h3>
        <p>All prices are displayed on the website and on-site.</p>

        <h3>4.2. Payment Methods</h3>
        <div className="info-box">
          <h3>💳 We Accept:</h3>
          <ul>
            <li>💵 Cash</li>
            <li>💳 Bank card (POS terminal)</li>
            <li>🏃 MultiSport cards</li>
            <li>❄️ CoolFit cards</li>
            <li>🎫 Other partner sports cards (when available)</li>
          </ul>
        </div>

        <h3>4.3. Refunds</h3>
        <p>
          Purchased cards, packages, and memberships are <strong>non-refundable</strong>, 
          except in cases provided by law.
        </p>
      </section>

      <section>
        <h2>5. Court Usage Rules</h2>
        <h3>5.1. Dress Code and Equipment</h3>
        <p>Only the following are permitted on courts:</p>
        <ul>
          <li>👕 Sportswear</li>
          <li>👟 Clean sports shoes suitable for squash (non-marking soles)</li>
        </ul>

        <h3>5.2. Prohibited:</h3>
        <ul>
          <li>🚭 Smoking</li>
          <li>🚫 Use of narcotic substances</li>
          <li>😡 Aggressive or unsportsmanlike behavior</li>
          <li>🔨 Damage to equipment and surfaces</li>
        </ul>

        <h3>5.3. Liability for Damage</h3>
        <p>
          Clients bear <strong>financial responsibility</strong> for damages caused intentionally or 
          through gross negligence.
        </p>
      </section>

      <section>
        <h2>6. Safety and Health</h2>
        <div className="gdpr-contact-box">
          <h3>⚠️ Important Safety Information</h3>
          <p>
            Each client bears <strong>personal responsibility</strong> for their health condition and 
            physical fitness.
          </p>
          <p>The Center is not responsible for:</p>
          <ul>
            <li>Incidents occurring due to non-compliance with rules</li>
            <li>Health problems arising during play</li>
            <li>Injuries resulting from physical exertion</li>
          </ul>
          <p>
            <strong>Recommended:</strong> Warm-up before play and use of protective equipment 
            (squash goggles, wristbands, etc.).
          </p>
        </div>
      </section>

      <section>
        <h2>7. Training and Junior School</h2>
        <h3>7.1. Registration</h3>
        <p>Participation in training sessions and junior school requires prior registration.</p>

        <h3>7.2. For Children Under 18</h3>
        <p>For children under 18, <strong>parental or legal guardian consent is required</strong>.</p>
        <p>
          Parents declare that the child is clinically healthy and can participate in sports activities.
        </p>

        <h3>7.3. Registration of Minors</h3>
        <p>
          If the participant is a minor, upon completing registration, they declare awareness of the Terms 
          and Conditions and consent of their parents or guardians to accept these Terms and complete registration.
        </p>
        <p>
          If the client/participant is a minor child, the declaration of acceptance of these Terms and 
          completion of registration is made by a parent or guardian.
        </p>
      </section>

      <section>
        <h2>8. Personal Belongings</h2>
        <p>
          ⚠️ The Center is <strong>not responsible</strong> for lost, stolen, or damaged personal belongings.
        </p>
        <p>Use of lockers (if available) is recommended.</p>
      </section>

      <section>
        <h2>9. Photos, Videos, and Marketing</h2>
        <h3>9.1. Marketing Materials</h3>
        <p>
          Photos and videos may be taken at the Center for marketing and informational purposes.
        </p>

        <h3>9.2. Consent for Children</h3>
        <p>For children, <strong>explicit parental/guardian consent is required</strong>.</p>

        <h3>9.3. Marketing Communications</h3>
        <div className="info-box marketing-consent">
          <h3>📧 Important: Separate Marketing Consent</h3>
          <p>
            Marketing communications are <strong>completely separate</strong> from accepting these 
            Terms and Conditions.
          </p>
          <p>
            When registering, you have the option to choose whether you want to receive:
          </p>
          <ul>
            <li>Monthly newsletters</li>
            <li>Promotional messages</li>
            <li>Information about new services and events</li>
          </ul>
          <p>
            You can opt out of marketing communications at any time by sending an email to 
            <a href="mailto:jakub@doubleyellowsquash.com"> jakub@doubleyellowsquash.com</a>
          </p>
          <p>
            <strong>Opting out of marketing communications does not affect your access to Center services.</strong>
          </p>
        </div>
      </section>

      <section>
        <h2>10. Access Denial</h2>
        <p>The Center reserves the right to deny access or terminate court use in case of:</p>
        <ul>
          <li>Systematic non-compliance with rules</li>
          <li>Aggressive behavior</li>
          <li>Threatening the safety of others</li>
        </ul>
      </section>

      <section>
        <h2>11. Force Majeure</h2>
        <div className="info-box">
          <h3>⚡ Force Majeure</h3>
          <p>
            In the event of force majeure circumstances, the Center reserves the right to 
            cancel or reschedule bookings without liability for damages.
          </p>
          <p>Force majeure circumstances include, but are not limited to:</p>
          <ul>
            <li>⚡ Power outage</li>
            <li>💧 Flooding or water supply failures</li>
            <li>🏗️ Emergency repairs to facilities</li>
            <li>🌪️ Natural disasters</li>
            <li>🚨 Orders from competent authorities</li>
            <li>🔥 Fire or other emergencies</li>
          </ul>
          <p>
            In such cases, the Center will contact clients to reschedule or refund fees 
            (if applicable).
          </p>
        </div>
      </section>

      <section>
        <h2>12. Changes to Rules</h2>
        <p>
          The Center reserves the right to change these Terms and Conditions, with the current version 
          published on the website.
        </p>
      </section>

      <section>
        <h2>13. Applicable Law</h2>
        <p>For all matters not covered, <strong>Bulgarian legislation</strong> applies.</p>
      </section>

      <section>
        <h2>14. Tournaments and Competitions</h2>
        
        <h3>14.1. General Participation Conditions</h3>
        <p>
          Participation in tournaments and competitions organized by Sport And Beyond EOOD is voluntary and 
          requires prior registration.
        </p>
        <p>By registering, participants declare that they:</p>
        <ul>
          <li>Are familiar with these Terms and Conditions</li>
          <li>Meet the participation requirements</li>
          <li>Are in good health</li>
        </ul>

        <h3>14.2. Registration and Fees</h3>
        <p>Tournament registration can be done:</p>
        <ul>
          <li>Online</li>
          <li>On-site</li>
          <li>Through other methods announced by the organizer</li>
        </ul>
        <p>
          The entry fee (if any) is announced in advance and is <strong>non-refundable upon withdrawal</strong>, 
          unless explicitly stated otherwise.
        </p>

        <h3>14.3. Tournament Rules</h3>
        <p>Each tournament has an announced format, which may include:</p>
        <ul>
          <li>Groups</li>
          <li>Eliminations</li>
          <li>Point-based ranking</li>
        </ul>
        <p>The organizer reserves the right to:</p>
        <ul>
          <li>Make changes to the schedule</li>
          <li>Change the format if necessary</li>
          <li>Merge or split categories</li>
        </ul>

        <h3>14.4. Behavior and Fair Play</h3>
        <div className="gdpr-contact-box">
          <h3>🏆 Athlete Code of Conduct</h3>
          <p>During tournaments, participants must observe:</p>
          <ul>
            <li>Principles of sportsmanship</li>
            <li>Instructions from organizers and referees</li>
            <li>Safety rules</li>
          </ul>
          <p><strong>The organizer has the right to disqualify a participant for:</strong></p>
          <ul>
            <li>Unsportsmanlike behavior</li>
            <li>Aggression</li>
            <li>Intentional rule violations</li>
          </ul>
        </div>

        <h3>14.5. Liability and Health</h3>
        <div className="info-box marketing-consent">
          <h3>⚠️ Important Tournament Liability Information</h3>
          <p>
            <strong>Each participant bears personal responsibility for their health and participates 
            at their own risk.</strong>
          </p>
          <p>The organizer is not responsible for:</p>
          <ul>
            <li>Injuries occurring during the tournament</li>
            <li>Health incidents arising from physical exertion</li>
            <li>Damage to personal property</li>
          </ul>
          <p>
            <strong>Recommended:</strong> Consult a doctor before participating in competitions, 
            especially if you have health concerns.
          </p>
        </div>

        <h3>14.6. Participation of Children and Minors</h3>
        <p>
          Participation of persons under 18 is only possible with <strong>written consent from a parent 
          or legal guardian</strong>.
        </p>
        <p>
          The parent/guardian declares that the child is clinically healthy and can participate in 
          sports competitions.
        </p>

        <h3>14.7. Prizes and Ranking</h3>
        <p>Prizes (if any) are announced in advance.</p>
        <p>
          <strong>The organizer's decisions regarding ranking and awards are final.</strong>
        </p>

        <h3>14.8. Tournament Photos and Videos</h3>
        <p>Photos and videos may be taken during tournaments for:</p>
        <ul>
          <li>Center website</li>
          <li>Social media</li>
          <li>Promotional materials</li>
        </ul>
        <p>
          By participating in the tournament, adult participants consent to the use of 
          such materials.
        </p>
        <p>
          <strong>For children, explicit parental/guardian consent is required.</strong>
        </p>

        <h3>14.9. Tournament Cancellation or Termination</h3>
        <p>The organizer reserves the right to:</p>
        <ul>
          <li>Cancel a tournament in case of force majeure</li>
          <li>Change date or format</li>
        </ul>
        <p>
          In these cases, conditions for fee refunds (if any) are announced separately.
        </p>
      </section>

      <section>
        <p><strong>Last updated:</strong> January 3, 2026</p>
      </section>
    </div>
  );
}
