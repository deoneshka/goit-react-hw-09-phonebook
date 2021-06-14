import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import Button from '@material-ui/core/Button';
import styles from './ContactList.module.css';

export default function ContactList() {
    const dispatch = useDispatch();
    const contacts = useSelector(getVisibleContacts);

    return (
        <ul className={styles.list}>
            {contacts.map(({ id, name, number }) => (
                <li className={styles.item} key={id}>
                    {name}: {number}
                    <Button
                        className={styles.button}
                        type="button"
                        onClick={() =>
                            dispatch(contactsOperations.deleteContact(id))
                        }
                        variant="contained"
                        color="primary"
                    >
                        Delete
                    </Button>
                </li>
            ))}
        </ul>
    );
}
