import React from "react";
import PropTypes from "prop-types";
import "../styles/GenericPopup.css";

const GenericPopup = ({ open, onClose, title, children, showCloseButton = true, onConfirm, onCancel, showConfirmCancelButtons }) => {
  if (!open) return null;

  return (
    <div className="popup-container">
      {/* כפתור סגירה בפינה השמאלית העליונה */}
      {showCloseButton && (
        <button className="popup-close-button" onClick={onClose}>❌</button>
      )}

      {/* כותרת הפופ-אפ */}
      {title && <h2>{title}</h2>}

      {/* תוכן הפופ-אפ */}
      <div>{children}</div>

      {/* כפתורי אישור וביטול */}
      {showConfirmCancelButtons && (
        <div className="popup-buttons">
          {onConfirm && (
            <button className="popup-button confirm" onClick={onConfirm}>אישור</button>
          )}
          {onCancel && (
            <button className="popup-button cancel" onClick={onCancel}>ביטול</button>
          )}
        </div>
      )}
    </div>
  );
};

// PropTypes
GenericPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  showConfirmCancelButtons: PropTypes.bool,
};

// ברירת מחדל לערכים אופציונליים
GenericPopup.defaultProps = {
  showCloseButton: true,
  showConfirmCancelButtons: true, // ברירת מחדל היא להראות את הכפתורים
};

export default GenericPopup;
