// src/components/tree-view/treeReducer.ts
import { TreeData, TreeNode, TreeAction } from './types';
import { v4 as uuidv4 } from 'uuid';

// Helper: Deep immutable update of any node by ID (recursive)
function updateNodeDeep(
  nodes: TreeNode[],
  targetId: string,
  updater: (node: TreeNode) => TreeNode
): TreeNode[] {
  return nodes.map(node => {
    if (node.id === targetId) {
      return updater({ ...node });
    }
    if (node.children?.length) {
      return {
        ...node,
        children: updateNodeDeep(node.children, targetId, updater),
      };
    }
    return node;
  });
}

// Helper: Deep immutable remove by ID (recursive)
function removeNodeDeep(nodes: TreeNode[], targetId: string): TreeNode[] {
  return nodes
    .filter(node => node.id !== targetId)
    .map(node => ({
      ...node,
      children: node.children ? removeNodeDeep(node.children, targetId) : undefined,
    }));
}

export const treeReducer = (state: TreeData, action: TreeAction): TreeData => {
  switch (action.type) {
    case 'TOGGLE_EXPAND':
      return updateNodeDeep(state, action.payload.id, node => ({
        ...node,
        isExpanded: !node.isExpanded,
      }));

    case 'SET_LOADING':
      return updateNodeDeep(state, action.payload.id, node => ({
        ...node,
        isLoading: action.payload.isLoading,
      }));

    case 'SET_CHILDREN':
      return updateNodeDeep(state, action.payload.parentId, node => ({
        ...node,
        children: action.payload.children,
        isLoading: false,
        isExpanded: true,
      }));

    case 'ADD_CHILD': {
      const newNode: TreeNode = {
        id: uuidv4(),
        name: action.payload.name,
        children: [],
        isExpanded: false,
        isLoading: false,
      };
      return updateNodeDeep(state, action.payload.parentId, node => ({
        ...node,
        children: [...(node.children || []), newNode],
      }));
    }

    case 'UPDATE_NAME':
      return updateNodeDeep(state, action.payload.id, node => ({
        ...node,
        name: action.payload.name,
      }));

    case 'REMOVE_NODE':
      return removeNodeDeep(state, action.payload.id);

    default:
      return state;
  }
};