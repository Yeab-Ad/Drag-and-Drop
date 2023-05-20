# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

import React, { useState } from 'react';
import DraggableDiv from './DraggableComponent';
import TreeComponent, { TreeNode } from './TreeComponent';
import { FaGlobe, FaGithub } from 'react-icons/fa';
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
// {/_ <DraggableDiv name="Draggable Div" /> _/ }
// {/_ <Tree />
// <DndProvider backend={HTML5Backend}>
// <Tree />
// </DndProvider> _/}
return (
<div >
<header
style={{
          textAlign: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, rgb(245 0 79) 0%, rgb(24 53 157) 100%)',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
          color: '#fff',
        }} >
<h1 style={{ fontSize: '32px', margin: '0', letterSpacing: '2px' }}>Node Effect✌</h1>
<p style={{ fontSize: '16px', margin: '10px 0', fontWeight: 'bold' }}>
An awesome app for organizing and managing draggable nodes!
</p>
</header>

      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <a
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#555',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            marginRight: '10px',
            background: '#ddd',
            padding: '8px',
            borderRadius: '6px',
          }}
        >
          <FaGlobe size={16} style={{ marginRight: '5px' }} />
          Visit Creator's Website
        </a>
        <a
          href="https://github.com/example"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#555',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            background: '#ddd',
            padding: '8px',
            borderRadius: '6px',
          }}
        >
          <FaGithub size={16} style={{ marginRight: '5px' }} />
          GitHub Repository
        </a>
      </div>

      <div style={{ textAlign: 'center', margin: '20px 0', position: 'sticky', marginLeft: '14px', top: "14px" }}>
        <button onClick={handleHintsToggle} style={{ padding: '10px 20px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>
      </div>

      <div style={{ width: "max-content", position: 'sticky', marginLeft: '14px', top: "14px" }}>

        <button onClick={() => setNodes([])} style={{ padding: '10px 20px', background: '#f44336', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', marginRight: '10px' }}>
          Reset
        </button>
        <button onClick={handleNodeCreate} style={{ padding: '10px 20px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Create Node
        </button>

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
