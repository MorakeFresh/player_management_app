import React from "react";
import {useRouter} from "next/router";

import {getPlayerById} from "@/lib/actions";

const PlayerPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [player, setPlayer] = React.useState(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getPlayerById(id as string);
                    setPlayer(data);
                } catch (error) {
                    setError('Could not load player data');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Player Details</h1>
            <h2>{player.name}</h2>
            <p>Shirt Number: {player.shirtNumber}</p>
            <h3>Positions:</h3>
            <ul>
                {player.position.map((pos: { name: string; description: string }) => (
                    <li key={pos.name}>
                        <strong>{pos.name}</strong>: {pos.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerPage;