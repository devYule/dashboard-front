import styles from './styles/Login.module.css';
import About from './comps/About';
import LoginForm from './comps/LoginForm';
import Logo from './comps/Logo';
import { useEffect } from 'react';



export default function LoginContainer() {

    useEffect(() => {
        const titleEl = document.getElementsByTagName('title')[0];
        titleEl.innerText = 'Login';
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <Logo />
            </div>
            <LoginForm />
            <About />
        </div>
    );
}