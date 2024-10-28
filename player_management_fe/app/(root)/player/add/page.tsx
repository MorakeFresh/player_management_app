import React from 'react';
import {Position} from "@/lib/models/position";
import {Player} from "@/lib/models/player";
import PlayerForm from "@/components/forms/player-form";

interface AddPlayerProps {
    positions: Position[];
    onAddPlayer: (player: Player) => void;
}

const AddPlayer: React.FC<AddPlayerProps> = ({ positions, onAddPlayer }) => {
    return (
        <div>
            <PlayerForm positions={positions} onSubmit={onAddPlayer} />
        </div>
    );
};

export default AddPlayer;
