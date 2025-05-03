import React from 'react';
import CalendarHeader from './CalendarHeader';
import SideBar from './SideBar';
import CalendarPage from '../pages/CalendarPage';

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

    

          .sidebar {
            text-align: center;
          }
        }
      `}</style>

      <div className="container">
        <div className="sidebar"><SideBar/></div>
        <div className="header"><CalendarHeader/></div>
        <div className="calendar"><CalendarPage/></div>
      </div>
    </>
  );
};

export default Test;
