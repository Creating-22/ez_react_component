// src/components/kanban/KanbanBoard.tsx
import { useReducer } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { kanbanReducer } from './kanbanReducer';
import Column from './Column';
import { initialKanbanState } from '../../data/mockKanbanData'; // Adjust path if needed

export default function KanbanBoard() {
  const [state, dispatch] = useReducer(kanbanReducer, initialKanbanState);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const cardId = active.id as string;
    let sourceColumnId = '';
    let targetColumnId = over.id as string;

    // Find source column
    for (const [colId, col] of Object.entries(state.columns)) {
      if (col.cardIds.includes(cardId)) {
        sourceColumnId = colId;
        break;
      }
    }

    // Find target column (if dropped on card, use its column)
    for (const [colId, col] of Object.entries(state.columns)) {
      if (col.cardIds.includes(over.id as string)) {
        targetColumnId = colId;
        break;
      }
    }

    // Calculate new index
    const targetColumn = state.columns[targetColumnId];
    let newIndex = targetColumn.cardIds.indexOf(over.id as string);
    if (newIndex === -1) {
      newIndex = targetColumn.cardIds.length; // append to end
    }

    // Prevent unnecessary dispatch if same position
    if (
      sourceColumnId === targetColumnId &&
      newIndex === state.columns[sourceColumnId].cardIds.indexOf(cardId)
    ) {
      return;
    }

    dispatch({
      type: 'MOVE_CARD',
      payload: {
        cardId,
        sourceColumnId,
        targetColumnId,
        newIndex,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Kanban Board
      </h1>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={state.columnOrder}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex flex-col md:flex-row gap-6 overflow-x-auto pb-8">
            {state.columnOrder.map((colId) => {
              const column = state.columns[colId];
              const columnCards = column.cardIds
                .map((id) => state.cards[id])
                .filter((card): card is NonNullable<typeof card> => !!card);

              return (
                <Column
                  key={colId}
                  column={column}
                  cards={columnCards}
                  dispatch={dispatch}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}