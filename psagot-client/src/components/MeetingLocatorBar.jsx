import { useState } from "react";

const MeetingLocatorBar = () => {
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div>
      <label>בחר תאריך:</label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <p>התאריך שנבחר: {selectedDate}</p>
    </div>
  );
};

export default MeetingLocatorBar 