import React, { useEffect, useState } from "react";
import "./contactInfo.css";

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!messages.length)
    return (
      <div className="admin-contact-container text-center">
        <div className="bg-yellow-100 text-yellow-800 p-8 rounded-xl shadow-md">
          <p className="text-lg font-semibold">No messages yet.</p>
        </div>
      </div>
    );

  return (
    <div className="admin-contact-container">
      <h2 className="admin-contact-heading">Messages</h2>

      <div className="admin-contact-table-wrapper">
        <table className="admin-contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
         <tbody>
  {messages.map((msg) => (
    <tr key={msg._id}>
      <td data-label="Name">{msg.name}</td>
      <td data-label="Email">{msg.email}</td>
      <td data-label="Message">{msg.message}</td>
      <td className="date" data-label="Date">
        {new Date(msg.createdAt).toLocaleString()}
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminContact;
