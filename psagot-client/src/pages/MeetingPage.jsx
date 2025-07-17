import React from "react";
import MeetingButton from "./MeetingButton";
import { ExportIconButton } from "./ExportIconButton";
import MeetingTable from "../components/MeetingTable";
import { useDispatch, useSelector } from "react-redux";

const MeetingPage = () => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'flex-end'}}>
        <MeetingButton/>

        <ExportIconButton
          data={meetings}
          fileName="meetings"
          sheetName="Meetings"
        />
      </div>

      {/* טבלת הפגישות */}
      <MeetingTable />
    </div>
  );
};

export default MeetingPage;
