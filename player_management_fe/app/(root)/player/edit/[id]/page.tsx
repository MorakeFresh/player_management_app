import React from 'react';
import {Player} from "@/lib/models/player";
import PlayerForm from "@/components/forms/player-form";
import {Position} from "@/lib/models/position";

interface EditPlayerProps {
    player: Player;
    positions: Position[];
    onUpdatePlayer: (player: Player) => void;
}

const EditPlayer: React.FC<EditPlayerProps> = ({ player, positions, onUpdatePlayer }) => {
    return (
        <div>
            <PlayerForm player={player} positions={positions} onSubmit={onUpdatePlayer} />
        </div>
    );
};

export default EditPlayer;
