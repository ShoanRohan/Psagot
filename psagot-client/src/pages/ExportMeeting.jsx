import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../meeting/meetingActions';
import { ExportIconButton } from './ExportIconButton';

export const ExportMeetingsButton = () => {
  const dispatch = useDispatch();
 
  const { meetings, status } = useSelector((state) => state.meeting);
  console.log("📦 meetings from Redux:", meetings);


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <div>טוען...</div>;
  if (status === 'failed') return <div>שגיאה בטעינה</div>;
  if (!meetings || meetings.length === 0) return <Typography>אין נתונים לייצוא</Typography>;

  

  return (
    <ExportIconButton
      data={meetings}
      fileName="meetings"
      sheetName="Meetings"
    />
  );
};
