// src/components/tree-view/TreeNode.tsx
import { useState } from 'react';
import { TreeNode as INode, TreeAction } from './types';

interface TreeNodeProps {
  node: INode;
  dispatch: React.Dispatch<TreeAction>;
  level?: number;
  isLast?: boolean;
}

export default function TreeNode({
  node,
  dispatch,
  level = 0,
  isLast = false,
}: TreeNodeProps) {
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);

  const hasChildren = (node.children?.length ?? 0) > 0 || node.isLoading;
  const children = node.children ?? [];

  const handleToggle = () => {
    if (!node.isExpanded && !children.length && !node.isLoading) {
      dispatch({ type: 'SET_LOADING', payload: { id: node.id, isLoading: true } });

      setTimeout(() => {
        dispatch({
          type: 'SET_CHILDREN',
          payload: {
            parentId: node.id,
            children: [
              { id: crypto.randomUUID(), name: `Child of ${node.name} - 1` },
              { id: crypto.randomUUID(), name: `Child of ${node.name} - 2` },
            ],
          },
        });
      }, 1200);
    } else {
      dispatch({ type: 'TOGGLE_EXPAND', payload: { id: node.id } });
    }
  };

  const levelColors = [
    'bg-blue-600',
    'bg-green-600',
    'bg-emerald-600',
    'bg-teal-600',
    'bg-cyan-600',
    'bg-indigo-600',
  ];

  const circleColor = levelColors[level % levelColors.length];

  return (
    <div
      className="relative"
      style={{ paddingLeft: level * 32 }} // FIXED indentation
    >
      {/* Connector lines */}
      {level > 0 && (
        <>
          {/* Vertical */}
          <div
            className={`absolute left-4 top-0 w-px bg-gray-300 ${
              isLast ? 'h-5' : 'h-full'
            }`}
          />
          {/* Horizontal */}
          <div className="absolute left-4 top-1/2 w-4 h-px bg-gray-300" />
        </>
      )}

      {/* Node Row */}
      <div className="group flex items-center gap-2 py-1.5 pr-4 hover:bg-gray-50 rounded-md">
        {/* Expand / Collapse */}
        {hasChildren && (
          <button
            onClick={handleToggle}
            disabled={node.isLoading}
            className={`w-4 h-4 flex items-center justify-center text-xs text-gray-600
              transition-transform ${
                node.isExpanded ? 'rotate-90' : ''
              } ${node.isLoading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            ▶
          </button>
        )}

        {/* Node Circle */}
        <div
          className={`w-7 h-7 rounded-full ${circleColor}
          flex items-center justify-center text-white text-xs font-semibold shrink-0`}
        >
          {String.fromCharCode(65 + level)}
        </div>

        {/* Name / Edit */}
        {editing ? (
          <input
            autoFocus
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={() => {
              const trimmed = editName.trim();
              if (trimmed && trimmed !== node.name) {
                dispatch({
                  type: 'UPDATE_NAME',
                  payload: { id: node.id, name: trimmed },
                });
              }
              setEditing(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') e.currentTarget.blur();
              if (e.key === 'Escape') {
                setEditName(node.name);
                setEditing(false);
              }
            }}
            className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <span
            className="flex-1 text-gray-800 font-medium cursor-pointer truncate"
            onDoubleClick={() => {
              setEditName(node.name);
              setEditing(true);
            }}
          >
            {node.name}
          </span>
        )}

        {/* Actions */}
        <div className="ml-auto invisible group-hover:visible flex items-center gap-2">
          <button
            onClick={() => {
              const name = prompt('New node name:');
              if (name?.trim()) {
                dispatch({
                  type: 'ADD_CHILD',
                  payload: { parentId: node.id, name: name.trim() },
                });
              }
            }}
            className="text-green-600 hover:text-green-800 font-bold"
          >
            +
          </button>

          <button
            onClick={() => {
              if (window.confirm(`Delete "${node.name}" and children?`)) {
                dispatch({ type: 'REMOVE_NODE', payload: { id: node.id } });
              }
            }}
            className="text-red-600 hover:text-red-800 font-bold"
          >
            ×
          </button>
        </div>
      </div>

      {/* Children */}
      {node.isExpanded && children.length > 0 && (
        <div className="mt-1">
          {children.map((child, index) => (
            <TreeNode
              key={child.id}
              node={child}
              dispatch={dispatch}
              level={level + 1}
              isLast={index === children.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
