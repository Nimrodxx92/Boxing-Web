const TablaHorarios = () => {
  return (
    <div className="tabla-container">
      <table className="tabla-horarios">
        <thead>
          <tr>
            <th>Horario</th>
            <th>Martes</th>
            <th>Jueves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="title-horario">20:30 PM</td>
            <td>Cardio</td>
            <td>Cardio</td>
          </tr>
          <tr>
            <td className="title-horario">21:00 PM</td>
            <td>Entrenamientos de fuerza</td>
            <td>Entrenamientos de resistencia</td>
          </tr>
          <tr>
            <td className="title-horario">21:20 PM</td>
            <td>Sparring</td>
            <td>Sparring</td>
          </tr>
          <tr>
            <td className="title-horario">21:45 PM</td>
            <td>Entrenamiento mental</td>
            <td>Entrenamientos de agilidad</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TablaHorarios;
