import TreeView from '../components/tree-view/TreeView';
import { initialTree } from '../data/mockTreeData';

export default function TreeViewPage() {
  return (
    <div className="p-6">


      <TreeView initialData={initialTree} />
    </div>
  );
}