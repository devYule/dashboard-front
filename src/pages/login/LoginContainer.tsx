import styles from './styles/Login.module.css';
import About from './comps/About';
import LoginForm from './comps/LoginForm';
import Logo from './comps/Logo';



export default function LoginContainer() {

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