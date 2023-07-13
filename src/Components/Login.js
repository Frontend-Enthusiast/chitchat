import { Button } from '@material-ui/core'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, provider } from '../firebase'
import { useStateValues } from '../StateProvider'
import { actionTypes } from '../reducer'
import './Login.css'
const Login = () => {
    const [{ }, dispatch] = useStateValues();
    const signIn = () => {
        signInWithPopup(auth, provider).then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        }).catch((error) => console.log(error));
    }
    return (
        <div className='login'>
            <div className='login_container'>
                <img src='https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg' alt=''></img>
                <div className='login_text'>
                    <h3>Sign in to Whatsapp</h3>
                </div>
                <Button type='submit' onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login