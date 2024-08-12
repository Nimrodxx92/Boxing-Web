import TitleComponent from "../components/TitleComponent";
import data from "../json/titles.json";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
  };

  return (
    <>
      <main className="contact__container">
        <TitleComponent
          title={data.contact.title}
          description={data.contact.description}
        />
        <section className="contact__inputs">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="apellido">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={form.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row message-row">
              <div className="form-group message-group">
                <label htmlFor="mensaje">Mensaje:</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Enviar</button>
          </form>
        </section>
        <section className="contact__datos">
          <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-58.67190599441529%2C-34.69155653702154%2C-58.65546941757203%2C-34.68121703637927&amp;layer=mapnik&amp;marker=-34.686386948115334%2C-58.66368770599365"></iframe>
          <div className="container-datos">
            <div>
              <h3>Ubicación</h3>
              <p>Arturo Guastavino 3750 Castelar Sur, Bs As CP: 1712</p>
            </div>
            <div>
              <h3>Email</h3>
              <p>diegonoriega@gmail.com</p>
            </div>
            <div>
              <h3>Teléfono</h3>
              <p>11-6488-4537</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
