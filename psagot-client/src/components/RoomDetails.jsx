import React, { useState } from 'react';
import './RoomDetails.css'; // קובץ CSS להוספת עיצוב

const RoomDetails = () => {
    const [roomName, setRoomName] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [placesNumber, setPlacesNumber] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState([]);

    const equipmentList = [
        { id: 1, name: 'מקרן' },
        { id: 2, name: 'מזגן' },
        { id: 3, name: 'מחשב' },
        { id: 4, name: 'לוח' },
    ];

    const handleCheckboxChange = (event, equipmentId) => {
        if (event.target.checked) {
            setSelectedEquipment([...selectedEquipment, equipmentId]);
        } else {
            setSelectedEquipment(selectedEquipment.filter(id => id !== equipmentId));
        }
    };

    return (
        <div className="room-details-container">
            {/* סרגל */}
            <div className="room-bar"></div>

            {/* שדות הקלדה */}
            <div className="input-group">
                <label>שם חדר:</label>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
            </div>

            <div id="RoomNumber" className="input-group">
                <label>מספר חדר:</label>
                <input
                    type="number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>מספר מקומות:</label>
                <input
                    type="number"
                    value={placesNumber}
                    onChange={(e) => setPlacesNumber(e.target.value)}
                />
            </div>

            {/* סלקט עם צ'קבוקסים */}
            <div className="equipment-group">
                <label>אביזרי ציוד:</label>
                {equipmentList.map((equipment) => (
                    <div key={equipment.id} className="equipment-item">
                        <input
                            type="checkbox"
                            id={equipment - equipment.id}
                          onChange={(e) => handleCheckboxChange(e, equipment.id)}
                        />
                        <label htmlFor={`equipment-${equipment.id}`}>{equipment.name}</label>
                    </div>
                ))}
            
            </div>
            </div>)
};

            export default RoomDetails;