export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO YYYY-MM-DD
  readingMinutes: number;
  tags: string[];
  content: string; // HTML string
};

export const articles: Article[] = [
  {
    slug: "how-to-hold-a-squash-racket",
    title: "How to Hold a Squash Racket (Without Looking Like You're Strangling It)",
    excerpt:
      "The grip is the single most important thing a beginner gets wrong — and the easiest to fix in five minutes. Your knuckles will thank you.",
    date: "2026-04-28",
    readingMinutes: 4,
    tags: ["beginners", "technique", "grip"],
    content: `
<p>You picked up a squash racket. You squeezed it like a debt collector squeezes a promise. That is wrong. Let us fix it.</p>

<h2>The V-grip — your new best friend</h2>
<p>Hold the racket out in front of you by the throat (the thin bit above the grip). Now shake hands with the handle like you are meeting it for the first time — firm, polite, not panicked. Look at your thumb and index finger: they form a <strong>V shape</strong> that should sit slightly left of centre on the top bevel. That is the forehand grip.</p>

<h2>How tight is tight enough?</h2>
<p>On a scale of 1–10, you want a 4. Not a 1 (racket flies into the wall), not a 10 (your wrist seizes up after three shots). A common test: if someone can pull the racket out of your hand without a fight, tighten up slightly. If your forearm is already burning before the rally starts, loosen up.</p>

<h2>The "death grip" problem</h2>
<p>Most beginners squeeze harder as they get nervous. The racket vibrates, the arm tenses, the elbow protests. The fix is counterintuitive: <strong>relax the grip just before impact</strong>, then let the natural swing do the work. The racket has a head for a reason. Let it swing.</p>

<h2>Backhand: a small rotation</h2>
<p>For backhand shots, rotate the racket slightly clockwise (for right-handers) so the V shifts a little more to the top of the handle. Do not re-grip mid-rally — not yet. That is an advanced trick. For now: one grip, two hands on heart, eyes open.</p>

<h2>The two-finger knuckle test</h2>
<p>Wrap your hand around the grip. Slide two fingers between your palm and the grip — they should just fit. Too tight? Bigger grip size. Too loose? Smaller or add an overgrip. Most club rentals come in a standard size that fits most people, so do not worry too much about this on day one.</p>

<h2>Quick recap</h2>
<ul>
  <li>Shake-hands grip, not stranglehold.</li>
  <li>V shape on top-left bevel (right-handers).</li>
  <li>Tension: 4/10.</li>
  <li>Relax just before you hit.</li>
</ul>
<p>Practice in front of a mirror for 60 seconds before your next session. Seriously. Your wrist, elbow, and the wall behind your opponent will all benefit.</p>
`,
  },
  {
    slug: "squash-ball-dots-explained",
    title: "What Do the Dots on a Squash Ball Actually Mean? (It Is Not Decoration)",
    excerpt:
      "Yellow dot, red dot, blue dot — why does squash ball colour-coding exist and which one should you be using? Spoiler: the pro ball will destroy your fun.",
    date: "2026-05-05",
    readingMinutes: 3,
    tags: ["beginners", "equipment", "balls"],
    content: `
<p>You opened a tin of squash balls. There are two small rubber spheres with coloured dots. You assumed the dots were aesthetic. They are not. They are a temperature and bounce rating system, and picking the wrong one is the fastest way to hate squash.</p>

<h2>The dot system</h2>
<p>The dots indicate how much the ball bounces relative to its temperature. Cold rubber barely bounces. Warm rubber bounces more. The dots tell you how warm the ball needs to get before it behaves correctly:</p>
<ul>
  <li><strong>Double yellow dot</strong> — Pro ball. Very low bounce. Needs extensive warming up and lots of pace. This is what you see in professional matches. This is <em>not</em> for beginners.</li>
  <li><strong>Single yellow dot</strong> — Club/amateur standard. Slightly more bounce than double yellow. Still needs warming up. Good for intermediate players.</li>
  <li><strong>Red dot</strong> — Beginner/recreational. Higher bounce, stays lively even when cool. This is what you want if you have played fewer than ~20 sessions.</li>
  <li><strong>Blue dot</strong> — Starter/junior. The bounciest of all. Used for children and absolute beginners. Stays playable without any warm-up.</li>
</ul>

<h2>Why does warming up the ball matter?</h2>
<p>Squash balls are hollow rubber. Cold rubber is stiff and absorbs impact energy rather than returning it. As you play, friction and repeated impact heat the ball up, and it becomes livelier. A professional double-yellow dot ball at room temperature bounces about 12% of the height it is dropped from. After a proper warm-up, that rises to around 30%. Without warm-up: dead on arrival.</p>

<h2>What should you use as a beginner?</h2>
<p><strong>Red dot.</strong> Full stop. Using a double-yellow dot as a beginner is like trying to learn to drive in a Formula 1 car — technically possible, emotionally scarring. The red dot gives you enough bounce to develop your swing without spending the whole session sprinting to the back corner to retrieve a ball that barely moved.</p>

<h2>When to move up</h2>
<p>Switch to a single-yellow when rallies regularly last more than 8–10 shots and you feel the red is getting too bouncy and unpredictable. Most players are ready after 2–3 months of regular play. There is no prize for using the hard ball early.</p>

<h2>The name, by the way</h2>
<p>Our club is called Double Yellow. Yes, after the ball. The most demanding, the most rewarding, the one that requires the most effort to make work — much like squash itself.</p>
`,
  },
  {
    slug: "squash-swing-biomechanics-beginners",
    title: "Swing Biomechanics for Beginners (Without the Biomechanics Degree)",
    excerpt:
      "A good squash swing is not about strength. It is about sequence. Learn the kinetic chain in plain language — and stop hurting your elbow.",
    date: "2026-05-12",
    readingMinutes: 5,
    tags: ["beginners", "technique", "swing"],
    content: `
<p>Every beginner hits with their arm. Every good player hits with their whole body. The difference is the kinetic chain — and once you feel it once, you cannot unfeel it.</p>

<h2>What is a kinetic chain?</h2>
<p>Energy travels through your body like a whip: legs → hips → shoulder → elbow → wrist → racket head. Each segment adds velocity to the next. Skip a link (say, hit with only your arm) and you lose most of your power and put enormous strain on your elbow. Hello, squash elbow.</p>

<h2>The four phases of a squash swing</h2>

<h3>1. Preparation (backswing)</h3>
<p>Turn your shoulders to face the side wall. Raise the racket so the head is above your wrist — not beside it. Think of the letter <strong>L</strong>: upper arm roughly parallel to the floor, forearm pointing up. This is your loaded position. If your racket is still dangling by your hip when the ball arrives, it is already too late.</p>

<h3>2. Step and coil</h3>
<p>Step toward the ball with your front foot, pointing it roughly at the side wall. Your hips and shoulders are still turned. Feel the coil — like a spring under tension. Do not uncoil yet.</p>

<h3>3. Impact</h3>
<p>Hips rotate first, then the shoulder pulls the arm through, then the forearm and wrist snap through contact. The contact point for a forehand drive should be level with your front foot, arm roughly extended but not fully locked. Hit through the ball, not at it — the follow-through matters.</p>

<h3>4. Follow-through</h3>
<p>Let the racket continue across your body. A proper follow-through is not a stylistic flourish — it proves you did not decelerate before contact. Stopping the swing early is the single biggest power leak in beginner squash.</p>

<h2>Common mistakes</h2>
<ul>
  <li><strong>Hitting with only the arm</strong> — your shoulder will thank you later for not doing this.</li>
  <li><strong>Swinging too early</strong> — you rush because you are nervous. Trust your footwork to get you there.</li>
  <li><strong>Ball too close to the body</strong> — you end up cramped and can only push, not swing. Give yourself room.</li>
  <li><strong>Watching the ball all the way to the racket</strong> — great in theory, distracting in practice. Watch the ball, yes, but keep peripheral awareness of where you are on court.</li>
</ul>

<h2>A drill to feel the chain</h2>
<p>Stand still, no ball. Make a slow-motion forehand swing, deliberately starting from the hips. Feel the shoulder follow, the elbow trail, the wrist snap last. Do this 20 times slowly. Then do it fast. You will feel extra power immediately — without hitting harder.</p>

<p>Squash is a sport of sequence, not strength. Beginners who understand this improve five times faster than those who just try to hit the ball harder.</p>
`,
  },
  {
    slug: "squash-court-positions-beginners",
    title: "Where Should You Stand on a Squash Court? (Not Glued to the Back Wall)",
    excerpt:
      "New players hug the back wall like it owes them money. Here is where to actually stand, why the T is valuable, and how court position wins you points without hitting harder.",
    date: "2026-05-19",
    readingMinutes: 4,
    tags: ["beginners", "tactics", "court-position"],
    content: `
<p>If you watch two beginners play squash, they spend most of the match in the back corners, lunging desperately at the ball and hoping for the best. If you watch two club players, one of them spends most of the time near the middle of the court looking almost relaxed. That middle position has a name: <strong>the T</strong>.</p>

<h2>What is the T?</h2>
<p>The T is the intersection of the red lines in the middle of the court — where the short line meets the half-court line. It is the most central position you can occupy. From the T, you are equidistant from all four corners. Every ball hit by your opponent requires you to travel the minimum possible distance to reach it.</p>

<h2>Why do beginners avoid it?</h2>
<p>Because the ball keeps going to the back corners and instinct says "follow the ball". After you hit, you chase the ball, you stay there, your opponent hits it somewhere else, you sprint again, you are exhausted by rally three. The T is the answer. Hit the ball. Walk back to the T. Wait. Hit. T. Repeat.</p>

<h2>The principle: hit and recover</h2>
<p>Every shot has two parts: the hit and the recovery. Beginners focus entirely on the hit. Good players focus equally on the recovery. After every shot — every single one — your goal is to return to the T before your opponent's racket hits the ball.</p>

<h2>Practical starting positions</h2>
<ul>
  <li><strong>Serving</strong>: Stand in the service box, hit, then move immediately to the T.</li>
  <li><strong>Receiving</strong>: Stand roughly one metre behind the short line, slightly to the side of the expected serve.</li>
  <li><strong>During the rally</strong>: Always the T, always facing the front wall, always watching your opponent's racket over your shoulder.</li>
</ul>

<h2>How court position wins points</h2>
<p>When you control the T, your opponent has to play around you. They must hit the ball past you, to the corners, under pressure. They make errors. You win points not by hitting winners but by being in the right place and making your opponent hit more shots than you.</p>

<h2>One rule to start with</h2>
<p>This week, after every shot you play, say to yourself: "T." Then move there. You do not need to master anything else yet. This single habit will make you a noticeably better player within three sessions.</p>
`,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRecentArticles(count = 3): Article[] {
  return [...articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, count);
}
