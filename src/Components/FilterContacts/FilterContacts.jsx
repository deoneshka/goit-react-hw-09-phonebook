import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import TextField from '@material-ui/core/TextField';
import styles from './FilterContacts.module.css';

export default function FilterContacts() {
    const dispatch = useDispatch();
    const value = useSelector(getFilter);

    const onChange = useCallback(
        e => dispatch(changeFilter(e.target.value)),
        [dispatch],
    );

    return (
        <div className={styles.wrapper}>
            <TextField
                label="find contacts by name"
                className={styles.input}
                type="text"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
