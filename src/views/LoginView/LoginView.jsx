import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import authOperations from '../../redux/auth/auth-operations';
import styles from './LoginView.module.css';
import Box from '@material-ui/core/Box';

export default function LoginView() {
    const dispatch = useDispatch();
    const [user, setUser] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = useCallback(({ target: { name, value } }) => {
        setUser(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(authOperations.logIn(user));
        },
        [dispatch, user],
    );

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword]);

    const handleMouseDownPassword = useCallback(event => {
        event.preventDefault();
    }, []);

    const { email, password } = user;

    return (
        <div className={styles.wrapper}>
            <form
                className={styles.form}
                onSubmit={handleSubmit}
                autoComplete="off"
            >
                <Box className={styles.wrapper__input}>
                    <TextField
                        className={styles.input}
                        label="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        variant="outlined"
                    />
                </Box>

                <Box className={styles.wrapper__input}>
                    <FormControl variant="outlined" className={styles.input}>
                        <InputLabel htmlFor="outlined-adornment-password">
                            password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </Box>

                <Button
                    className={styles.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    enter
                </Button>
            </form>
        </div>
    );
}
