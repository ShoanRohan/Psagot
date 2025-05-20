import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Button,
  Stack,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion } from "framer-motion";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@mui/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// --- RTL CONFIGURATION ---
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtl] });

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Arial, sans-serif",
  },
  palette: {
    primary: {
      main: "#1a73e8", // כחול
    },
  },
});

// --- SAMPLE USERS ---
const users = [
  { id: 1, name: "Alice Johnson", phone: "123-456-7890", username: "alice" },
  { id: 2, name: "Bob Smith", phone: "987-654-3210", username: "bob" },
  { id: 3, name: "Charlie Brown", phone: "555-555-5555", username: "charlie" },
];

// --- BREADCRUMB ---
const Breadcrumb = ({ items }) => (
  <Stack direction="row" spacing={1} alignItems="center" mb={2}>
    {items.map((item, index) => (
      <Stack direction="row" alignItems="center" key={index}>
        <Typography variant="body2" color="text.secondary">
          {item}
        </Typography>
        {index < items.length - 1 && <ChevronRightIcon fontSize="small" />}
      </Stack>
    ))}
  </Stack>
);

// --- RESULTS ---
const UserSearchResults = ({ searchObject }) => {
  const { query, phoneQuery, usernameQuery } = searchObject;
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.phone.includes(phoneQuery) ||
      user.username.toLowerCase().includes(usernameQuery.toLowerCase())
  );

  return (
    <Stack spacing={2}>
      {filteredUsers.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card variant="outlined">
            <CardContent>
              <Typography>
                {user.name} - {user.phone} - {user.username}
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Stack>
  );
};

// --- MAIN COMPONENT ---
function UserSearch() {
  const [searchObject, setSearchObject] = useState({
    query: "",
    phoneQuery: "",
    usernameQuery: "",
  });

  const handleChange = (field) => (e) => {
    setSearchObject({ ...searchObject, [field]: e.target.value });
  };

  const handleClear = () => {
    setSearchObject({
      query: "",
      phoneQuery: "",
      usernameQuery: "",
    });
  };

  return (
    <StylesProvider jss={jss}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div dir="rtl" style={{ maxWidth: 600, margin: "auto", padding: 16 }}>
            <Breadcrumb items={["ראשי", "משתמשים", "חיפוש"]} />

            {/* טפסים */}
            <Stack spacing={2} mb={3}>
              <TextField
                label="שם"
                variant="outlined"
                value={searchObject.query}
                onChange={handleChange("query")}
                fullWidth
              />
              <TextField
                label="שם משתמש"
                variant="outlined"
                value={searchObject.usernameQuery}
                onChange={handleChange("usernameQuery")}
                fullWidth
              />
              <TextField
                label="טלפון"
                variant="outlined"
                value={searchObject.phoneQuery}
                onChange={handleChange("phoneQuery")}
                fullWidth
              />
            </Stack>

            {/* כפתורים */}
            <Stack direction="row" spacing={2} justifyContent="flex-start" mb={3}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
              >
                חיפוש
              </Button>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<ClearIcon />}
                onClick={handleClear}
              >
                ניקוי
              </Button>
            </Stack>

            {/* תוצאות */}
            <UserSearchResults searchObject={searchObject} />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </StylesProvider>
  );
}

export default UserSearch;
