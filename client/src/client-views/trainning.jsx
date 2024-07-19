import TitleComponent from "../components/TitleComponent";
import data from "../json/titles.json";

const Trainning = () => {
  return (
    <>
      <TitleComponent
        title={data.training.title}
        description={data.training.description}
      />
      <section className="trainning__container">
        <div className="training-grid">
          {data.training.trainingTypes.map((trainingType, index) => (
            <div key={index} className="training-item">
              <img src={trainingType.imgTrainning} alt="" />
              <h3>{trainingType.type}</h3>
              <div>
                <p>{trainingType.description}</p>
                <p>{trainingType.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Trainning;
