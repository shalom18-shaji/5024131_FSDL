import { useState } from "react"

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [date, setDate] = useState("")

  const addTask = () => {
    if (task.trim() === "") return
    setTasks([...tasks, { text: task, date }])
    setTask("")
    setDate("")
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
          "linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('wall.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div
        style={{
          background: "rgba(20,20,20,0.85)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "40px",
          borderRadius: "20px",
          width: "500px",
          maxWidth: "95%",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            letterSpacing: "1px"
          }}
        >
          My Tasks
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            width: "100%",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task..."
            style={{
              flex: 2,
              minWidth: "0",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white"
            }}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              flex: 1,
              minWidth: "140px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.1)",
              color: "white"
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              border: "none",
              background: "linear-gradient(135deg, #4CAF50, #2ecc71)",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              whiteSpace: "nowrap",
              flexShrink: 0
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Add
          </button>
        </div>

        {tasks.map((t, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              color: "white"
            }}
          >
            <span style={{ fontSize: "14px" }}>
              {t.text} <br />
              <small style={{ opacity: 0.7 }}>{t.date}</small>
            </span>

            <button
              onClick={() => deleteTask(index)}
              style={{
                background: "red",
                border: "none",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                padding: "5px 8px"
              }}
              onMouseOver={(e) => (e.target.style.opacity = "0.7")}
              onMouseOut={(e) => (e.target.style.opacity = "1")}
            >
              X
            </button>
          </div>
        ))}

        {tasks.length > 0 && (
          <button
            onClick={resetTasks}
            style={{
              marginTop: "20px",
              width: "100%",
              padding: "10px",
              background: "linear-gradient(135deg, #ff4d4d, #ff1a1a)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer"
            }}
            onMouseOver={(e) => (e.target.style.opacity = "0.8")}
            onMouseOut={(e) => (e.target.style.opacity = "1")}
          >
            Reset All
          </button>
        )}
      </div>
    </div>
  )
}

export default App