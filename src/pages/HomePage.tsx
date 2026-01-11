// src/pages/HomePage.tsx
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
      {/* Header / Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Interactive Components Showcase
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
          Explore Tree View and Kanban Board – built with React, TypeScript, Tailwind & dnd-kit
        </p>
      </div>

      {/* Buttons Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* Tree View Button */}
        <Link
          to="/tree"
          className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-bold text-white/90 group-hover:text-white transition-colors">
              🌳
            </span>
          </div>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Tree View</h2>
            <p className="text-gray-600 mb-6">
              Hierarchical structure with expand/collapse, CRUD, lazy loading & drag-and-drop
            </p>
            <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-blue-700 transition-colors">
              Explore Tree View →
            </span>
          </div>
        </Link>

        {/* Kanban Board Button */}
        <Link
          to="/kanban"
          className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="h-48 bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
            <span className="text-6xl md:text-7xl font-bold text-white/90 group-hover:text-white transition-colors">
              📋
            </span>
          </div>
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Kanban Board</h2>
            <p className="text-gray-600 mb-6">
              Task management with drag-and-drop, columns, add/delete & inline editing
            </p>
            <span className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium group-hover:bg-green-700 transition-colors">
              Explore Kanban Board →
            </span>
          </div>
        </Link>
      </div>

     
    </div>
  );
}