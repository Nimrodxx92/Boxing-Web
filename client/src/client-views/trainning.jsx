import TitleComponent from "../components/TitleComponent";
import TablaHorarios from "../components/TablaHorarios";
import data from "../json/trainning.json";

const Trainning = () => {
  return (
    <>
      <TitleComponent
        title={data.training.title}
        description={data.training.description}
      />
      <main className="trainning__container">
        <div className="trainning-grid">
          {data.training.trainingTypes.map((trainingType, index) => (
            <div key={index} className="trainning-item">
              <img src={trainingType.imgTrainning} alt="" />
              <div className="data-trainning">
                <h3>{trainingType.type}</h3>
                <p>{trainingType.description}</p>
                <p>{trainingType.focus}</p>
              </div>
            </div>
          ))}
        </div>
        <section className="container__tabla">
          <h2>Horarios</h2>
          <div className="linea-div"></div>
          <TablaHorarios />
        </section>
      </main>
    </>
  );
};

export default Trainning;
