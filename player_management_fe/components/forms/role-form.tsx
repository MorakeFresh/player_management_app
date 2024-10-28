import React, { useState, useEffect } from 'react';
import {Role} from "@/lib/models/role";

interface RoleFormProps {
    role?: Role;
    onSubmit: (role: Role) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ role, onSubmit }) => {
    const [name, setName] = useState<string>(role?.name || '');
    const [description, setDescription] = useState<string>(role?.description || '');

    useEffect(() => {
        if (role) {
            setName(role.name);
            setDescription(role.description);
        }
    }, [role]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newRole: Role = {
            name,
            description,
        };
        onSubmit(newRole);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{role ? 'Edit Role' : 'Add Role'}</h2>

            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <button type="submit">{role ? 'Update Role' : 'Add Role'}</button>
        </form>
    );
};

export default RoleForm;
