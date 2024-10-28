import React from 'react';
import {Position} from "@/lib/models/position";
import {Role} from "@/lib/models/role";
import PositionForm from "@/components/forms/position-form";

interface EditPositionProps {
    position: Position;
    availableRoles: Role[];
    onUpdatePosition: (position: Position) => void;
}

const EditPosition: React.FC<EditPositionProps> = ({ position, availableRoles, onUpdatePosition }) => {
    return (
        <div>
            <PositionForm position={position} availableRoles={availableRoles} onSubmit={onUpdatePosition} />
        </div>
    );
};

export default EditPosition;
