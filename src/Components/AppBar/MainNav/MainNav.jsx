import { NavLink } from 'react-router-dom';
import routes from '../../../routes';
import { useSelector } from 'react-redux';
import { getIsAuthenticated } from '../../../redux/auth/auth-selectors';
import styles from './MainNav.module.css';

export default function MainNav() {
    const isAuthenticated = useSelector(getIsAuthenticated);

    return (
        <nav className={styles.nav}>
            <NavLink exact to={routes.home} className={styles.link} activeClassName={styles.link_active}>home</NavLink>
            {
                isAuthenticated &&
                (
                    < NavLink to={routes.contacts} className={styles.link} activeClassName={styles.link_active}>contacts</NavLink>
                )
            }
        </nav>
    );
};