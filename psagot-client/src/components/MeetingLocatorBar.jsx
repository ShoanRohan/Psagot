import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTopic } from "../features/topic/topicActions";

const MeetingLocatorBar = () => {
  const dispatch = useDispatch();
  const [selectedTopics, setSelectedTopics] = useState("");

  const { topics, status, error } = useSelector((state) => state.topic || {});

  useEffect(() => {
    dispatch(fetchAllTopic());
  }, [dispatch]);

  return (
    <div>
      <label htmlFor="topic-select">בחר נושא:</label>
      {status === "loading" && <p>טוען נושאים...</p>}
      {error && <p style={{ color: "red" }}>שגיאה: {error}</p>}
      <select
        id="topic-select"
        value={selectedTopics}
        onChange={(e) => setSelectedTopics(e.target.value)}
        disabled={status === "loading"}
      >
        <option value="">בחר נושא</option>
        {topics?.length > 0 ? (
          topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))
        ) : (
          <option disabled>אין נושאים זמינים</option>
        )}
      </select>
    </div>
  );
};

export default MeetingLocatorBar;
