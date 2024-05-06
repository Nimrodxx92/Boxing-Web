import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ApiCard = () => {
  const allPayments = useSelector((state) => state.payments.allPayments);
  console.log("Pagos => ", allPayments);

  // Crear un nuevo array con el orden modificado
  const modifiedOrder = [...allPayments];
  if (modifiedOrder.length >= 3) {
    const lastItem = modifiedOrder.pop(); // Eliminar la última tarjeta
    modifiedOrder.splice(1, 0, lastItem); // Insertar la última tarjeta en la posición 1
  }

  return (
    <div>
      <div className="cards__items">
        {modifiedOrder.map((item, index) => (
          <div
            key={item.id}
            className={`cards ${index === 1 ? "second-card" : ""}`}
          >
            <div>
              <p className="cards-firts">1° clase gratis</p>
              <h2>Pack {item.name}</h2>
              <p className="price">${item.price}</p>
              {item.description.split(".").map((point, index) => (
                <p className="entrenamiento" key={index}>
                  {point}
                </p>
              ))}
            </div>
            <Link to={`/Detalle/${item.id}`}>
              <button>Ver Detalle</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApiCard;
