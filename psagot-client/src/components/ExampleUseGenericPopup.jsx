import React, { useState } from 'react';
import GenericPopup from '../components/GenericPopup';
import Button from '@mui/material/Button';

const ExampleUseGenericPopup = () => {
    const [showCancel, setShowCancel] = useState(true);
    const [showSave, setShowSave] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => setOpen(true);
    const handleClosePopup = () => setOpen(false);
    const handleSave = () => {
        //פעילות שתתבצע בעת השמירה
        alert("כפתור שמור נלחץ");
        setOpen(false);
    };
    const handleCancel = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpenPopup}>דוגמא לפופ-אפ</Button>
            <GenericPopup
                open={open}
                onClose={handleClosePopup}
                title="כותרת הפופ-אפ"
                onSave={handleSave}
                onCancel={handleCancel}
                showCancelButton={showCancel}
                showSaveButton={showSave}
                subTitle='דוגמא לתוכן 1, אפשרי שאלה אם לשמור תוכן'
                content='דוגמא לתוכן 2, לא חובה'
            >
            </GenericPopup>
        </>
    );
};

export default ExampleUseGenericPopup;