import { useSelector } from 'react-redux';
import MainNav from './MainNav';
import AuthNav from './AuthNav';
import UserMenu from './UserMenu';
import Container from '../Container';
import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
import styles from './AppBar.module.css';

export default function AppBar() {
    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.wrapper}>
                    <MainNav />
                    {isAuthenticated ? <UserMenu /> : <AuthNav />}
                </div>
            </Container>
        </header>
    );
}
