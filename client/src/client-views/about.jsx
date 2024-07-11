import aboutImg from "../assets/0000.jpg";
import boxerAbout from "../assets/boxer-about.jpg";
import TitleComponent from "../components/TitleComponent";
import data from "../json/titles.json";

const About = () => {
  const skills = data.about.clubInfo.skills;
  return (
    <>
      <TitleComponent
        title={data.about.title}
        description={data.about.description}
      />
      <section className="about__container">
        <div className="firts__about">
          <img src={aboutImg} alt="img" />
          <div className="title-firts-about">
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
        </div>
      </section>
      <section className="subabout_container">
        <div className="sub-img-about">
          <img src={boxerAbout} alt="" />
          <h3>{data.about.mision}</h3>
          <h3>{data.about.vision}</h3>
        </div>
      </section>
    </>
  );
};

export default About;
