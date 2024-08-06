import aboutImg from "../assets/0000.jpg";
import boxerAbout from "../assets/boxer-about.jpg";
import imgAbout2 from "../assets/brutal-boxeador-musculoso-guantes-boxeo-trabajando-tecnica-perforacion.jpg";
import TitleComponent from "../components/TitleComponent";
import data from "../json/about.json";

const About = () => {
  const skills = data.about.clubInfo.skills;
  return (
    <>
      <TitleComponent
        title={data.about.title}
        description={data.about.description}
      />
      <main className="about__container">
        <section className="firts__about">
          <img src={aboutImg} alt="img" />
          <div className="data-firts-seccion">
            <h2>{data.about.clubInfo.title}</h2>
            <p>{data.about.clubInfo.description}</p>
            <div className="skills-entrenamiento">
              {skills.map((skill, index) => (
                <div className="countainer-skills" key={index}>
                  <h3>{skill.name}</h3>
                  <p>{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="subabout__container">
          <div className="sub-img-about">
            <div className="text-about">
              <p>{data.about.mision}</p>
              <p>{data.about.vision}</p>
            </div>
            <img src={boxerAbout} alt="" />
          </div>
        </section>
        <section className="data__profesor">
          <img src={imgAbout2} alt="" />
          <div className="info-profesor">
            <h3>Diego Noriega</h3>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
