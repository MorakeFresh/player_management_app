import React, { useState, useEffect } from 'react';
import {Position} from "@/lib/models/position";
import {Role} from "@/lib/models/role";

interface PositionFormProps {
    position?: Position; 
    availableRoles: Role[]; 
    onSubmit: (position: Position) => void;
}

const PositionForm: React.FC<PositionFormProps> = ({ position, availableRoles, onSubmit }) => {
    const [name, setName] = useState<string>(position?.name || '');
    const [description, setDescription] = useState<string>(position?.description || '');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(position?.roles.map(role => role.name) || []);

    useEffect(() => {
        if (position) {
            setName(position.name);
            setDescription(position.description);
            setSelectedRoles(position.roles.map(role => role.name));
        }
    }, [position]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPosition: Position = {
            name,
            description,
            roles: availableRoles.filter(role => selectedRoles.includes(role.name)),
        };
        onSubmit(newPosition);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{position ? 'Edit Position' : 'Add Position'}</h2>

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

            <div>
                <label>Roles:</label>
                {availableRoles.map((role) => (
                    <div key={role.name}>
                        <input
                            type="checkbox"
                            name={role.name}
                            checked={selectedRoles.includes(role.name)}
                            onChange={() => {
                                setSelectedRoles((prev) =>
                                    prev.includes(role.name)
                                        ? prev.filter(name => name !== role.name)
                                        : [...prev, role.name]
                                );
                            }}
                        />
                        <label htmlFor={role.name}>{role.name}</label>
                    </div>
                ))}
            </div>

            <button type="submit">{position ? 'Update Position' : 'Add Position'}</button>
        </form>
    );
};

export default PositionForm;
