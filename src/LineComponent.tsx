import React from 'react';

interface LineComponentProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

const LineComponent: React.FC<LineComponentProps> = ({
    startX,
    startY,
    endX,
    endY,
}) => {
    const distance = Math.sqrt(
        Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
    );
    const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

    return (
        <div
            style={{
                position: 'absolute',
                top: startY,
                left: startX,
                width: distance,
                height: '2px',
                background: '#ccc',
                transform: `rotate(${angle}deg)`,
                transformOrigin: 'top left',
                zIndex: 0,
            }}
        />
    );
};

export default LineComponent;
