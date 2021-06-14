import { NavLink } from 'react-router-dom';
import routes from '../../../routes';
import styles from './AuthNav.module.css';

const AuthNav = () => (
    <nav className={styles.nav}>
        <NavLink to={routes.register} className={styles.link} activeClassName={styles.link_active}>registration</NavLink>
        <NavLink to={routes.login} className={styles.link} activeClassName={styles.link_active}>log in</NavLink>
    </nav>
);

export default AuthNav;