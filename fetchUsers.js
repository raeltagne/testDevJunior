import React from "react";
const fetchUsers = async () => {
    
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données.');
      }
      const data = await response.json();
    return data;
};

export default fetchUsers();