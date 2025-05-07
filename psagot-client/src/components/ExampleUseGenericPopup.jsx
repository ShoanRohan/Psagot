import React, { useState } from 'react';
import GenericPopup from '../components/GenericPopup';
import { Button } from '@mui/material';

const ExampleUseGenericPopup = () => {
    const [showCancel, setShowCancel] = useState(true); // מצב האם להראות כפתור ביטול
    const [showSave, setShowSave] = useState(true); // מצב האם להראות כפתור שמור
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => {
        setOpen(true);
    }

    const handleClosePopup = () => {
        setOpen(false);
    }

    const handleSave = () => {
        alert("כפתור שמור נלחץ");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            {/* כפתור לפתיחת הפופ-אפ */}
            <Button onClick={handleOpenPopup}>דוגמא לפופ-אפ</Button>
            {/* שימוש בקומפוננטה של GenericPopup */}
            <GenericPopup
                open={open}
                onClose={handleClosePopup}
                title="כותרת הפופ-אפ"
                onSave={handleSave}
                onCancel={handleCancel}
                showCancelButton={showCancel}
                showSaveButton={showSave}
            >
                זהו תוכן הפופ-אפ!
            </GenericPopup>
        </React.Fragment>
    );
};

export default ExampleUseGenericPopup;
