/**
 * STUDENT CARD COMPONENT - Demonstrates:
 * ✅ Props destructuring
 * ✅ Event handlers for delete and edit
 * ✅ Dynamic styling based on data
 * ✅ Reusable component pattern
 */
function StudentCard({ student, onDelete, onEdit }) {
  // Grade color mapping - Demonstrates conditional styling
  const gradeColors = {
    'A': '#10b981', // Green
    'B': '#3b82f6', // Blue
    'C': '#f59e0b', // Orange
    'D': '#ef4444', // Red
  };

  /**
   * EVENT HANDLER: Delete with confirmation
   * Demonstrates: Event handling with confirmation dialog
   */
  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure you want to delete ${student.name}?`)) {
      onDelete(student.id);
    }
  };

  /**
   * EVENT HANDLER: Edit student
   * Demonstrates: Passing data to parent via callback
   */
  const handleEditClick = () => {
    onEdit(student.id);
  };

  return (
    <div className="student-card">
      {/* Header with name and grade badge */}
      <div className="card-header">
        <h3 className="student-name">{student.name}</h3>
        <span 
          className="grade-badge"
          style={{ backgroundColor: gradeColors[student.grade] }}
        >
          {student.grade}
        </span>
      </div>

      {/* Card body with student info */}
      <div className="card-body">
        <div className="info-item">
          <span className="label">📧 Email:</span>
          <span className="value">{student.email}</span>
        </div>
        <div className="info-item">
          <span className="label">📚 Course:</span>
          <span className="value">{student.course}</span>
        </div>
      </div>

      {/* Card footer with action buttons */}
      <div className="card-footer">
        <button
          className="btn btn-edit"
          onClick={handleEditClick}
          title="Edit this student"
        >
          ✏️ Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={handleDeleteClick}
          title="Delete this student"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default StudentCard;
