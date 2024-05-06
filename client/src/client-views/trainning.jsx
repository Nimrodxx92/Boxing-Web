import TitleComponent from "../components/TitleComponent";
import data from "../json/titles.json";

const Trainning = () => {
  return (
    <>
      <section className="">
        <TitleComponent
          title={data.training.title}
          description={data.training.description}
        />
      </section>
    </>
  );
};

export default Trainning;
