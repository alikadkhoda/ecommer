import React, { createContext, useState } from 'react';

export const AdminContext=createContext()

const AdminContextProvider = (props) => {
    const [user,setUser]=useState('')
    return ( 
        <AdminContext.Provider value={{user,setUser}}>
            {props.children}
        </AdminContext.Provider>
     );
}
 
export default AdminContextProvider;