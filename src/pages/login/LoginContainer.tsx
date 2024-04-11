import styles from './styles/Login.module.css';
import About from './comps/About';
import LoginForm from './comps/LoginForm';
import Logo from './comps/Logo';



export default function LoginContainer() {

    return (
        <div className={styles.container}>
            <Logo />
            <LoginForm />
            <About />
        </div>
    );
}