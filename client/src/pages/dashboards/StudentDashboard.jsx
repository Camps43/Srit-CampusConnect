const StudentDashboard = () => {
   const notices = [
  { id: 1, title: "Placement Drive", date: "2025-08-05" },
  { id: 2, title: "Hackathon Event", date: "2025-08-12" },
];

return (
  <div>
    <h2>📢 Notices</h2>
    <ul>
      {notices.map((notice) => (
        <li key={notice.id}>
          <strong>{notice.title}</strong> - {notice.date}
        </li>
      ))}
    </ul>
  </div>
);
};
  export default StudentDashboard;
  