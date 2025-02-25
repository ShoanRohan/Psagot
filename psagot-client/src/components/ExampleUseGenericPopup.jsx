import React, { useState } from 'react';
import GenericPopup from '../components/GenericPopup';

const ExampleUseGenericPopup = () => {
    const [showButtons, setShowButtons] = useState(true); // מצב האם להראות כפתורים
    const [open, setOpen] = useState(false);

    const handleOpenPopup = () => setOpen(true);
    const handleClosePopup = () => setOpen(false);

    const handleConfirm = () => {
        alert("כפתור שמור נלחץ");
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const toggleButtons = () => {
        setShowButtons(prevState => !prevState);
    };

    return (
        <div>
            {/* כפתור לפתיחת הפופ-אפ */}
            <button onClick={handleOpenPopup}>פתח פופ-אפ</button>

            {/* כפתור לשינוי מצב הצגת כפתורי אישור וביטול */}
            {/* <button onClick={toggleButtons}>שנה מצב כפתורי אישור/ביטול</button> */}

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
    );
};

export default ExampleUseGenericPopup;
