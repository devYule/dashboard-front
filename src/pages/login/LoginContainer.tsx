import About from './comps/About';
import LoginForm from './comps/LoginForm';
import Logo from './comps/Logo';
import { useEffect } from 'react';
import './styles/login.scss';


export default function LoginContainer() {

    useEffect(() => {
        const titleEl = document.getElementsByTagName('title')[0];
        titleEl.innerText = 'Login';
    }, [])

    return (
        <div className="container">
            <div className="logo">
                <Logo />
            </div>
            <LoginForm />
            <About />
        </div>
    );
}