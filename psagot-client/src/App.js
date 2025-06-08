import React from 'react';
import UserProfileEditor from './components/UserProfileEditor';
import Popup from './components/Popup';
import MeetingLocatorBar from './components/MeetingLocatorBar';
import From from './components/From'; // if you have a From.js component
import Mifgash from './components/Mifgash';
import UserProfile from './components/UserProfile';  // נתיב נכון לפי מיקום הקובץ שלך
import UsersTable from './components/UsersTabel';


function App() {
  return (
    <div className="App">
      <h1>ברוך הבא</h1>
      <UsersTable></UsersTable>
    
    </div>
     
  );
}

export default App;

