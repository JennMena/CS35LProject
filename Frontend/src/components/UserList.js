import React, { useEffect, useState } from "react";
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] =  useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching data: ', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {
                    users.map(user => (
                        <li key={user.id}>
                            {user.firstName} {user.lastName} - {user.email} | {user.username} | {user.password}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default UserList;