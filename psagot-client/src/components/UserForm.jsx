import React, { useState, useEffect } from "react";

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    userTypeId: user ? user.userTypeId : "",
    isActive: user ? user.isActive : false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        userTypeId: user.userTypeId,
        isActive: user.isActive,
      });
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      userTypeId: formData.userTypeId,
      isActive: formData.isActive,
    };
    if (user) {
      console.log("עדכון משתמש קיים:", userData);
    } else {
      console.log("הוספת משתמש חדש:", userData);
    }
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>שם משתמש:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>
      <div>
        <label>אימייל:</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>
      <div>
        <label>טלפון:</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>
      <div>
        <label>הרשאה:</label>
        <select
          value={formData.userTypeId}
          onChange={(e) => setFormData({ ...formData, userTypeId: e.target.value })}
        >
          <option value="">בחר סוג</option>
          <option value="admin">מנהל</option>
          <option value="user">משתמש רגיל</option>
          <option value="guest">אורח</option>
        </select>
      </div>
      <div>
        <label>סטטוס:</label>
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        />
        <label>{formData.isActive ? "פעיל" : "לא פעיל"}</label>
      </div>
      <button type="submit">{user ? "עדכן משתמש" : "הוסף משתמש"}</button>
    </form>
  );
};

export default UserForm;
