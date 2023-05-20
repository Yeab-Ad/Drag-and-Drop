import React, { useState } from 'react';

export interface TreeNode {
    id: number;
    name: string;
    children: TreeNode[];
}

interface DraggableTreeNodeProps {
    node: TreeNode;
    onNodeRename: (nodeId: number, newName: string) => void;
    onCreateChildNode: (parentNode: TreeNode) => void;
}

const DraggableTreeNode: React.FC<DraggableTreeNodeProps> = ({
    node,
    onNodeRename,
    onCreateChildNode,
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(node.name);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStartPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging && event.buttons === 1) {
            const dx = event.clientX - dragStartPos.x;
            const dy = event.clientY - dragStartPos.y;
            setPosition((prevPosition) => ({
                x: prevPosition.x + dx,
                y: prevPosition.y + dy,
            }));
            setDragStartPos({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        onNodeRename(node.id, newName);
    };

    const handleCreateChildClick = () => {
        const childName = prompt('Enter a name for the new component:');
        if (childName) {
            const childNode: TreeNode = {
                id: Date.now(),
                name: childName,
                children: [],
            };
            onCreateChildNode(childNode);
        }
    };

    const getHorizontalDistance = (currentNode: TreeNode, rootId: number): number => {
        let distance = 0;
        let parent = currentNode;
        while (parent.id !== rootId) {
            distance += 10; // Adjust the distance per level
            parent = findParentNode(node, parent.id)!;
        }
        return distance;
    };

    const findParentNode = (currentNode: TreeNode, nodeId: number): TreeNode | null => {
        if (currentNode.id === nodeId) {
            return null;
        }
        for (const child of currentNode.children) {
            if (child.id === nodeId) {
                return currentNode;
            }
            const foundNode = findParentNode(child, nodeId);
            if (foundNode) {
                return foundNode;
            }
        }
        return null;
    };

    const rootId = 1; // Assuming root node ID is 1

    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                transition: 'box-shadow 0.3s ease',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div
                style={{
                    background: '#f3f3f3',
                    border: '1px solid #ccc',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: isDragging ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 5px rgba(0, 0, 0, 0.3)',
                    position: 'relative', // Add position relative for positioning pseudo-elements

                    // Add styles for connection visualization
                    borderLeft: node.id !== 1 ? 'none' : '1px solid #ccc', // Only root node has left border
                    paddingLeft: node.id !== 1 ? '10px' : '0', // Adjust left padding for connected nodes
                }}
            >
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={newName}
                            onChange={handleInputChange}
                            autoFocus
                            style={{
                                width: '100%',
                                marginBottom: '10px',
                                padding: '5px',
                                border: '1px solid #ccc',
                                borderRadius: '3px',
                            }}
                        />
                        <button
                            onClick={handleSaveClick}
                            style={{
                                padding: '5px 10px',
                                background: '#4caf50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '3px',
                                cursor: 'pointer',
                            }}
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <div onDoubleClick={handleDoubleClick}>{newName}</div>
                )}
                <button
                    onClick={handleCreateChildClick}
                    style={{
                        marginTop: '10px',
                        padding: '5px 10px',
                        background: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                    }}
                >
                    Create Child
                </button>

                {node.id !== rootId && (
                    <div
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '-10px', // Adjust the position of the connection line
                            width: `${getHorizontalDistance(node, rootId)}px`, // Calculate the width based on horizontal distance
                            height: '1px',
                            background: '#ccc',
                            transform: 'translateY(-50%)',
                        }}
                    />
                )}

                {node.children.map((childNode) => (
                    <DraggableTreeNode
                        key={childNode.id}
                        node={childNode}
                        onNodeRename={onNodeRename}
                        onCreateChildNode={onCreateChildNode}
                    />
                ))}
            </div>
        </div>
    );
};

interface TreeComponentProps {
    initialTree: TreeNode;
}

const TreeComponent: React.FC<TreeComponentProps> = ({ initialTree }) => {
    const [tree, setTree] = useState<TreeNode>(initialTree);

    const handleNodeRename = (nodeId: number, newName: string) => {
        const updatedTree = updateTreeNode(tree, nodeId, newName);
        setTree(updatedTree);
    };

    const handleCreateChildNode = (parentNode: TreeNode) => {
        const childName = prompt('Enter a name for the new component:');
        if (childName) {
            const childNode: TreeNode = {
                id: Date.now(),
                name: childName,
                children: [],
            };
            const updatedTree = addChildNode(tree, parentNode, childNode);
            setTree(updatedTree);
        }
    };

    const updateTreeNode = (node: TreeNode, nodeId: number, newName: string): TreeNode => {
        if (node.id === nodeId) {
            return { ...node, name: newName };
        }
        return {
            ...node,
            children: node.children.map((childNode) => updateTreeNode(childNode, nodeId, newName)),
        };
    };

    const addChildNode = (node: TreeNode, parentNode: TreeNode, childNode: TreeNode): TreeNode => {
        if (node.id === parentNode.id) {
            return { ...node, children: [...node.children, childNode] };
        }
        return {
            ...node,
            children: node.children.map((child) => addChildNode(child, parentNode, childNode)),
        };
    };

    return (
        <div>
            <div>
                <button
                    onClick={() => handleCreateChildNode(initialTree)}
                    style={{
                        padding: '5px 10px',
                        background: '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        marginBottom: '10px',
                    }}
                >
                    Create New
                </button>
            </div>
            <div className="tree-container">
                <DraggableTreeNode
                    node={tree}
                    onNodeRename={handleNodeRename}
                    onCreateChildNode={handleCreateChildNode}
                />
            </div>
        </div>
    );
};

export default TreeComponent;
