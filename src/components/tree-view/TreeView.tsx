import { useReducer } from 'react';
import TreeNode from './TreeNode';
import { treeReducer } from './treeReducer';
import { TreeData, TreeAction } from './types';

interface TreeViewProps {
  initialData: TreeData;
}

export default function TreeView({ initialData }: TreeViewProps) {
  const [tree, dispatch] = useReducer(treeReducer, initialData);

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-lg">
      {tree.map((node, index) => (
        <TreeNode
          key={node.id}
          node={node}
          dispatch={dispatch}
          level={0}
          isLast={index === tree.length - 1}
        />
      ))}
    </div>
  );
}