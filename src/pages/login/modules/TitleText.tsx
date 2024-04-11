import styles from '../styles/Login.module.css'

export default function TitleText({ children }: { children: string }) {
    return (
        <p className={styles.text}>{children}</p>
    )
}