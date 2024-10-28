import React from 'react';
import {Role} from "@/lib/models/role";
import RoleForm from "@/components/forms/role-form";

interface AddRoleProps {
    onAddRole: (role: Role) => void;
}

const AddRole: React.FC<AddRoleProps> = ({ onAddRole }) => {
    return (
        <div>
            <RoleForm onSubmit={onAddRole} />
        </div>
    );
};

export default AddRole;
