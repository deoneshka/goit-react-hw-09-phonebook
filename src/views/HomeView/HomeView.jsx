import Container from '../../Components/Container';
import styles from './HomeView.module.css';

const HomeView = () => (
    <div className={styles.div}>
        <Container>
            <h1 className={styles.h1}>Hello, this is a phonebook application. 
            <br/> To start using it, register or log into your account.</h1>
        </Container>  
    </div>
);

export default HomeView;