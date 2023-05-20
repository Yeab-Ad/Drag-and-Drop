import React from 'react';

interface ChildComponentProps {
    parentId: string;
}

const ChildComponent: React.FC<ChildComponentProps> = ({ parentId }) => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
                backgroundColor: '#f3f3f3',
            }}
        >
            Child of {parentId}
        </div>
    );
};

export default ChildComponent;
