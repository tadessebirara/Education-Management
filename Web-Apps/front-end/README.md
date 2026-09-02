# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```



📋 Role-Based Sidebar Menu Structure
ADMIN (System Administrator)
text
├── 📊 Dashboard
├── 👥 Users
├── 🏛️ Departments
├── 📚 Programs
├── 👨‍🎓 Students
├── 👨‍🏫 Instructors
├── 📖 Courses
├── 📋 Sections
├── 📅 Timetable
├── 📝 Attendance
├── 📊 Assessments
├── 📈 Reports
├── 🔔 Announcements
├── 📋 System Logs
├── ⚙️ Settings
└── 📁 File Manager
REGISTRAR
text
├── 📊 Dashboard
├── 👨‍🎓 Students
├── 📚 Programs
├── 📖 Courses
├── 📋 Sections
├── 📝 Enrollments
├── 📅 Timetable
├── 📊 Assessments
├── 📈 Reports
├── 🔔 Announcements
└── 📋 Audit Logs
INSTRUCTOR
text
├── 📊 Dashboard
├── 📖 My Courses
├── 📋 My Sections
├── 📝 Attendance
├── 📊 Assessments
├── 📈 Grades
├── 📅 Timetable
├── 👨‍🎓 Students
├── 🔔 Announcements
└── 📈 Reports
STUDENT
text
├── 📊 Dashboard
├── 📖 My Courses
├── 📅 Timetable
├── 📝 Attendance
├── 📈 Grades
├── 💰 Fees
├── 👤 Profile
├── 🔔 Announcements
└── 📈 My Reports
FINANCE
text
├── 📊 Dashboard
├── 💰 Fees
├── 💳 Payments
├── 👨‍🎓 Students
├── 📈 Financial Reports
├── 🔔 Announcements
└── 📋 Audit Logs
