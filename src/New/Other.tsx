import React, { useState } from 'react';
import DraggableTreeItem from './NewTree';

interface Node {
    id: number;
    type: string;
    name: string;
    children?: Node[];
}

const initialTreeData: Node[] = [
    {
        id: 0,
        type: 'root',
        name: 'Categories',
        children: [
            {
                id: 13,
                type: 'category',
                name: 'Dental Clinic',
                children: [
                    { id: 33, type: 'service', name: 'Oral hygiene' },
                    { id: 34, type: 'service', name: 'Tooth whitening' },
                    { id: 35, type: 'service', name: 'Implants' },
                ],
            },
            {
                id: 15,
                type: 'category',
                name: 'Gynecology',
                children: [
                    { id: 36, type: 'service', name: 'Pregnancy check-up' },
                    { id: 37, type: 'service', name: 'Ultrasound' },
                ],
            },
        ],
    },
];

const Tree: React.FC = () => {
    const [treeData, setTreeData] = useState<Node[]>(initialTreeData);

    const handleMoveItem = (dragId: number, dropId: number) => {
        const updatedTreeData = [...treeData];
        const dragItem = findNode(updatedTreeData, dragId);
        const dropItem = findNode(updatedTreeData, dropId);

        if (dragItem && dropItem) {
            if (dragItem === dropItem) return; // Ignore if the drag and drop locations are the same

            removeNode(updatedTreeData, dragItem);
            dropItem.children = dropItem.children ? [...dropItem.children, dragItem] : [dragItem];

            setTreeData(updatedTreeData);
        }
    };

    const handleEditItem = (id: number, newName: string) => {
        const updatedTreeData = [...treeData];
        const node = findNode(updatedTreeData, id);

        if (node) {
            node.name = newName;
            setTreeData(updatedTreeData);
        }
    };

    const removeNode = (data: Node[], node: Node) => {
        const parent = findParent(data, node);

        if (parent) {
            parent.children = parent.children?.filter((child) => child !== node);
        }
    };

    const findNode = (data: Node[], id: number): Node | undefined => {
        for (const node of data) {
            if (node.id === id) {
                return node;
            }

            if (node.children) {
                const foundNode = findNode(node.children, id);
                if (foundNode) {
                    return foundNode;
                }
            }
        }

        return undefined;
    };

    const findParent = (data: Node[], node: Node): Node | undefined => {
        for (const parentNode of data) {
            if (parentNode.children && parentNode.children.includes(node)) {
                return parentNode;
            }

            if (parentNode.children) {
                const foundParent = findParent(parentNode.children, node);
                if (foundParent) {
                    return foundParent;
                }
            }
        }

        return undefined;
    };

    const renderTree = (data: Node[]) => {
        return data.map((node) => (
            <DraggableTreeItem
                key={node.id}
                id={node.id}
                type={node.type}
                name={node.name}
                onMoveItem={handleMoveItem}
                onEditItem={handleEditItem}
            >
                {node.children && <ul>{renderTree(node.children)}</ul>}
            </DraggableTreeItem>
        ));
    };

    return <ul>{renderTree(treeData)}</ul>;
};

export default Tree;
