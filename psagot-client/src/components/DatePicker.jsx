import { useState } from "react";
import format from "date-fns/format";

export default function DatePicker() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(format(today, "yyyy-MM-dd"));

  return (
    <div className="flex flex-col items-center p-4">
      <label htmlFor="date-picker" className="mb-2 text-lg font-semibold">
        בחר תאריך:
      </label>
      <input
        id="date-picker"
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="border rounded-lg p-2 shadow-md"
      />
    </div>
  );
}



 







