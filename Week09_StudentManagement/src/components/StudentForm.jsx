import { useState, useEffect } from 'react';

/**
 * STUDENT FORM COMPONENT - Demonstrates:
 * ✅ Props (receiving callbacks from parent)
 * ✅ State (form field state management)
 * ✅ Controlled Components (form inputs)
 * ✅ Form Events (onChange, onSubmit)
 * ✅ Form Validation
 */
function StudentForm({ onAddStudent, editingStudent, onUpdateStudent, onCancelEdit }) {
  // STATE: Form field values using controlled component pattern
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'A',
    course: 'JavaScript',
  });

  // STATE: Form validation errors
  const [errors, setErrors] = useState({});

  // STATE: Form submission status
  const [submitted, setSubmitted] = useState(false);

  /**
   * EFFECT: Populate form when editing
   * Demonstrates: useEffect for form pre-filling
   */
  useEffect(() => {
    if (editingStudent) {
      setFormData(editingStudent);
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingStudent]);

  /**
   * EVENT HANDLER: Handle input changes
   * Demonstrates: Controlled component pattern
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validation function
   * Demonstrates: Form validation logic
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.course === '') {
      newErrors.course = 'Please select a course';
    }

    return newErrors;
  };

  /**
   * EVENT HANDLER: Form submission
   * Demonstrates: Form validation and conditional submission
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form behavior
    
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit based on edit or add mode
    if (editingStudent) {
      onUpdateStudent({ ...formData, id: editingStudent.id });
    } else {
      onAddStudent(formData);
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
    resetForm();
  };

  /**
   * Reset form - Demonstrates state clearing
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      grade: 'A',
      course: 'JavaScript',
    });
    setErrors({});
  };

  /**
   * EVENT HANDLER: Cancel edit
   * Demonstrates: Event propagation and parent communication
   */
  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <div className="form-card">
      <h2>{editingStudent ? '✏️ Edit Student' : '➕ Add New Student'}</h2>

      {/* Success Message - Demonstrates conditional rendering */}
      {submitted && (
        <div className="success-message">
          ✅ {editingStudent ? 'Student updated successfully!' : 'Student added successfully!'}
        </div>
      )}

      <form onSubmit={handleSubmit} className="student-form">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name">Student Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter student name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter email address"
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Course Select - Demonstrates select element */}
        <div className="form-group">
          <label htmlFor="course">Course *</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className={`form-input ${errors.course ? 'input-error' : ''}`}
          >
            <option value="">-- Select Course --</option>
            <option value="JavaScript">JavaScript</option>
            <option value="React">React</option>
            <option value="Node.js">Node.js</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
          </select>
          {errors.course && <span className="error-text">{errors.course}</span>}
        </div>

        {/* Grade Radio Buttons - Demonstrates radio input */}
        <div className="form-group">
          <label>Grade</label>
          <div className="radio-group">
            {['A', 'B', 'C', 'D'].map(grade => (
              <label key={grade} className="radio-label">
                <input
                  type="radio"
                  name="grade"
                  value={grade}
                  checked={formData.grade === grade}
                  onChange={handleInputChange}
                />
                Grade {grade}
              </label>
            ))}
          </div>
        </div>

        {/* Form Buttons - Demonstrates event handling */}
        <div className="form-buttons">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset
          </button>
          {editingStudent && (
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCancel}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
