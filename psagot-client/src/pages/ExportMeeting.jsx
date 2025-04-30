import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMeetings } from '../meeting/meetingActions';
import { ExportIconButton } from './ExportIconButton';

export const ExportMeetingsButton = () => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meeting.meetings);
  const status = useSelector((state) => state.meeting.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllMeetings());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>טוען פגישות...</div>;
  }

  return (
    <ExportIconButton
      data={meetings}
      fileName="meetings"
      sheetName="Meetings"
    />
  );
};
