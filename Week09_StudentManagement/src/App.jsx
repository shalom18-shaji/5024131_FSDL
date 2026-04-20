import { useState } from 'react';
import './styles/App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import Statistics from './components/Statistics';

/**
 * MAIN APP COMPONENT - Demonstrates:
 * ✅ State Management (useState)
 * ✅ Props Passing (data to child components)
 * ✅ Event Handling (add, delete, update, search)
 * ✅ Component Composition (nested components)
 */
function App() {
  // STATE: Managing student data
  const [students, setStudents] = useState([
    { id: 1, name: 'Amit Kumar', email: 'amit@email.com', grade: 'A', course: 'JavaScript' },
    { id: 2, name: 'Priya Singh', email: 'priya@email.com', grade: 'B', course: 'React' },
  ]);

  // STATE: Search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // STATE: Edit mode
  const [editingId, setEditingId] = useState(null);

  /**
   * EVENT HANDLER: Add new student
   * Demonstrates: Handling form submission and updating state
   */
  const handleAddStudent = (newStudent) => {
    const studentWithId = {
      ...newStudent,
      id: Date.now(), // Simple unique ID
    };
    setStudents([...students, studentWithId]);
  };

  /**
   * EVENT HANDLER: Delete student
   * Demonstrates: Array filtering and state update
   */
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  /**
   * EVENT HANDLER: Update student
   * Demonstrates: Finding and updating state
   */
  const handleUpdateStudent = (updatedStudent) => {
    setStudents(students.map(student =>
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingId(null);
  };

  /**
   * EVENT HANDLER: Search students
   * Demonstrates: Controlled input and filtering
   */
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter students based on search
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📚 Student Management System</h1>
        <p className="subtitle">React Concepts: Components, Props, State, Forms & Events</p>
      </header>

      <main className="app-main">
        {/* Statistics Component - Shows aggregated data */}
        <Statistics 
          totalStudents={students.length}
          courses={[...new Set(students.map(s => s.course))]}
        />

        <div className="content-wrapper">
          {/* Left Side: Form */}
          <section className="form-section">
            <StudentForm
              onAddStudent={handleAddStudent}
              editingStudent={editingId ? students.find(s => s.id === editingId) : null}
              onUpdateStudent={handleUpdateStudent}
              onCancelEdit={() => setEditingId(null)}
            />
          </section>

          {/* Right Side: Student List */}
          <section className="list-section">
            {/* Search Input - Demonstrates controlled component */}
            <div className="search-container">
              <input
                type="text"
                placeholder="🔍 Search by name, email, or course..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
              {searchTerm && (
                <span className="search-results">
                  Found: {filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'}
                </span>
              )}
            </div>

            {/* Student List Component - Receives props and event handlers */}
            <StudentList
              students={filteredStudents}
              onDelete={handleDeleteStudent}
              onEdit={setEditingId}
            />
          </section>
        </div>
      </main>

      <footer className="app-footer">
        <p>Total Students in System: <strong>{students.length}</strong></p>
      </footer>
    </div>
  );
}

export default App;
