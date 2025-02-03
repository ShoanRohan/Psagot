import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserTypes } from "../features/userType/userTypeActions";
import { Typography, Button, Container } from "@mui/material";
import GenericPopup from "../components/GenericPopup";

const HomePage = () => {
  const dispatch = useDispatch();
  const { userTypes, status, error } = useSelector((state) => state.userType);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllUserTypes());
    }
  }, [status, dispatch]);

  const [open, setOpen] = useState(false);
  const [showButtons, setShowButtons] = useState(true); // מצב האם להראות כפתורים

  const handleOpenPopup = () => setOpen(true);
  const handleClosePopup = () => setOpen(false);

  const handleConfirm = () => {
    alert("כפתור אישור נלחץ");
    setOpen(false);
  };

  const handleCancel = () => {
    // alert("כפתור ביטול נלחץ");
    setOpen(false);
  };

  const handleClickButton = () => {
    alert("handle click button - userTypes" + JSON.stringify(userTypes));
  };

  const toggleButtons = () => {
    setShowButtons(prevState => !prevState); // משנה את המצב של כפתורים
  };

  if (status === 'loading') return <Typography>Loading...</Typography>;
  if (status === 'failed') return <Typography>Error: {error}</Typography>;

  return (
    <Container item style={{ textAlign: 'center', padding: 10 }}>
      <Typography variant="h5">😀hello psagot project😀</Typography>
      <Button onClick={handleClickButton}>Example of a function structure</Button>
      <div>
        {/* כפתור לפתיחת הפופ-אפ */}
        <button onClick={handleOpenPopup}>פתח פופ-אפ</button>
        
        {/* כפתור לשנות את מצב הצגת כפתורי אישור וביטול */}
        <button onClick={toggleButtons}>שנה מצב כפתורי אישור/ביטול</button>

        {/* שימוש בקומפוננטה של GenericPopup */}
        <GenericPopup
          open={open}
          onClose={handleClosePopup}
          title="כותרת הפופ-אפ"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          showConfirmCancelButtons={showButtons} 
        >
          זהו תוכן הפופ-אפ!
        </GenericPopup>
      </div>
    </Container>
  );
};

export default HomePage;
