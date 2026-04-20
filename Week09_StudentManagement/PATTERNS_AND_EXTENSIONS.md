# 🎯 React Patterns & Extensions Guide

This document shows common React patterns used in the Student Management System and how to extend the project.

---

## 📌 Part 1: React Patterns Used in This Project

### Pattern 1: Controlled Components

A component that stores form input state and updates it on every keystroke.

```jsx
// StudentForm.jsx - Controlled Input Pattern
const [formData, setFormData] = useState({
  name: '',
  email: '',
  grade: 'A',
  course: 'JavaScript'
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

<input
  name="name"
  value={formData.name}        // Controlled by state
  onChange={handleInputChange}  // Updates state
/>
```

**Benefits:**
- React controls the input value
- Can validate in real-time
- Can disable submit button conditionally
- Can pre-fill form easily

---

### Pattern 2: Lifting State Up

When multiple components need to share state, move it to their common parent.

```jsx
// App.jsx - State lives here
const [students, setStudents] = useState([...]);
const [searchTerm, setSearchTerm] = useState('');

// Pass state and callbacks to children
<StudentForm onAddStudent={handleAddStudent} />
<StudentList 
  students={filteredStudents} 
  onDelete={handleDeleteStudent}
/>
```

**Benefits:**
- Single source of truth
- Easier debugging
- Easier to add new features

---

### Pattern 3: Conditional Rendering

Show/hide content based on state conditions.

```jsx
// StudentList.jsx
{students.length === 0 ? (
  <div className="empty-state">No students found</div>
) : (
  <div className="student-list">
    {students.map(student => <StudentCard key={student.id} />)}
  </div>
)}

// StudentForm.jsx - Success message
{submitted && (
  <div className="success-message">
    ✅ Student added successfully!
  </div>
)}

// Editing mode
{editingStudent ? (
  <h2>✏️ Edit Student</h2>
) : (
  <h2>➕ Add New Student</h2>
)}
```

**Use Cases:**
- Loading states
- Error messages
- Empty states
- Success confirmations
- Different UI for different modes

---

### Pattern 4: Props Drilling

Passing props through intermediate components to reach deep components.

```jsx
// App.jsx
<StudentList
  students={students}
  onDelete={handleDeleteStudent}
  onEdit={setEditingId}
/>

// StudentList.jsx (just passes props through)
function StudentList({ students, onDelete, onEdit }) {
  return students.map(student => (
    <StudentCard
      key={student.id}
      student={student}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  ))
}

// StudentCard.jsx (uses the props)
function StudentCard({ student, onDelete, onEdit }) {
  const handleDelete = () => onDelete(student.id);
  const handleEdit = () => onEdit(student.id);
  // ... rest of component
}
```

**Alternative (for large apps):** Use Context API or state management libraries

---

### Pattern 5: Array Immutability

React requires immutable state updates. Handle arrays properly:

```jsx
// ❌ WRONG - DO NOT DO THIS
state.students.push(newStudent);
setState(state);

// ✅ CORRECT - Add to array
setStudents([...students, newStudent]);

// ✅ CORRECT - Remove from array
setStudents(students.filter(s => s.id !== id));

// ✅ CORRECT - Update in array
setStudents(students.map(s =>
  s.id === id ? { ...s, name: 'Updated' } : s
));

// ✅ CORRECT - Update nested object
setFormData(prev => ({
  ...prev,
  [name]: value
}));
```

**Why?** React detects changes by comparing object references. Immutable updates create new references, triggering re-renders.

---

### Pattern 6: Filtering & Searching

Filter data based on user input.

```jsx
// App.jsx
const [searchTerm, setSearchTerm] = useState('');

const filteredStudents = students.filter(student =>
  student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  student.course.toLowerCase().includes(searchTerm.toLowerCase())
);

// Pass filtered data to child
<StudentList students={filteredStudents} />

// Update search on input
<input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search..."
/>
```

---

### Pattern 7: Form Validation

Validate user input before submission.

