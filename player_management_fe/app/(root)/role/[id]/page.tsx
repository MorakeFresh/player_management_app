import React from 'react';
import { useRouter } from 'next/router';
import {getRoleById} from "@/lib/actions";

const RolePage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [role, setRole] = React.useState(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const data = await getRoleById(id as string);
                    setRole(data);
                } catch (error) {
                    setError('Could not load role data');
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
            <h1>Role Details</h1>
            <h2>{role.name}</h2>
            <p>{role.description}</p>
        </div>
    );
};

export default RolePage;
