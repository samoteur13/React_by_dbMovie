import React from 'react';
import Input from '../tools/Input';
import axios from 'axios';
import {useState , useContext ,useEffect} from 'react';
import Button from '../tools/Button';
import {useError} from '../../utils/useError';
import {MyContext} from '../../store/AppContext';
import { useNavigate } from "react-router-dom";


const RegistrationLogin = () => {

    //gere le store 
    const navigate = useNavigate()
    const {store, setStore} = useContext(MyContext);

    const [ifLogin, setIfLogin] = useState (false)
    const {myError, saveError} = useError()

    //------------------ Inscription ----------------------
    const [register, setRegister] = useState({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        city: "",
        postalCode: ""
    });

    const postRegister = () => {
        axios
        .post('https://api-ri7.herokuapp.com/api/users/register',register)
        .then(res => res.data)
        .catch(err => saveError(err.response.data.error))
    }
    //----------------------------------------------------//

    //-------------------- Connexion -----------------------
    const [login, setUser] = useState({
        email : '',
        password: '',

    });

    const postLogin = () => {
        axios
        .post('https://api-ri7.herokuapp.com/api/users/login',login)
        .then(res => {
                    sessionStorage.setItem('token', res.data.token);
                    setStore({...store , isUserAuth : true })
                }
            )
        .catch(err => saveError(err.response.data.error))
        
    }
    

    useEffect(() => {
        if(store.isUserAuth){
            axios
            .get('https://api-ri7.herokuapp.com/api/users/profile',
            {headers : { Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
            .then(res =>  setStore({...store , user: res.data }))
            .catch(err => console.log('err => ', err))

            navigate('/profile')
        }
    },[store.isUserAuth])

    //---------------------------------------//

     const handleUser = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        ifLogin ?
            setUser({...login, [`${key}`] :  value})
        :
            setRegister({...register, [`${key}`] :  value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ifLogin ? postLogin() : postRegister()
      }

    return (
        <div>
            <div className="Flex-div" style={{border: '', borderRadius:'5px', width: '30%',margin: 'auto' }}>
                <Button
                    label='Inscription'
                    action={ () => {setIfLogin(false)}}
                />
                <Button
                    label='Connexion'
                    action={ () => {setIfLogin(true)}}
                />
            </div>
            {ifLogin ? 
                <form style={{border: '', borderRadius:'5px', width: '30%',margin: 'auto' }} onSubmit={handleSubmit}>
                    <h3>Connexion</h3>
                    {myError.length > 1
                        && <p className='text-danger'>{myError}</p>
                     }
                    <Input 
                        name='email' 
                        label='Email' 
                        type='text' 
                        val={login.email}
                        onChange={handleUser}
                    />
                    <Input 
                        name='password' 
                        label='Mot de passe' 
                        type='text' 
                        val={login.password} 
                        onChange={handleUser}
                    />
                    <input style={{margin: '5px', fontweight: 'bold'}}  type='submit' value='connexion'/>
                </form>    
            :
                <form style={{border: '', borderRadius:'5px', width: '30%',margin: 'auto' }} onSubmit={handleSubmit}>
                <h3>Inscription</h3>
                    {myError.length > 1
                        && <p className='text-danger'>{myError}</p>
                     }
                <Input 
                    name='email' 
                    label='Email' 
                    type='email' 
                    val={register.email}
                    onChange={handleUser}
                />
                <Input 
                    name='password' 
                    label='Mot de passe' 
                    type='password' 
                    val={register.password} 
                    onChange={handleUser}
                />
                <Input 
                    name='firstname' 
                    label='Prénom' 
                    type='text' 
                    val={register.firstname} 
                    onChange={handleUser}
                />
                <Input 
                    name='lastname' 
                    label='Nom' 
                    type='text' 
                    val={register.lastname} 
                    onChange={handleUser}
                />
                <Input 
                    name='city' 
                    label='Ville' 
                    type='text' 
                    val={register.city} 
                    onChange={handleUser}
                />
                <Input 
                    name='postalcode' 
                    label='code postale' 
                    type='text' 
                    val={register.postalCode} 
                    onChange={handleUser}
                />
                <input style={{margin: '5px', fontweight: 'bold'}}  type='submit' value='Inscription'/>
                </form>
            }
        </div>
    )
}

export default RegistrationLogin; 