import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import { getLoading } from '../../redux/contacts/contacts-selectors';
import Container from '../../Components/Container';
import ContactForm from '../../Components/ContactForm';
import ContactList from '../../Components/ContactList';
import FilterContacts from '../../Components/FilterContacts';
import styles from './ContactsView.module.css';

export default function ContactsView() {
    const dispatch = useDispatch();
    const isLoading = useSelector(getLoading);

    useEffect(() => {
        dispatch(contactsOperations.fetchContacts());
    }, [dispatch]);

    return (
        <div className={styles.wrapper}>
            <Container>
                <ContactForm />
                <FilterContacts />
                {isLoading && <h3 className={styles.loader}>loading...</h3>}
                {!isLoading && <ContactList />}
            </Container>
        </div>
    );
}
