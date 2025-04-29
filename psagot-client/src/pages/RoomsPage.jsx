import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/room/roomSlice';
import { fetchAllRooms, fetchRoomScheduleByDate } from '../features/room/roomActions';

const RoomsView = ({ rooms }) => (
  <div>
    <h3>תצוגת חדרים</h3>
    <ul>
      {rooms.map((room) => (
        <li key={room.id}>{room.name}</li>
      ))}
    </ul>
  </div>
);

const ScheduleView = ({ schedule }) => (
  <div>
    <h3>תצוגת לוח זמנים</h3>
    <ul>
      {schedule.map((entry, idx) => (
        <li key={idx}>{entry.roomName} - {entry.date}</li>
      ))}
    </ul>
  </div>
);

const RoomsPage = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.room.viewMode);
  const rooms = useSelector((state) => state.room.rooms);
  const schedule = useSelector((state) => state.room.roomSchedule);

  useEffect(() => {
    if (viewMode === 'rooms') {
      dispatch(fetchAllRooms());
    } else {
      dispatch(fetchRoomScheduleByDate());
    }
  }, [viewMode, dispatch]);

  const toggleView = () => {
    dispatch(setViewMode(viewMode === 'rooms' ? 'schedule' : 'rooms'));
  };

  return (
    <div>
      <h2>ניהול חדרים</h2>
      <button onClick={toggleView}>
        {viewMode === 'rooms' ? 'מעבר ללוח זמנים' : 'מעבר לחדרים'}
      </button>
      <hr />
      {viewMode === 'rooms' ? <RoomsView rooms={rooms} /> : <ScheduleView schedule={schedule} />}
    </div>
  );
};

export default RoomsPage;
