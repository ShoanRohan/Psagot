import React from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ExportIconButton } from "./ExportIconButton";
import MeetingTable from "../components/MeetingTable";
import MeetingButton from "../components/MeetingButton";

const MeetingPage = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { meetings, status, error } = useSelector((state) => state.meeting);


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

      <MeetingTable onEdit={onEdit} />
    </div>
  );
};

export default MeetingPage;