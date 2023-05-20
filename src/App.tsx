import React, { useState } from 'react';
import DraggableDiv from './DraggableComponent';
import TreeComponent, { TreeNode } from './TreeComponent';
import Tree from './New/Other';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const initialTree: TreeNode = {
  id: 1,
  name: 'Root',
  children: [
    {
      id: 2,
      name: 'Node 1',
      children: [
        {
          id: 3,
          name: 'Node 1.1',
          children: [],
        },
        {
          id: 4,
          name: 'Node 1.2',
          children: [],
        },
      ],
    },
    {
      id: 5,
      name: 'Node 2',
      children: [],
    },
  ],
};


const App: React.FC = () => {
  const [nodes, setNodes] = useState<{ id: number; name: string }[]>([]);
  const [nextNodeId, setNextNodeId] = useState(0);
  const [showHints, setShowHints] = useState(true);

  const handleNodeCreate = () => {
    const newNode = { id: nextNodeId, name: 'New Node' };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    setNextNodeId((prevNodeId) => prevNodeId + 1);
  };

  const handleNodeSave = (id: number, name: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === id ? { ...node, name } : node))
    );
  };

  const handleHintsToggle = () => {
    setShowHints((prevState) => !prevState);
  };

  // // <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  // {/* <DraggableDiv name="Draggable Div" /> */ }
  //   {/* <Tree />
  //   <DndProvider backend={HTML5Backend}>
  //     <Tree />
  //   </DndProvider> */}
  return (
    <div style={{ position: 'relative' }}>
      <header style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f3f3f3', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)' }}>
        <h1 style={{ fontSize: '32px', color: '#333' }}>Cool App Name</h1>
        <p style={{ color: '#666' }}>An awesome app for organizing and managing draggable nodes!</p>
      </header>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <button onClick={handleHintsToggle} style={{ padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>

      <div style={{ position: 'relative' }}>
        <button onClick={() => setNodes([])}>Reset</button>
        <button onClick={handleNodeCreate}>Create Node</button>
        {nodes.map((node) => (
          <DraggableDiv
            key={node.id}
            id={node.id}
            name={node.name}
            onNodeSave={handleNodeSave}
          />
        ))}

        {showHints && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#f3f3f3',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
            }}
          >
            <p style={{ color: '#666' }}>To create a new node:</p>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
              <li>Click the "Create Node" button</li>
              <li>A new draggable node will appear on the screen</li>
              <li>You can drag the node around by clicking and dragging it</li>
              <li>Double-click the node to edit its name</li>
              <li>Click the "Save" button to save the changes</li>
            </ul>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default App; 