import React, { useState } from 'react';
import DraggableDiv from './DraggableComponent';
import {
  FaSun,
  FaMoon
} from 'react-icons/fa';
import TreeComponent, { TreeNode } from './TreeComponent';
import Tree from './New/Other';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FooterLink } from './FooterLink';

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
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const handleModeToggle = () => {
    setIsDarkMode((prevState) => !prevState);
  };

  return (
    <div style={{
      minHeight: "200vh", position: 'relative',
      background: isDarkMode ? '#222' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
    }}>
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          background: isDarkMode ? '#000' : '#000',
          color: '#fff',
        }}
      >
        <h1 style={{ fontSize: '36px', margin: '0', letterSpacing: '2px', fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 3px rgba(0, 0, 0, 0.3)' }}>
          Node Effect✌
        </h1>
        <p style={{ fontSize: '18px', margin: '10px 0', fontWeight: 'bold', maxWidth: '400px', textAlign: 'center' }}>
          An awesome app for organizing and managing draggable nodes!
        </p>

        <p style={{
          position: 'absolute',
          top: '5px',
          right: '18px',
          fontSize: '12px',
          fontFamily: 'monospace',
          letterSpacing: '-0.5px',
        }}>Version 1.10</p>

        <p style={{
          position: 'absolute',
          top: '5px',
          left: '18px',
          fontSize: '12px',
          fontFamily: 'monospace',
          letterSpacing: '-0.5px',
        }}>By Yeab Ad</p>

      </header>


      <div style={{ width: "max-content", zIndex: '11111', textAlign: 'center', float: 'right', margin: '20px 20px 20px 14px', position: 'sticky', marginLeft: '14px', top: "14px" }}>
        <button
          onClick={handleHintsToggle}
          style={{
            padding: '10px 20px',
            // background: '#007AFF',
            background: isDarkMode ? '#007AFF' : '#222',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          }}
        >
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>


      <div style={{ position: 'sticky', margin: '20px 20px 20px 14px', top: "14px" }}>

        <button
          onClick={() => setNodes([])}
          style={{
            padding: '10px 20px',
            // background: '#eee',
            background: isDarkMode ? '#666' : '#eee',
            color: isDarkMode ? "#fff" : '#000',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            marginRight: '10px',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          Reset
        </button>
        <button
          onClick={handleNodeCreate}
          style={{
            padding: '10px 20px',
            // background: '#000',
            background: isDarkMode ? '#007AFF' : '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          Create Node
        </button>
        {nodes.map((node) => (
          <DraggableDiv
            key={node.id}
            id={node.id}
            name={node.name}
            onNodeSave={handleNodeSave}
            onNodeDelete={(id) => {
              setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
            }}
          />
        ))}

        {showHints && (
          <div
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              // backgroundColor: '#f3f3f3',
              backgroundColor: isDarkMode ? '#363636' : '#f3f3f3',
              padding: '10px',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
              color: isDarkMode ? '#fff' : '#666',
            }}
          >
            <p style={{ color: isDarkMode ? '#fff' : '#666' }}>To create a new node:</p>
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

      {/* info */}

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >


        <FooterLink link="https://www.example.com" type='website' name="Yeab-Ad" />
        <FooterLink link="https://github.com/example" type='git' name="GitHub ❤" />
        <label
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={handleModeToggle}
            style={{ display: 'none' }}
          />
          <div
            style={{
              width: '40px',
              height: '24px',
              background: isDarkMode ? '#888' : '#ddd',
              borderRadius: '12px',
              position: 'relative',
              transition: 'background-color 0.3s ease',
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '2px',
                left: isDarkMode ? '-7%' : '2px',
                transform: isDarkMode ? 'translateX(100%)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
              }}
            ></div>
          </div>
          <div style={{ marginLeft: '5px' }}>
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </div>
        </label>
      </div>

    </div>
    // </div>
  );
};

export default App; 