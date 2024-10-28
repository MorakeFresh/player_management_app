import React from 'react';
import {Role} from "@/lib/models/role";
import RoleForm from "@/components/forms/role-form";

interface EditRoleProps {
    role: Role;
    onUpdateRole: (role: Role) => void;
}

const EditRole: React.FC<EditRoleProps> = ({ role, onUpdateRole }) => {
    return (
        <div>
            <RoleForm role={role} onSubmit={onUpdateRole} />
        </div>
    );
};

export default EditRole;
