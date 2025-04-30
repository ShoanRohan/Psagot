import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../meeting/meetingActions';
import { ExportIconButton } from './ExportIconButton';

export const ExportMeetingsButton = () => {
  const dispatch = useDispatch();
 
  const { meetings, status } = useSelector((state) => state.meeting);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>טוען...</div>;
  if (status === 'failed') return <div>שגיאה בטעינה</div>;

  

  return (
    <ExportIconButton
      data={meetings}
      fileName="meetings"
      sheetName="Meetings"
    />
  );
};
