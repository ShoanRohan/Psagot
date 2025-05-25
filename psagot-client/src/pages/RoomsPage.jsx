import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewMode } from '../features/room/roomSlice';
import { fetchAllRooms, fetchRoomsScheduleByDate } from '../features/room/roomActions';
import RoomsScheduleSearch from '../components/RoomsScheduleSearch';
import RoomSchedule from '../components/RoomsScheduleGrid';


const RoomsPage = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector((state) => state.room.viewMode);
  const rooms = useSelector((state) => state.room.rooms);
  const schedule = useSelector((state) => state.room.roomSchedule);

  useEffect(() => {
    if (viewMode === 'rooms') {
      dispatch(fetchAllRooms());
    } else {
      dispatch(fetchRoomsScheduleByDate());
    }
  }, [viewMode, dispatch]);

  const toggleView = () => {
    dispatch(setViewMode(viewMode === 'rooms' ? 'schedule' : 'rooms'));
  };

  return (
    <div>
      <h2>חדרים</h2>
      <button onClick={toggleView}>
        {viewMode === 'rooms' ? 'מעבר ללוח זמנים' : 'מעבר לחדרים'}
      </button>
      <hr />
      {viewMode === 'rooms'
        ? <RoomsScheduleSearch rooms={rooms} />
        : <RoomSchedule schedule={schedule} />}
    </div>
  );
};

export default RoomsPage;
