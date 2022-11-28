import React , {useState} from 'react';
import {createContext} from "react";

export const MyContext = createContext(null);

const AppContext = ({children}) => {

    const [store, setStore] = useState ({
        isUserAuth: false,
        user: {
                avatar : '',
                biography: '', 
                birthdate: '', 
                city: '', 
                email: '', 
                firstname: '',
                lastname: '', 
                postalCode: '', 
            },
        isMovie : 'movie'
    })

    return (
        <MyContext.Provider value={{store,setStore}} >
            {children}
        </MyContext.Provider>
    );

};

export default AppContext;