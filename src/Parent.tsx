import React, { useState } from 'react';
import DraggableComponent from './DraggableComponent';
import ChildComponent from './ChildComponent';
import LineComponent from './LineComponent';

interface ParentComponentProps { }

const ParentComponent: React.FC<ParentComponentProps> = () => {
    const [children, setChildren] = useState<string[]>([]);
    const [linePosition, setLinePosition] = useState({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
    });

    const handleCreateChild = (parentId: string) => {
        const newChildId = `child-${parentId}-${children.length + 1}`;
        setChildren([...children, newChildId]);
        setLinePosition({ startX: 0, startY: 0, endX: 0, endY: 0 });
    };

    const handleDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
        setLinePosition({
            startX: event.clientX,
            startY: event.clientY,
            endX: event.clientX,
            endY: event.clientY,
        });
    };

    const handleDragEnd = (event: React.MouseEvent<HTMLDivElement>) => {
        setLinePosition((prevPosition) => ({
            ...prevPosition,
            endX: event.clientX,
            endY: event.clientY,
        }));
    };

    return (
        <div
            style={{
                position: 'relative',
                height: '400px',
                width: '400px',
            }}
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
        >
            {/* <DraggableComponent id="draggable" onCreateChild={handleCreateChild} /> */}
            {children.map((childId) => (
                <ChildComponent key={childId} parentId={childId.split('-')[1]} />
            ))}
            {linePosition.startX !== 0 && linePosition.startY !== 0 && linePosition.endX !== 0 && linePosition.endY !== 0 && (
                <LineComponent
                    startX={linePosition.startX}
                    startY={linePosition.startY}
                    endX={linePosition.endX}
                    endY={linePosition.endY}
                />
            )}
        </div>
    );
};

export default ParentComponent;
