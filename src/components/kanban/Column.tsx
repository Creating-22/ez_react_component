import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';
import { Column as ColumnType, Card as CardType } from './types';

interface ColumnProps {
  column: ColumnType;
  cards: CardType[];
  dispatch: React.Dispatch<any>;
}

export default function Column({ column, cards, dispatch }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: column.id });

  const columnColors: Record<string, { bg: string; text: string }> = {
    todo: { bg: 'bg-blue-600', text: 'text-white' },
    inprogress: { bg: 'bg-orange-500', text: 'text-white' },
    done: { bg: 'bg-green-600', text: 'text-white' },
  };

  const color = columnColors[column.id] || { bg: 'bg-gray-600', text: 'text-white' };

  return (
    <div className="flex flex-col w-full md:w-96 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 ${color.bg} ${color.text} rounded-t-xl`}>
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-lg">{column.title}</h3>
          <span className="bg-white/30 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
            {column.cardIds.length}
          </span>
        </div>
        <button
          onClick={() => {
            const title = prompt('New task title:');
            if (title?.trim()) {
              dispatch({
                type: 'ADD_CARD',
                payload: { columnId: column.id, title: title.trim() },
              });
            }
          }}
          className="text-white hover:text-white/80 text-2xl font-bold"
        >
          +
        </button>
      </div>

      {/* Cards + Add button */}
      <div ref={setNodeRef} className="flex-1 p-4 flex flex-col gap-3 bg-gray-50/60">
        <SortableContext items={column.cardIds} strategy={verticalListSortingStrategy}>
          {cards.map(card => (
            <Card key={card.id} card={card} dispatch={dispatch} />
          ))}
        </SortableContext>

        <button
          onClick={() => {
            const title = prompt('New task title:');
            if (title?.trim()) {
              dispatch({
                type: 'ADD_CARD',
                payload: { columnId: column.id, title: title.trim() },
              });
            }
          }}
          className="mt-3 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-all"
        >
          <span className="text-lg">+</span>
          <span className="font-medium">Add Card</span>
        </button>
      </div>
    </div>
  );
}