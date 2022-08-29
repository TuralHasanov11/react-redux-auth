import React, { useEffect, useRef, useState } from 'react'
import { useLoginMutation } from '../store/authApiSlice'
import { setUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {useNavigate} from "react-router-dom"

export default function Login() {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const navigate = useNavigate()

    const [login, {isLoading}] = useLoginMutation()
    const dispatch= useDispatch()

    useEffect(()=>{
        userRef.current.focus()
    }, [])

    useEffect(()=>{
        setErrMsg("")
    }, [userRef, password])

    async function submitForm(e){
        e.preventDefault()

        try {
            const userData = await login({username, password}).unwrap()
            dispatch(setUser({...userData, username}))
            setUsername("")
            setPassword("")
            navigate("/welcome", {})
        } catch (error) {
            if (!error?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (error.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (error.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <h1>Employee Login</h1>

            <form onSubmit={submitForm}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    autoComplete="off"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button type='submit'>Sign In</button>
            </form>
        </section>
    )

    return content
}
