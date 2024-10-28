import React from 'react';
import { useRouter } from 'next/router';
import {getPositionById} from "@/lib/actions";

const PositionPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [position, setPosition] = React.useState(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getPositionById(id as string);
                    setPosition(data);
                } catch (error) {
                    setError('Could not load position data');
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
            <h1>Position Details</h1>
            <h2>{position.name}</h2>
            <p>{position.description}</p>
            <h3>Roles:</h3>
            <ul>
                {position.roles.map((role: { name: string; description: string }) => (
                    <li key={role.name}>
                        <strong>{role.name}</strong>: {role.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PositionPage;
