import team from '../data/team.json';

export default function TeamSection() {
  return (
    <section className="section team-section">
      <div className="section-inner">
        <h2>Notre équipe</h2>
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="team-card">
              <img
                src={member.photo}
                alt={`Photo de ${member.name}`}
                className="team-photo"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
