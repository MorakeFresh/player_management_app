import React, { useState, useEffect } from 'react';
import {Player} from "@/lib/models/player";
import {Position} from "@/lib/models/position";

interface PlayerFormProps {
    player?: Player;
    positions: Position[];
    onSubmit: (player: Player) => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ player, positions, onSubmit }) => {
    const [name, setName] = useState<string>(player?.name || '');
    const [shirtNumber, setShirtNumber] = useState<string>(player?.shirtNumber || '');
    const [selectedPositions, setSelectedPositions] = useState<string[]>(player?.position.map(p => p.name) || []);

    useEffect(() => {
        if (player) {
            setName(player.name);
            setShirtNumber(player.shirtNumber);
            setSelectedPositions(player.position.map(p => p.name));
        }
    }, [player]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPlayer: Player = {
            id: player ? player.id : Date.now().toString(), // Generate an ID for new players
            name,
            shirtNumber,
            position: positions.filter(pos => selectedPositions.includes(pos.name)),
        };
        onSubmit(newPlayer);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{player ? 'Edit Player' : 'Add Player'}</h2>

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
                <label>Shirt Number:</label>
                <input
                    type="text"
                    value={shirtNumber}
                    onChange={(e) => setShirtNumber(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Position:</label>
                {positions.map((position) => (
                    <div key={position.name}>
                        <input
                            type="checkbox"
                            id={position.name}
                            checked={selectedPositions.includes(position.name)}
                            onChange={() => {
                                setSelectedPositions((prev) =>
                                    prev.includes(position.name)
                                        ? prev.filter(name => name !== position.name)
                                        : [...prev, position.name]
                                );
                            }}
                        />
                        <label htmlFor={position.name}>{position.name}</label>
                    </div>
                ))}
            </div>

            <button type="submit">{player ? 'Update Player' : 'Add Player'}</button>
        </form>
    );
};

export default PlayerForm;
