import React from 'react';
import {Role} from "@/lib/models/role";
import {Position} from "@/lib/models/position";
import PositionForm from "@/components/forms/position-form";

interface AddPositionProps {
    availableRoles: Role[];
    onAddPosition: (position: Position) => void;
}

const AddPosition: React.FC<AddPositionProps> = ({ availableRoles, onAddPosition }) => {
    return (
        <div>
            <PositionForm availableRoles={availableRoles} onSubmit={onAddPosition} />
        </div>
    );
};

export default AddPosition;
