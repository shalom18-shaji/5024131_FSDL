import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    if (task.trim() === "") return
    setTasks([...tasks, task])
    setTask("")
  }

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index)
    setTasks(updatedTasks)
  }

  const resetTasks = () => {
    setTasks([])
  }

  return (
  <div
    style={{
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('wall.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.9)",
          padding: "30px",
          borderRadius: "15px",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Todo List</h2>

        <div style={{ display: "flex", marginBottom: "15px" }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            style={{ flex: 1, padding: "8px" }}
          />
          <button onClick={addTask} style={{ marginLeft: "5px" }}>
            Add
          </button>
        </div>

        {tasks.map((t, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "8px",
              padding: "8px",
              backgroundColor: "#f7f7f7",
              borderRadius: "5px",
            }}
          >
            <span>{t}</span>
            <button onClick={() => deleteTask(index)}>X</button>
          </div>
        ))}

        {tasks.length > 0 && (
          <button
            onClick={resetTasks}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "8px",
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Reset All
          </button>
        )}
      </div>
    </div>
  )
}

export default App