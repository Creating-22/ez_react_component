export interface Card {
  id: string;
  title: string;
}

export interface Column {
  id: string;
  title: string;
  cardIds: string[];
}

export interface KanbanState {
  columns: Record<string, Column>;
  cards: Record<string, Card>;
  columnOrder: string[];
}

export type KanbanAction =
  | { type: 'ADD_CARD'; payload: { columnId: string; title: string } }
  | { type: 'DELETE_CARD'; payload: { cardId: string } }
  | { type: 'UPDATE_CARD_TITLE'; payload: { cardId: string; title: string } }
  | {
      type: 'MOVE_CARD';
      payload: {
        cardId: string;
        sourceColumnId: string;
        targetColumnId: string;
        newIndex: number;
      };
    };