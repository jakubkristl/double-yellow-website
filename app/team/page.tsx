export const dynamic = "force-static";

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
      "Former karate medal collector turned squash evangelist. Can string a racket faster than you can say “let.” Probably reorganizing the club while you read this.",
  },
  {
    name: "Margarita Velikova",
    role: "Operations / First Impressions",
    photo: "/team/margarita.jpg",
    bio:
      "Makes spreadsheets play nice and newcomers feel at home. Brings snacks; bans double bounces. Smiles even when the ball kisses the tin.",
  },
  {
    name: "Vasil Stoimenov",
    role: "Coach / Co-founder",
    photo: "/team/vasil-stoimenov.jpg",
    bio:
      "Favorite drill: “one more.” Believes any ball is retrievable with correct footwork and mild stubbornness. 10/10 would ghost again.",
  },
];

export default function TeamPage() {
  return (
    <section className="container">
      <h1 className="page-title">Team</h1>

      <ul className="team-list team-centered">
        {TEAM.map((m) => (
          <li key={m.name} className="team-row card">
            <div className="cell avatar">
              <img
                src={m.photo}
                alt={m.name}
                className="team-photo"
                loading="lazy"
              />
            </div>

            <div className="cell info">
              <div className="team-name">{m.name}</div>
              {m.role && <div className="team-role">{m.role}</div>}
              <p className="team-bio">{m.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
