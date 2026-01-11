// src/data/mockKanbanData.ts
import { KanbanState } from '../components/kanban/types';
import { v4 as uuidv4 } from 'uuid';

export const initialKanbanState: KanbanState = {
  columns: {
    todo: {
      id: 'todo',
      title: 'Todo',
      cardIds: ['card-1', 'card-2'],
    },
    inprogress: {
      id: 'inprogress',
      title: 'In Progress',
      cardIds: ['card-3'],
    },
    done: {
      id: 'done',
      title: 'Done',
      cardIds: ['card-4'],
    },
  },
  cards: {
    'card-1': { id: 'card-1', title: 'Setup project structure' },
    'card-2': { id: 'card-2', title: 'Implement Tree View' },
    'card-3': { id: 'card-3', title: 'Add drag & drop' },
    'card-4': { id: 'card-4', title: 'Write documentation' },
  },
  columnOrder: ['todo', 'inprogress', 'done'],
};