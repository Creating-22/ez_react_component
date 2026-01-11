// src/components/kanban/Card.tsx
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface CardProps {
  card: { id: string; title: string };
  dispatch: React.Dispatch<any>;
}

export default function Card({ card, dispatch }: CardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(card.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleSave = () => {
    if (title.trim() !== card.title) {
      dispatch({
        type: 'UPDATE_CARD_TITLE',
        payload: { cardId: card.id, title: title.trim() },
      });
    }
    setEditing(false);
  };

  const priorityColors = ['border-yellow-500', 'border-orange-500', 'border-green-500'];
  const randomColor = priorityColors[Math.floor(Math.random() * priorityColors.length)];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group relative bg-white p-4 rounded-lg shadow-sm border-l-4 ${randomColor} hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing select-none`}
    >
      {editing ? (
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') {
              setTitle(card.title);
              setEditing(false);
            }
          }}
          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <div className="flex justify-between items-start gap-2">
          {/* Title area – double-click to edit */}
          <p
            className="flex-1 text-sm font-medium text-gray-800 cursor-pointer line-clamp-3"
            onDoubleClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setTitle(card.title);
              setEditing(true);
            }}
          >
            {card.title}
          </p>

          {/* Delete button – completely isolated from drag */}
          <div className="relative z-20 pointer-events-auto">
            <button
              type="button"
              onPointerDown={(e) => {
                e.stopPropagation();           // Block drag start
                e.preventDefault();
              }}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();

                console.log('Delete clicked (single) for card:', card.id);

                if (window.confirm('Delete this card?')) {
                  dispatch({ type: 'DELETE_CARD', payload: { cardId: card.id } });
                }
              }}
              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 text-2xl font-bold transition-opacity"
            >
              🗑
            </button>
          </div>
        </div>
      )}
    </div>
  );
}