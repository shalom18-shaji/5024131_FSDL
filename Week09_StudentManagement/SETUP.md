# 🚀 QUICK START GUIDE

## Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install React, React-DOM, Vite, and other dependencies from `package.json`.

### 2. Start Development Server
```bash
npm run dev
```

The app will automatically open at `http://localhost:5173`

### 3. View the Application
- Open your browser
- Navigate to `http://localhost:5173`
- Start managing students!

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot reload.

### Build
```bash
npm run build
```
Creates an optimized production build in the `dist/` folder.

### Preview
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Check code for ESLint errors.

## Project Structure

```
Week09_StudentManagement/
├── src/
│   ├── components/           # React components
│   │   ├── StudentForm.jsx    # Form component (for adding/editing)
│   │   ├── StudentList.jsx    # List container component
│   │   ├── StudentCard.jsx    # Individual student card component
│   │   └── Statistics.jsx     # Statistics display component
│   ├── styles/
│   │   └── App.css            # All styling
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── README.md                  # Project overview
├── CONCEPTS_GUIDE.md          # Detailed React concepts explanation
└── SETUP.md                   # This file

```

## Features to Try

1. **Add a Student**
   - Fill out the form on the left
   - Click "Add Student"
   - New student appears in the list

2. **Edit a Student**
   - Click "Edit" on any student card
   - Form pre-populates with student data
   - Click "Update Student" to save changes

3. **Delete a Student**
   - Click "Delete" on any student card
   - Confirm the deletion
   - Student is removed from the list

4. **Search Students**
   - Type in the search box
   - List filters in real-time by name, email, or course

5. **View Statistics**
   - Total students count updates automatically
   - Active courses list shows all unique courses
   - Stats cards update when data changes

## Form Validation

The form includes validation for:
- **Name**: Required field
- **Email**: Required and must contain "@"
- **Course**: Must select a course

## Browser Compatibility

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## Troubleshooting

### Port Already in Use
If port 5173 is already in use:
```bash
npm run dev -- --port 3000
```

### Node Modules Issues
```bash
rm -rf node_modules package-lock.json
npm install
```

### Module Not Found Error
Make sure you're in the correct directory:
```bash
cd Week09_StudentManagement
npm install
npm run dev
```

## Learning Resources

- 📖 [CONCEPTS_GUIDE.md](./CONCEPTS_GUIDE.md) - Comprehensive React concepts explanation
- 📖 [README.md](./README.md) - Project overview and code examples
- 🔗 [React Documentation](https://react.dev)
- 🔗 [Vite Documentation](https://vitejs.dev)

## Next Steps After Setup

1. **Explore the Code**
   - Read comments in each component
   - Understand how data flows through components
   - Notice the state management patterns

2. **Experiment**
   - Add a new field to the form
   - Create a new component
   - Add new features (like sorting)

3. **Practice**
   - Try building similar components
   - Create a new React project
   - Implement CRUD operations from scratch

## Need Help?

- Check the CONCEPTS_GUIDE.md for detailed explanations
- Review code comments in each file
- Look at how each concept is implemented
- Experiment and try different approaches

---

**Happy Learning! 🚀**
