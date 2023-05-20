import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

export enum ItemTypes {
    TREE_ITEM = 'treeItem',
}

interface TreeItemProps {
    id: number;
    type: string;
    name: string;
    onMoveItem: (dragId: number, dropId: number) => void;
    onEditItem: (id: number, newName: string) => void;
    children?: React.ReactNode;
}

interface DragItem {
    id: number;
    type: string;
}

const DraggableTreeItem: React.FC<TreeItemProps> = ({
    id,
    type,
    name,
    onMoveItem,
    onEditItem,
    children,
}) => {
    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: ItemTypes.TREE_ITEM,
        item: { id, type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [{ canDrop, isOver }, dropRef] = useDrop(() => ({
        accept: ItemTypes.TREE_ITEM,
        drop: (item: DragItem) => {
            if (item.id !== id) {
                onMoveItem(item.id, id);
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver(),
        }),
    }));

    const opacity = isDragging ? 0.5 : 1;
    const backgroundColor = isOver ? 'lightblue' : '';

    return (
        <li
            ref={(node) => {
                dragRef(node);
                dropRef(node);
            }}
            style={{ opacity, backgroundColor }}
        >
            <div className="node_details">
                <span className="node_name">{name}</span>
                <button
                    className="edit_node"
                    onClick={() => {
                        const newName = prompt('Enter new name:');
                        if (newName !== null) {
                            onEditItem(id, newName);
                        }
                    }}
                >
                    Edit
                </button>
            </div>
            {children}
            {isOver && <div className="tracing_line" />}
        </li>
    );
};

export default DraggableTreeItem;
