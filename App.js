
import React from 'react';
import {Routes} from 'react-router-dom';
import UserList from './component/UserList';

  function App() { 
    /*<Routes>
      <Route path="/" element = {<unFichier/>} />
    </Routes>
   const response=await fetch ('https://jsonplaceholder.typicode.com/users')
    .then (res=>{
      return res.json()
    })
    .then (json=> console.log(json))
   return (response.json())*/
   return <UserList/>;
}

export default App;
