import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load students from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(data);
  }, []);

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleAdd = () => {
    if (!name || !mobile || !address) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = { name, mobile, address };

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = newStudent;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, newStudent]);
    }

    setName("");
    setMobile("");
    setAddress("");
  };

  const handleDelete = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  const handleEdit = (index) => {
    const student = students[index];
    setName(student.name);
    setMobile(student.mobile);
    setAddress(student.address);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h2>Student Manager</h2>
      <h4>Total Students: {students.length}</h4>

      <div className="form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleAdd}>{editIndex !== null ? "Update" : "Add"}</button>
      </div>

      <div className="list">
        {students.map((student, index) => (
          <div className="card" key={index}>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Mobile:</strong> {student.mobile}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
