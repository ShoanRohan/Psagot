import React, { useState, useEffect } from 'react';
import '../styles/RoomForm.css';

const equipmentOptions = ['מקרן', 'טלפון חכם', 'מערכת סטריאו', 'מחשב נייד', 'לוח מחיק'];

const RoomForm = ({ open, onClose, onSave, initialData = {} }) => {
  const [roomName, setRoomName] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [capacity, setCapacity] = useState('');
  const [equipment, setEquipment] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setRoomName(initialData?.name || '');
      setRoomNumber(initialData?.number || '');
      setCapacity(initialData?.capacity || '');
      setEquipment(initialData?.equipment || '');
      setErrors({});
    }
  }, [initialData, open]);

  const validate = () => {
    const newErrors = {};

    if (!roomName.trim()) {
      newErrors.name = 'שדה חובה';
    } else if (roomName.length > 50) {
      newErrors.name = 'השם ארוך מדי (מקסימום 50 תווים)';
    }

    if (!roomNumber.trim()) {
      newErrors.number = 'שדה חובה';
    } else if (!/^\d+$/.test(roomNumber)) {
      newErrors.number = 'מספר חדר חייב להכיל ספרות בלבד';
    }

    if (!capacity) {
      newErrors.capacity = 'שדה חובה';
    } else if (isNaN(capacity) || Number(capacity) <= 0) {
      newErrors.capacity = 'יש להזין מספר חיובי';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const dataToSend = {
      name: roomName,
      number: roomNumber,
      capacity,
      equipment
    };

    if (typeof onSave === 'function') {
      onSave(dataToSend);
    }
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-container" dir="rtl">
      <div className="modal-header">
        <h2>עריכת חדר</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="modal-content">
        <div className="row">
          <div className="custom-input">
            <label>שם חדר</label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="custom-input">
            <label>מספר חדר</label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
            />
            {errors.number && <div className="error-message">{errors.number}</div>}
          </div>

          <div className="custom-input">
            <label>מספר מקומות</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            />
            {errors.capacity && <div className="error-message">{errors.capacity}</div>}
          </div>
        </div>

        <div className="custom-input">
          <label>ציוד</label>
          <select value={equipment} onChange={(e) => setEquipment(e.target.value)}>
            <option value="">בחר</option>
            {equipmentOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="modal-actions">
        <button className="modal-button cancel" onClick={onClose}>ביטול</button>
        <button className="modal-button save" onClick={handleSubmit}>שמור</button>
      </div>
    </div>
  );
};

export default RoomForm;




















