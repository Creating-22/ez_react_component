export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  isExpanded?: boolean;
  isLoading?: boolean;
}

export type TreeData = TreeNode[];

export type TreeAction =
  | { type: 'TOGGLE_EXPAND'; payload: { id: string } }
  | { type: 'SET_LOADING'; payload: { id: string; isLoading: boolean } }
  | { type: 'SET_CHILDREN'; payload: { parentId: string; children: TreeNode[] } }
  | { type: 'ADD_CHILD'; payload: { parentId: string; name: string } }
  | { type: 'UPDATE_NAME'; payload: { id: string; name: string } }
  | { type: 'REMOVE_NODE'; payload: { id: string } };