// src/App.tsx
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TreeViewPage from './pages/TreeViewPage';
import KanbanPage from './pages/KanbanPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Top Navigation Bar */}
        <nav className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Logo / Brand */}
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">Component Showcase</span>
              </div>

              {/* Navigation Links */}
              <div className="flex space-x-8">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-medium text-sm transition-colors ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/tree"
                  className={({ isActive }) =>
                    `font-medium text-sm transition-colors ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  Tree View
                </NavLink>

                <NavLink
                  to="/kanban"
                  className={({ isActive }) =>
                    `font-medium text-sm transition-colors ${
                      isActive
                        ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                        : 'text-gray-600 hover:text-gray-900'
                    }`
                  }
                >
                  Kanban Board
                </NavLink>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tree" element={<TreeViewPage />} />
            <Route path="/kanban" element={<KanbanPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;