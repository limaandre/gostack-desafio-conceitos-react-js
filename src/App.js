import React, { useEffect, useState } from "react";
import api from 'services/api'
import "./styles.css";

function App() {

    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const repository = await api.post('repositories', {
            title: `Title ${Date.now()}`,
            url: `Url ${Date.now()}`,
            techs: ['React, Node']
        });
        setRepositories([
            ...repositories,
            repository.data
        ]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`repositories/${id}`);
        const newRepositories = repositories.filter( re => re.id !== id);
        
        setRepositories(newRepositories);
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
