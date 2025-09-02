
import React from 'react';

const Mifgash  = () => {
  const menuItems = [
    { icon: "🏠", label: "בית" },
    { icon: "📋", label: "משימות" },
    { icon: "📊", label: "דוחות" },
    { icon: "⚙️", label: "הגדרות" },
    { icon: "👤", label: "משתמש" },
  ];

  const tasks = [
    { status: "בוצע", timeStart: "13:00", timeEnd: "12:20", date: "12/10/24", category: "עבודה", language: "JAVA", priority: "04" },
    { status: "בוצע", timeStart: "12:30", timeEnd: "10:50", date: "08/10/24", category: "לימודים", language: "CSS", priority: "05" },
    { status: "בוצע", timeStart: "14:30", timeEnd: "13:50", date: "20/10/24", category: "פרויקט", language: "Python", priority: "08" },
    { status: "בוצע", timeStart: "11:30", timeEnd: "10:00", date: "29/10/24", category: "עבודה", language: "JavaScript", priority: "09" },
    { status: "בוצע", timeStart: "15:00", timeEnd: "14:20", date: "14/11/24", category: "לימודים", language: "React", priority: "10" },
    { status: "ממתין", timeStart: "16:00", timeEnd: "15:30", date: "22/11/24", category: "פרויקט", language: "אחר", priority: "11" },
    { status: "בוצע", timeStart: "17:00", timeEnd: "16:20", date: "30/11/24", category: "עבודה", language: "Angular", priority: "12" },
    { status: "בוצע", timeStart: "18:00", timeEnd: "17:30", date: "04/12/24", category: "לימודים", language: "Vue.js", priority: "13" },
  ];

  return (
    <div className="flex h-screen bg-gray-100" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-blue-900 text-white flex flex-col items-center py-4">
        <div className="text-2xl font-bold mb-8">משימות</div>
        {menuItems.map((item, index) => (
          <div key={index} className="flex items-center w-full px-4 py-2 hover:bg-blue-700">
            <span className="text-xl">{item.icon}</span>
            <span className="mr-2">{item.label}</span>
          </div>
        ))}
        <div className="mt-auto flex items-center px-4 py-2">
          <span className="text-xl">👤</span>
          <span className="mr-2">משתמש פעיל</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">הוסף משימה</button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg">ייצוא</button>
          </div>
          <div className="flex items-center">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2">חפש</button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded-lg mr-2">סנן</button>
            <select className="border rounded-lg px-2 py-1">
              <option>כל הקטגוריות</option>
              <option>עבודה</option>
              <option>לימודים</option>
              <option>פרויקט</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">עריכה</th>
              <th className="border p-2">מחיקה</th>
              <th className="border p-2">סטטוס</th>
              <th className="border p-2">שעת התחלה</th>
              <th className="border p-2">שעת סיום</th>
              <th className="border p-2">תאריך</th>
              <th className="border p-2">קטגוריה</th>
              <th className="border p-2">שפה</th>
              <th className="border p-2">עדיפות</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-b">
                <td className="border p-2 text-center">
                  <button>✏️</button>
                </td>
                <td className="border p-2 text-center">
                  <button>🗑️</button>
                </td>
                <td className={`border p-2 text-center ${task.status === "ממתין" ? "bg-red-100" : "bg-green-100"}`}>
                  {task.status}
                </td>
                <td className="border p-2 text-center">{task.timeStart}</td>
                <td className="border p-2 text-center">{task.timeEnd}</td>
                <td className="border p-2 text-center">{task.date}</td>
                <td className="border p-2 text-center">{task.category}</td>
                <td className="border p-2 text-center">{task.language}</td>
                <td className="border p-2 text-center">{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mifgash;
