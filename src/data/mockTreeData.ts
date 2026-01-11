// src/data/mockTreeData.ts
import { TreeData } from '../components/tree-view/types';

export const initialTree: TreeData = [
  {
    id: 'root-1',
    name: 'Project Root',
    isExpanded: true,
    children: [
      {
        id: 'docs-1',
        name: 'Documents',
        isExpanded: false,
        children: [
          {
            id: 'docs-1-1',
            name: 'Requirements',
            isExpanded: false,
          },
          {
            id: 'docs-1-2',
            name: 'Design Specs',
            isExpanded: false,
          },
          {
            id: 'docs-1-3',
            name: 'Meeting Notes',
            isExpanded: false,
            children: [
              { id: 'notes-1', name: 'Sprint 1 Review' },
              { id: 'notes-2', name: 'Sprint 2 Planning' },
            ],
          },
        ],
      },
      {
        id: 'assets-1',
        name: 'Assets',
        isExpanded: true,
        children: [
          {
            id: 'assets-1-1',
            name: 'Images',
            isExpanded: false,
          },
          {
            id: 'assets-1-2',
            name: 'Icons',
            isExpanded: false,
          },
          {
            id: 'assets-1-3',
            name: 'Fonts',
            isExpanded: false,
          },
        ],
      },
      {
        id: 'src-1',
        name: 'Source Code',
        isExpanded: false,
        children: [
          {
            id: 'src-1-1',
            name: 'components',
            isExpanded: false,
          },
          {
            id: 'src-1-2',
            name: 'pages',
            isExpanded: false,
          },
          {
            id: 'src-1-3',
            name: 'utils',
            isExpanded: false,
          },
        ],
      },
    ],
  },
  {
    id: 'archive-1',
    name: 'Archive',
    isExpanded: false,
    children: [
      {
        id: 'archive-1-1',
        name: 'Old Designs',
        isExpanded: false,
      },
      {
        id: 'archive-1-2',
        name: 'Deprecated Features',
        isExpanded: false,
      },
    ],
  },
  {
    id: 'root-2',
    name: 'Legacy Projects',
    isExpanded: false,
  },
];