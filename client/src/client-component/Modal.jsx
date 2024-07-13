import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal__init">
      <div className="modal">
        <button className="btn-close" onClick={onClose}>
          Cerrar
        </button>
        <h1 style={{ color: "white" }}>dsfjdsfdsfdsvdsfdsffsdf</h1>
        <div className="modal__content">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;