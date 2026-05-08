import { useState, useRef, useEffect } from "react";

function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");

  // REF
  const inputRef = useRef(null);

  // HOOK (useEffect)
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addStudent = () => {
    if (name.trim() === "") return;

    setStudents([...students, name]);
    setName("");

    inputRef.current.focus();
  };

  const deleteStudent = (index) => {
    const updated = students.filter((_, i) => i !== index);
    setStudents(updated);
  };

  return (
    <div>
      <h2>Student Page</h2>

      <input
        ref={inputRef}
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter student name"
      />

      <button onClick={addStudent}>Add</button>

      <ul>
        {students.map((s, index) => (
          // KEY used here
          <li key={index}>
            {s}
            <button onClick={() => deleteStudent(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Students;