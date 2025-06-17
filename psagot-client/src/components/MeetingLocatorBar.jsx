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
    </div>
  );
};