```jsx
// StudentForm.jsx
const validateForm = () => {
  const newErrors = {};

  if (!formData.name.trim()) {
    newErrors.name = 'Name is required';
  }

  if (!formData.email.includes('@')) {
    newErrors.email = 'Invalid email format';
  }

  if (formData.course === '') {
    newErrors.course = 'Please select a course';
  }

  return newErrors;
};

const handleSubmit = (e) => {
  e.preventDefault();
  
  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;  // Stop submission
  }

  // Submission logic...
  onAddStudent(formData);
};

// Display errors
{errors.name && <span className="error">{errors.name}</span>}
```

---

### Pattern 8: Modal/Dialog with Confirmation

Delete with user confirmation.

```jsx
// StudentCard.jsx
const handleDeleteClick = () => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${student.name}?`
  );
  
  if (confirmed) {
    onDelete(student.id);
  }
};

<button onClick={handleDeleteClick}>Delete</button>
```

---

### Pattern 9: Key Prop in Lists

Always use a unique key when rendering lists.

```jsx
// ✅ CORRECT
{students.map(student => (
  <StudentCard key={student.id} student={student} />
))}

// ❌ WRONG - DO NOT USE INDEX
{students.map((student, index) => (
  <StudentCard key={index} student={student} />
))}
```

**Why?** Keys help React identify which items have changed, been added, or removed. Without proper keys, list re-renders can be inefficient and cause bugs.

---

## 🚀 Part 2: How to Extend the Project

### Extension 1: Add More Fields to Form

**Goal:** Add a "Batch" field to students

```jsx
// 1. Update initial state in App.jsx
const [students, setStudents] = useState([{
  id: 1,
  name: 'Amit',
  email: 'amit@email.com',
  grade: 'A',
  course: 'JavaScript',
  batch: '2024' // NEW FIELD
}]);

// 2. Update form state in StudentForm.jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  grade: 'A',
  course: 'JavaScript',
  batch: '2024' // NEW FIELD
});

// 3. Add form input in StudentForm.jsx
<div className="form-group">
  <label htmlFor="batch">Batch</label>
  <select
    id="batch"
    name="batch"
    value={formData.batch}
    onChange={handleInputChange}
  >
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
  </select>
</div>

// 4. Display in StudentCard.jsx
<div className="info-item">
  <span className="label">📅 Batch:</span>
  <span className="value">{student.batch}</span>
</div>
```

---

### Extension 2: Add Sorting Feature

**Goal:** Sort students by name or grade

```jsx
// App.jsx
const [sortBy, setSortBy] = useState('name'); // 'name', 'grade', 'email'

// Sorting logic
const sortedStudents = [...filteredStudents].sort((a, b) => {
  if (sortBy === 'name') {
    return a.name.localeCompare(b.name);
  }
  if (sortBy === 'grade') {
    return a.grade.localeCompare(b.grade);
  }
  return 0;
});

// Add sorting buttons
<div className="sort-buttons">
  <button onClick={() => setSortBy('name')}>Sort by Name</button>
  <button onClick={() => setSortBy('grade')}>Sort by Grade</button>
</div>

// Pass sorted data
<StudentList students={sortedStudents} />
```

---

### Extension 3: Add Local Storage Persistence

**Goal:** Save students to browser storage so they persist on page reload

```jsx
// App.jsx
import { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Amit', email: 'amit@email.com', grade: 'A', course: 'JavaScript' }
    ];
  });

  // Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // ... rest of component
}

export default App;
```

---

### Extension 4: Add Edit Inline in Card

**Goal:** Edit student details directly in the card without opening a form

```jsx
// StudentCard.jsx
import { useState } from 'react';

function StudentCard({ student, onDelete, onEdit, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(student);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onUpdate(editData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="student-card editing">
        <input
          name="name"
          value={editData.name}
          onChange={handleChange}
        />
        <input
          name="email"
          value={editData.email}
          onChange={handleChange}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </div>
    );
  }

  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <button onClick={() => setIsEditing(true)}>Quick Edit</button>
      <button onClick={() => onDelete(student.id)}>Delete</button>
    </div>
  );
}

