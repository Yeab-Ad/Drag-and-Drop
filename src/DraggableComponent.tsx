import React, { useState } from 'react';

interface DraggableDivProps {
    id: number;
    name: string;
    onNodeSave: (id: number, name: string) => void;
}

const DraggableDiv: React.FC<DraggableDivProps> = ({ id, name, onNodeSave }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setDragStartPos({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            const dx = event.clientX - dragStartPos.x;
            const dy = event.clientY - dragStartPos.y;
            const newPosition = {
                x: position.x + dx,
                y: position.y + dy,
            };
            setPosition(newPosition);
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
        onNodeSave(id, newName);
    };

    return (
        <div
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                transition: 'box-shadow 0.3s ease',
                touchAction: 'none', // Add this line
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
                    boxShadow: isDragging
                        ? '0 2px 10px rgba(0, 0, 0, 0.3)'
                        : '0 2px 5px rgba(0, 0, 0, 0.3)',
                    position: 'relative',
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
            </div>
        </div>
    );
};

export default DraggableDiv;
