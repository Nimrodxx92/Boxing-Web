import TitleComponent from "../components/TitleComponent";
import data from "../json/titles.json";

const Contact = () => {
  return (
    <>
      <section className="">
        <TitleComponent
          title={data.contact.title}
          description={data.contact.description}
        />
      </section>
    </>
  );
};

export default Contact;
