# 🎯 React Concepts Quick Reference Card

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                        App Component                         │
│              (State, Props, Events, Hooks)                   │
└──────────────┬──────────────────────────────────────────────┘
               │
    ┌──────────┼──────────────┬─────────────────┐
    │          │              │                 │
    ▼          ▼              ▼                 ▼
┌────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│ Stats  │ │  Search  │ │   Form   │ │ StudentList  │
│        │ │  Input   │ │          │ │              │
└────────┘ └──────────┘ └──────────┘ │ ┌──────────┐ │
                                      │ │  Cards × │ │
                                      │ │     N    │ │
                                      │ └──────────┘ │
                                      └──────────────┘
                                           (Loop)
```

---

## 🧩 Concept Map

```
COMPONENTS (Functions that return JSX)
    ├── App (Main)
    ├── StudentForm (Reusable)
    ├── StudentList (Reusable)
    ├── StudentCard (Reusable)
    └── Statistics (Reusable)

PROPS (Data Down ↓)
    ├── student={student}
    ├── students={[...]}
    ├── onAddStudent={callback}
    ├── onDelete={callback}
    └── onEdit={callback}

STATE (Data Management)
    ├── students: useState([...])
    ├── searchTerm: useState("")
    ├── editingId: useState(null)
    ├── formData: useState({...})
    ├── errors: useState({})
    └── submitted: useState(false)

EVENTS (User Actions ↑)
    ├── onClick (buttons)
    ├── onChange (inputs)
    ├── onSubmit (forms)
    └── Custom callbacks

ARRAY METHODS (Data Transformation)
    ├── .map() → Render lists
    ├── .filter() → Search/filter
    └── .find() → Get single item

CONDITIONAL RENDERING (Show/Hide)
    ├── Ternary operator (? :)
    ├── && operator
    ├── if/else in JSX
    └── Early returns
```

---

## 🔄 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   APP COMPONENT (State)                      │
│  const [students] = useState([...])                          │
│  const [searchTerm] = useState("")                           │
│  const [editingId] = useState(null)                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
    ┌─────────────┼─────────────┐
    │             │             │
    ▼             ▼             ▼
┌──────────┐  ┌────────┐  ┌──────────────┐
│StudentForm│  │ Search │  │StudentList   │
│(Props:    │  │(onChange)│  │(Props:      │
│onAdd,edit)│  │         │  │students,del)│
└──────────┘  └────────┘  └──────────────┘
    │             │             │
    │ Calls       │ Updates     │ Maps
    │ onAddStudent│ searchTerm  │ to StudentCard
    │ onUpdateStud│             │
    │             │             ▼
    │             │         ┌──────────────┐
    │             │         │StudentCard   │
    │             │         │(Props:       │
    │             │         │student,      │
    │             │         │onDelete,etc.)│
    │             │         └──────────────┘
    │             │             │
    └─────────────┴─────────────┴─► Updates state in App
        Event Propagation (Up ↑)
```

---

## 📋 State Management Cheat Sheet

```
Creating State:
    const [value, setValue] = useState(initialValue);

Updating Simple Value:
    setValue(newValue);

Updating Object:
    setValue(prev => ({
        ...prev,
        field: newValue
    }));

Updating Array - Add:
    setValue([...array, newItem]);

Updating Array - Remove:
    setValue(array.filter(item => item.id !== id));

Updating Array - Update:
    setValue(array.map(item =>
        item.id === id ? newValue : item
    ));

Updating Array - Find:
    const item = array.find(item => item.id === id);
```

---

## 🎨 React Hooks Used

```
useState
├── Purpose: Manage component state
├── Syntax: const [value, setValue] = useState(initial)
├── When: Need to track changing data
└── Example: const [students, setStudents] = useState([])

useEffect
├── Purpose: Run side effects
├── Syntax: useEffect(() => { ... }, [dependencies])
├── When: After render, on mount, on dependency change
└── Example: useEffect(() => { setFormData(student) }, [editingStudent])

Key Rules:
├── Only call hooks at top level
├── Don't call hooks inside loops/conditions
├── Hooks must be called in same order
└── Use dependency array to control when effect runs
```

---

## 🏗️ Component Structure Template

```jsx
import { useState } from 'react';

/**
 * Component Description
 * Demonstrates: Concepts (Props, State, Events, Forms)
 */
function ComponentName({ prop1, prop2, onCallback }) {
  // STATE: Component data management
  const [state, setState] = useState(initialValue);

  // EVENT HANDLERS: User interaction
  const handleEvent = (e) => {
    // Handle event
  };

  // RETURN: JSX
  return (
    <div className="component">
      <h2>{prop1}</h2>
      <input onChange={handleEvent} />
      <button onClick={onCallback}>Action</button>
    </div>
  );
}

export default ComponentName;
```

---

## ✅ React Best Practices

```
DO ✅
├── Keep components small and focused
├── Use meaningful names
├── Validate form inputs
├── Use keys in lists
├── Handle errors gracefully
├── Use conditional rendering
├── Comment complex logic
├── Keep state near where it's used
├── Use immutable updates
└── Follow naming conventions

DON'T ❌
├── Mutate state directly
├── Use index as key
├── Call hooks in loops
├── Pass many props (prop drilling)
├── Mutate props
├── Set state in render
├── Create functions in render
├── Use inline object/array literals
├── Forget dependency arrays
└── Use var keyword
```

---

## 🎯 When to Use What

```
Need to track data?
→ Use STATE (useState)

Need to pass data down?
→ Use PROPS

Need to send data up?
→ Pass CALLBACK as prop

Need to collect input?
→ Use CONTROLLED COMPONENTS

Need to respond to action?
→ Use EVENT HANDLER

Need to render list?
→ Use .map() with key prop

Need to filter data?
→ Use .filter()

Need side effects?
→ Use useEffect

Need to reuse code?
→ Create COMPONENT
```

