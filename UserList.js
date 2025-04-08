import React, { useEffect, useState } from 'react';
import '../css/styleUserList.css' ;
import Modal from './Modal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // État pour suivre la ligne sélectionnée
  const handleRowClick = (user) => {
    setSelectedUser(user); // Met à jour l'état avec les données de la ligne sélectionnée
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
        try {
          const response = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
          }
          const data = await response.json();
          setUsers(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
    };
    
    fetchUsers();
  }, []);
  
  useEffect(() => {
    const results = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchTerm, users]);

 
  if (isLoading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }
  

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '10px', padding: '5px', width: '30%' }}
      />
      <table class="table" border="1">
    <thead>
        <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Téléphone</th>
        </tr>
    </thead>
    
    <body>
        {filteredUsers.map(user => (
          <tr key={user.id} onClick={() => handleRowClick(user)}   // Définition de l'action de clic
          style={{
            cursor: 'pointer',
            backgroundColor: selectedUser?.id === user.id ? '#f0f8ff' : 'white' // Met en surbrillance la ligne sélectionnée
          }}
        >
            <td>{user.name} </td> 
            <td>{user.email}</td>  
            <td>{user.phone}</td> 
          </tr>
        ))}
        </body>
     </table>
     {selectedUser && <Modal props={selectedUser} /> }
     
     
    </div>
    
  );
};

export default UserList;

