import React from 'react';

const Test = () => {
  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .container {
          display: grid;
          grid-template-areas:
            "sidebar header"
            "sidebar calendar";
          grid-template-columns: 250px 1fr;
          grid-template-rows: auto 1fr;
          height: 100vh;
        }

        .sidebar {
          grid-area: sidebar;
          background-color: #333;
          color: white;
          padding: 20px;
        }

        .header {
          grid-area: header;
          background-color: #2196F3;
          color: white;
          padding: 20px;
        }

        .calendar {
          grid-area: calendar;
          background-color: #f1f1f1;
          padding: 20px;
        }

        .sidebar a {
          color: white;
          text-decoration: none;
          display: block;
          margin: 10px 0;
        }

        @media (max-width: 768px) {
          .container {
            grid-template-areas:
              "header"
              "sidebar"
              "calendar";
            grid-template-columns: 1fr;
            grid-template-rows: auto auto 1fr;
          }

          .sidebar {
            text-align: center;
          }
        }
      `}</style>

      <div className="container">
        <div className="sidebar">
          <h2>תפריט צד</h2>
          <a href="#">קישור 1</a>
          <a href="#">קישור 2</a>
          <a href="#">קישור 3</a>
        </div>
        <div className="header">
          <h1>כותרת עליונה</h1>
        </div>
        <div className="calendar">
          <h2>לוח שנה</h2>
          <p>כאן תוכלי להוסיף את רכיב לוח השנה שלך.</p>
        </div>
      </div>
    </>
  );
};

export default Test;
