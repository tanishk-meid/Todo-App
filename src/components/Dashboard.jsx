import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Dashboard() {
  const { todos } = useOutletContext();
  const navigate = useNavigate();

  const tips = [
    "Break big tasks into smaller ones.",
    "Take short breaks every 30 minutes.",
    "Use the 2-minute rule: If it takes less than 2 minutes, do it now.",
    "Minimize distractions and mute notifications.",
    "Prioritize: Do the most important task first.",
    "Stay hydrated and take screen breaks.",
  ];

  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-header">
        <h2>welcome to todo app</h2>
        <p>Today is {new Date().toLocaleDateString()}</p>
      </div>

      <div className="dashboard-widgets">
        <div className="dashboard-card focus-card">
          <h3>🎯 Today's Focus</h3>
          <p>Finish your top priority task.</p>
        </div>
        <div className="dashboard-card tip-card">
          <h3>💡 Productivity Tip</h3>
          <p>{tip}</p>
        </div>
        <div className="dashboard-card progress-card">
          <h3>📊 Todo Progress</h3>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percent}%` }}></div>
          </div>
          <p>{completedCount} / {totalCount} completed</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