---

## 📊 Common Patterns

```
Pattern: Controlled Input
├── State: const [value, setValue] = useState('')
├── Bind: value={value}
├── Update: onChange={(e) => setValue(e.target.value)}
└── Use: React controls the value

Pattern: Form Submission
├── Prevent: e.preventDefault()
├── Validate: Check form data
├── Submit: Send data to parent
└── Clear: Reset form state

Pattern: List Rendering
├── Map: array.map((item) => ...)
├── Key: key={item.id}
├── Render: Return component
└── Pass: Pass item as prop

Pattern: Conditional Rendering
├── Ternary: condition ? true : false
├── AND: condition && component
├── If: if (...) return component
└── Switch: switch statement
```

---

## 🚀 Code Examples

### Example 1: Form Input (Controlled Component)
```jsx
const [name, setName] = useState('');

<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Example 2: Button Click (Event Handler)
```jsx
const handleClick = () => {
  console.log('Clicked!');
};

<button onClick={handleClick}>Click Me</button>
```

### Example 3: Add to Array (State Update)
```jsx
const [items, setItems] = useState([]);

const addItem = (item) => {
  setItems([...items, item]);
};
```

### Example 4: Remove from Array (Filter)
```jsx
const removeItem = (id) => {
  setItems(items.filter(item => item.id !== id));
};
```

### Example 5: Render List (Map with Key)
```jsx
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}
```

### Example 6: Conditional Rendering
```jsx
{items.length === 0 ? (
  <p>No items</p>
) : (
  <ul>{items.map(...)}</ul>
)}
```

### Example 7: Form Submission
```jsx
const handleSubmit = (e) => {
  e.preventDefault();  // Prevent page reload
  onAddItem(formData);  // Send to parent
  resetForm();         // Clear form
};

<form onSubmit={handleSubmit}>
```

### Example 8: Callback to Parent
```jsx
// Parent passes callback
<Child onDelete={handleDelete} />

// Child calls callback
<button onClick={() => onDelete(id)}>Del</button>
```

---

## 📚 File-to-Concept Mapping

```
App.jsx
├─ CONCEPTS: State, Props, Events, Components
├─ Shows: Multiple state variables
├─ Shows: Passing state to children
├─ Shows: Event handlers (add, delete, search)
└─ Shows: Conditional rendering

StudentForm.jsx
├─ CONCEPTS: Controlled components, Forms, Validation
├─ Shows: Form field state
├─ Shows: Form validation
├─ Shows: Form submission
└─ Shows: Props (callbacks)

StudentList.jsx
├─ CONCEPTS: Props, Array.map(), Conditional rendering
├─ Shows: Props receiving
├─ Shows: List rendering
├─ Shows: Empty state
└─ Shows: Component composition

StudentCard.jsx
├─ CONCEPTS: Props, Events, Dynamic styling
├─ Shows: Props destructuring
├─ Shows: Event handlers (edit, delete)
├─ Shows: Dynamic styling
└─ Shows: Callback to parent

Statistics.jsx
├─ CONCEPTS: Props, Array methods
├─ Shows: Props receiving
├─ Shows: Array.map() usage
├─ Shows: Computed values
└─ Shows: Component composition
```

---

## 💾 State Update Examples

```
// Simple value
setCount(count + 1);

// Object
setUser({ ...user, name: 'John' });

// Array - Add
setItems([...items, newItem]);

// Array - Remove
setItems(items.filter(i => i.id !== id));

// Array - Update
setItems(items.map(i => i.id === id ? newData : i));

// Functional update (use prev state)
setState(prev => prev + 1);

// Multiple related updates
setState(prev => ({
    ...prev,
    field1: newValue,
    field2: anotherValue
}));
```

---

## 🔍 Debugging Tips

```
Problem: Component not re-rendering
Solution: 
├─ Check if state is being updated
├─ Check if using immutable updates
├─ Check if state is actually changing
└─ Use React DevTools to inspect

Problem: Props not updating
Solution:
├─ Check if parent state is updating
├─ Check if props are being passed
├─ Check prop name spelling
└─ Use console.log(props)

Problem: Form not clearing
Solution:
├─ Check if resetForm() is being called
├─ Check if state is being reset
└─ Check form input controlled properly

Problem: Search not working
Solution:
├─ Check if searchTerm state updating
├─ Check filter logic
├─ Check toLowerCase() on both sides
└─ Use console.log() to debug

Problem: Delete not working
Solution:
├─ Check if id is unique
├─ Check if filter logic is correct
├─ Check if event handler is called
└─ Check if callback is passed
```

---

## 📞 Quick Reference

| Need | Use | Example |
|------|-----|---------|
| Store data | useState | `const [data, setData] = useState()` |
| Pass data | Props | `<Child student={student} />` |
| Listen to input | onChange | `onChange={handleChange}` |
| Listen to click | onClick | `onClick={handleClick}` |
| Render list | .map() | `items.map(item => ...)` |
| Filter data | .filter() | `items.filter(x => x.id)` |
| Find item | .find() | `items.find(x => x.id)` |
| Add to array | Spread | `[...array, item]` |
| Remove from array | .filter() | `array.filter(x => x.id !== id)` |
| Update item | .map() | `array.map(x => x.id === id ? new : x)` |
| Show conditionally | ? : | `condition ? comp : null` |
| Run after render | useEffect | `useEffect(() => {}, [])` |

---

**This guide covers all React concepts used in the Student Management System!**

**Use this as a quick reference while learning and building! 🚀**
