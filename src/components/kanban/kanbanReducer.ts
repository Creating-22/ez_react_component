import { KanbanState, KanbanAction } from './types';

export const kanbanReducer = (state: KanbanState, action: KanbanAction): KanbanState => {
  switch (action.type) {
    case 'ADD_CARD': {
      const newCardId = `card-${Date.now()}`;
      return {
        ...state,
        cards: {
          ...state.cards,
          [newCardId]: { id: newCardId, title: action.payload.title },
        },
        columns: {
          ...state.columns,
          [action.payload.columnId]: {
            ...state.columns[action.payload.columnId],
            cardIds: [...state.columns[action.payload.columnId].cardIds, newCardId],
          },
        },
      };
    }

    case 'DELETE_CARD': {
      const { cardId } = action.payload;
      const newCards = { ...state.cards };
      delete newCards[cardId];

      const newColumns = { ...state.columns };
      Object.keys(newColumns).forEach(colId => {
        newColumns[colId] = {
          ...newColumns[colId],
          cardIds: newColumns[colId].cardIds.filter(id => id !== cardId),
        };
      });

      return { ...state, cards: newCards, columns: newColumns };
    }

    case 'UPDATE_CARD_TITLE': {
      const { cardId, title } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: { ...state.cards[cardId], title },
        },
      };
    }

    case 'MOVE_CARD': {
      const { cardId, sourceColumnId, targetColumnId, newIndex } = action.payload;

      if (sourceColumnId === targetColumnId) {
        const column = state.columns[sourceColumnId];
        const newCardIds = [...column.cardIds];
        const oldIndex = newCardIds.indexOf(cardId);
        newCardIds.splice(oldIndex, 1);
        newCardIds.splice(newIndex, 0, cardId);

        return {
          ...state,
          columns: {
            ...state.columns,
            [sourceColumnId]: { ...column, cardIds: newCardIds },
          },
        };
      }

      const source = state.columns[sourceColumnId];
      const target = state.columns[targetColumnId];

      const newSourceIds = source.cardIds.filter(id => id !== cardId);
      const newTargetIds = [...target.cardIds];
      newTargetIds.splice(newIndex, 0, cardId);

      return {
        ...state,
        columns: {
          ...state.columns,
          [sourceColumnId]: { ...source, cardIds: newSourceIds },
          [targetColumnId]: { ...target, cardIds: newTargetIds },
        },
      };
    }

    default:
      return state;
  }
};