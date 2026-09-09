import React from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  children?: FileNode[];
}

const MOCK_FILES: FileNode[] = [
  {
    name: 'src',
    type: 'directory',
    children: [
      { name: 'components', type: 'directory', children: [
        { name: 'Button.tsx', type: 'file' },
        { name: 'Input.tsx', type: 'file' },
      ]},
      { name: 'App.tsx', type: 'file' },
      { name: 'main.tsx', type: 'file' },
    ],
  },
  {
    name: 'package.json',
    type: 'file',
  },
  {
    name: 'tsconfig.json',
    type: 'file',
  },
];

interface FileTreeProps {
  files: FileNode[];
  onSelectFile: (path: string) => void;
}

const FileTreeNode: React.FC<{ node: FileNode; depth: number; path: string; onSelectFile: (path: string) => void }> = ({ node, depth, path, onSelectFile }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const currentPath = `${path}/${node.name}`;

  if (node.type === 'directory') {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center gap-1 px-2 py-1 hover:bg-dark-700 rounded transition-colors text-left"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          <svg className={`w-4 h-4 text-dark-500 transition-transform ${isExpanded ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
          </svg>
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
          <span className="text-sm text-dark-300">{node.name}</span>
        </button>
        {isExpanded && node.children?.map((child, index) => (
          <FileTreeNode key={index} node={child} depth={depth + 1} path={currentPath} onSelectFile={onSelectFile} />
        ))}
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelectFile(currentPath)}
      className="w-full flex items-center gap-1 px-2 py-1 hover:bg-dark-700 rounded transition-colors text-left"
      style={{ paddingLeft: `${depth * 12 + 8}px` }}
    >
      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
      </svg>
      <span className="text-sm text-dark-300">{node.name}</span>
    </button>
  );
};

export const FilePanel: React.FC = () => {
  const handleSelectFile = (path: string) => {
    console.log('Selected file:', path);
  };

  return (
    <div className="h-full bg-dark-900 border-r border-dark-700 w-56 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-dark-700 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Files</h3>
        <button className="text-dark-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {MOCK_FILES.map((file, index) => (
          <FileTreeNode key={index} node={file} depth={0} path="" onSelectFile={handleSelectFile} />
        ))}
      </div>
    </div>
  );
};
