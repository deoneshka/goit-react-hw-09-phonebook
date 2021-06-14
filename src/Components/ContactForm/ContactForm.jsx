import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import { getAllContacts } from '../../redux/contacts/contacts-selectors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const dispatch = useDispatch();
    const contacts = useSelector(getAllContacts);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            setName('');
            setNumber('');

            if (contacts.find(contact => contact.name === name)) {
                alert(`${name} is already in contacts.`);
                return;
            }

            dispatch(contactsOperations.addContact(name, number));
        },
        [contacts, name, number, dispatch],
    );

    const handleChangeName = useCallback(e => {
        setName(e.currentTarget.value);
    }, []);

    const handleChangeNumber = useCallback(e => {
        setNumber(e.currentTarget.value);
    }, []);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
                className={styles.input}
                label="name"
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                required
                value={name}
                onChange={handleChangeName}
            />

            <TextField
                className={styles.input}
                label="number"
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                required
                value={number}
                onChange={handleChangeNumber}
            />

            <Button
                className={styles.button}
                type="submit"
                variant="contained"
                color="primary"
            >
                add contact
            </Button>
        </form>
    );
}
