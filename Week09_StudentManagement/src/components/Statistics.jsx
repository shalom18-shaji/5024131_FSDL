/**
 * STATISTICS COMPONENT - Demonstrates:
 * ✅ Props (receiving array data)
 * ✅ Derived state (calculating from props)
 * ✅ Mapping over arrays
 * ✅ Displaying aggregated data
 */
function Statistics({ totalStudents, courses }) {
  return (
    <div className="statistics-container">
      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <div className="stat-value">{totalStudents}</div>
          <div className="stat-label">Total Students</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-content">
          <div className="stat-value">{courses.length}</div>
          <div className="stat-label">Active Courses</div>
        </div>
      </div>

      <div className="stat-card courses-card">
        <div className="stat-icon">🎯</div>
        <div className="stat-content">
          <div className="stat-label">Courses Offered</div>
          <div className="courses-list">
            {/* 
              Mapping courses array
              Demonstrates: .map() with unique values
            */}
            {courses.map((course, index) => (
              <span key={index} className="course-tag">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
