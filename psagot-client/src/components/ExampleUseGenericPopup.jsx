import React, { useState } from "react";
import { Button } from "@mui/material";
import GenericPopup from "./GenericPopup";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        פתח פופאפ
      </Button>
      <GenericPopup
        open={open}
        onClose={() => setOpen(false)}
        onSave={() => alert("נשמר!")}
        onCancel={() => setOpen(false)}
      />
    </div>
  );
};

export default App;
