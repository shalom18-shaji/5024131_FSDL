import { useState, useEffect, useRef } from "react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // useRef
  const inputRef = useRef(null);

  // useEffect
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addTask = () => {
    if (input.trim() === "") return;

    setTasks([...tasks, input]);
    setInput("");
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>Task Page</h2>

      <input
        ref={inputRef} // REF used here
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />

      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          // KEY used here
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;