import React from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExportIconButton } from "./ExportIconButton";
import MeetingTable from "../components/MeetingTable";
import MeetingButton from "../components/MeetingButton";
import { useNavigate } from "react-router-dom";

const MeetingPage = () => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);
 const navigate = useNavigate(); 

    // Handle navigation to edit meeting
   const handleEditMeeting = (meeting) => {
    // Navigate with meeting ID and optionally pass meeting data via state
    navigate(`/edit-meeting/${meeting.meetingId}`, { 
      state: { meeting } 
    });
  };
  return (
    <div>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {/* הוספת מפגש */}
          <MeetingButton />
          
          {/* ייצוא לאקסל */}
          <ExportIconButton
            data={meetings}
            fileName="meetings"
            sheetName="Meetings"
          />
        </div>
      </Container>
      
      {/* טבלת הפגישות */}
       <MeetingTable onEdit={handleEditMeeting} />
    </div>
  );
};

export default MeetingPage;
