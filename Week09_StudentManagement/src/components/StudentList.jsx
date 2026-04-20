import StudentCard from './StudentCard';

/**
 * STUDENT LIST COMPONENT - Demonstrates:
 * ✅ Props (receiving array and callbacks)
 * ✅ Array mapping (.map() for rendering lists)
 * ✅ Key prop (React list rendering best practice)
 * ✅ Conditional rendering (empty state)
 * ✅ Component composition (using StudentCard)
 */
function StudentList({ students, onDelete, onEdit }) {
  // Conditional rendering: Show empty state if no students
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <h3>📭 No students found</h3>
        <p>Add a new student to get started!</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <h2>📋 Student List ({students.length})</h2>
      
      <div className="student-cards-container">
        {/* 
          Mapping array of students to StudentCard components
          Demonstrates: .map(), key prop, props passing
        */}
        {students.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default StudentList;