export default StudentCard;
```

---

### Extension 5: Add Filter by Grade

**Goal:** Filter students by selected grade

```jsx
// App.jsx
const [filterGrade, setFilterGrade] = useState('All');

const filteredStudents = students.filter(student => {
  const matchesSearch = student.name.toLowerCase().includes(searchTerm);
  const matchesGrade = filterGrade === 'All' || student.grade === filterGrade;
  return matchesSearch && matchesGrade;
});

// Add filter buttons
<div className="filter-buttons">
  <button
    onClick={() => setFilterGrade('All')}
    className={filterGrade === 'All' ? 'active' : ''}
  >
    All
  </button>
  {['A', 'B', 'C', 'D'].map(grade => (
    <button
      key={grade}
      onClick={() => setFilterGrade(grade)}
      className={filterGrade === grade ? 'active' : ''}
    >
      Grade {grade}
    </button>
  ))}
</div>
```

---

### Extension 6: Add Export to CSV

**Goal:** Export student data as CSV file

```jsx
// App.jsx
const exportToCSV = () => {
  const headers = ['Name', 'Email', 'Grade', 'Course'];
  const rows = students.map(s => [s.name, s.email, s.grade, s.course]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'students.csv';
  link.click();
};

<button onClick={exportToCSV}>📥 Export CSV</button>
```

---

### Extension 7: Add Bulk Delete

**Goal:** Select multiple students and delete them all at once

```jsx
// App.jsx
const [selected, setSelected] = useState(new Set());

const toggleSelect = (id) => {
  const newSelected = new Set(selected);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelected(newSelected);
};

const deleteBulk = () => {
  if (window.confirm(`Delete ${selected.size} students?`)) {
    setStudents(students.filter(s => !selected.has(s.id)));
    setSelected(new Set());
  }
};

<button onClick={deleteBulk}>🗑️ Delete Selected ({selected.size})</button>
```

---

### Extension 8: Add Search History

**Goal:** Remember previous searches

```jsx
// App.jsx
const [searchHistory, setSearchHistory] = useState([]);

const handleSearch = (e) => {
  const term = e.target.value;
  setSearchTerm(term);
  
  if (term && !searchHistory.includes(term)) {
    setSearchHistory([term, ...searchHistory].slice(0, 5));
  }
};

// Suggest previous searches
<div className="search-suggestions">
  {searchHistory.map((term, i) => (
    <button
      key={i}
      onClick={() => setSearchTerm(term)}
    >
      {term}
    </button>
  ))}
</div>
```

---

## 📊 Part 3: Performance Optimization

### Use React.memo for StudentCard

Prevent unnecessary re-renders when props haven't changed:

```jsx
import { memo } from 'react';

const StudentCard = memo(function StudentCard({ student, onDelete, onEdit }) {
  return (
    <div className="student-card">
      {/* ... */}
    </div>
  );
});

export default StudentCard;
```

---

### Use useCallback for Event Handlers

Prevent creating new function references on every render:

```jsx
import { useCallback } from 'react';

const App = () => {
  const handleDeleteStudent = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  }, []);

  return <StudentList onDelete={handleDeleteStudent} />;
};
```

---

## 🎓 Summary

| Topic | How to | Example |
|-------|--------|---------|
| Add field | 1. Update state 2. Add form input 3. Display in card | Batch field |
| Add sort | Create sorted copy of array, pass to component | Sort by grade |
| Persist data | Use localStorage with useEffect | Save to localStorage |
| Edit inline | Add editing state in card component | Quick edit |
| Filter results | Update filter state, filter array | Filter by grade |
| Export data | Create CSV, download as file | Export to CSV |
| Select multiple | Use Set to track selections | Bulk delete |
| Optimize | Use React.memo, useCallback | Prevent re-renders |

---

**Keep coding and have fun! 🚀**
