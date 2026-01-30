# Todo App - Frontend

React frontend for the Todo Application.

## Features

- ✅ User authentication (Login/Register)
- ✅ Dashboard with all boards
- ✅ Board detail page with todos
- ✅ Create, edit, delete boards
- ✅ Create, edit, delete, toggle todos
- ✅ Filter todos (All, Active, Completed)
- ✅ Priority levels and due dates
- ✅ Responsive design
- ✅ Modern UI with smooth animations

## Tech Stack

- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Styling**: Pure CSS

## Folder Structure

```
src/
├── components/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Board/
│   │   ├── BoardCard.jsx
│   │   └── CreateBoard.jsx
│   ├── Todo/
│   │   ├── TodoItem.jsx
│   │   └── CreateTodo.jsx
│   └── Common/
│       └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Dashboard.jsx
│   └── BoardDetail.jsx
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── boardService.js
│   └── todoService.js
├── context/
│   └── AuthContext.jsx
├── styles/
│   ├── App.css
│   ├── Auth.css
│   ├── Board.css
│   ├── BoardDetail.css
│   ├── Common.css
│   ├── Dashboard.css
│   ├── Home.css
│   ├── Modal.css
│   └── Todo.css
├── App.jsx
└── index.js
```

## Installation

### Prerequisites

- Node.js (v14 or higher)
- Backend API running on http://localhost:4000

### Steps

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create `.env` file**:
   ```
   REACT_APP_API_URL=http://localhost:4000/api
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

The app will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (one-way operation)

## Features Walkthrough

### 1. Authentication
- Users can register with name, email, and password
- Login with email and password
- JWT token stored in localStorage
- Protected routes redirect to login if not authenticated

### 2. Dashboard
- View all user's boards
- Create new boards
- Edit existing boards
- Delete boards (with confirmation)
- Click on board to view todos

### 3. Board Detail
- View all todos in a board
- Statistics (Total, Active, Completed)
- Filter todos by status
- Create new todos
- Edit/Delete todos
- Toggle todo completion
- Back to dashboard

### 4. Todos
- Title, description, priority, due date
- Visual priority badges (High/Medium/Low)
- Checkbox to mark complete
- Strikethrough for completed todos
- Click to edit

## API Integration

All API calls are centralized in the `services` folder:

- **authService.js** - Register, Login, Get current user
- **boardService.js** - CRUD operations for boards
- **todoService.js** - CRUD operations for todos
- **api.js** - Axios instance with interceptors

The Axios instance automatically adds JWT token to all requests.

## State Management

Uses React Context API for global state:

- **AuthContext** - User authentication state
  - `user` - Current user object
  - `loading` - Loading state
  - `login()` - Login function
  - `register()` - Register function
  - `logout()` - Logout function
  - `isAuthenticated` - Boolean auth status

## Styling

Pure CSS with custom styles for:
- Responsive design
- Smooth animations
- Modern gradient buttons
- Card-based layouts
- Modal dialogs
- Form inputs

## Environment Variables

```
REACT_APP_API_URL=http://localhost:4000/api
```

Change the URL if your backend runs on a different port.

## Build for Production

```bash
npm run build
```

Creates optimized production build in the `build` folder.

## Deployment

The app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Make sure to update the `REACT_APP_API_URL` environment variable to point to your production backend.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
