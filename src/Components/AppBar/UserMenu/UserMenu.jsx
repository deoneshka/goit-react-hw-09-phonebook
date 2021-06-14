import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserEmail } from '../../../redux/auth/auth-selectors';
import authOperations from '../../../redux/auth/auth-operations';
import Button from '@material-ui/core/Button';
import styles from './UserMenu.module.css';

export default function UserMenu() {
    const dispatch = useDispatch();
    const email = useSelector(getUserEmail);

    const onLogOut = useCallback(() => {
        dispatch(authOperations.logOut());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <p className={styles.text}>{email}</p>
            <Button
                className={styles.button}
                type="button"
                onClick={onLogOut}
                variant="contained"
                color="secondary"
            >
                log out
            </Button>
        </div>
    );
}
