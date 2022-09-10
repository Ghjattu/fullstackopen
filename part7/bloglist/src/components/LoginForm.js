import React from 'react';
import { login } from '../reducers/UserReducer';
import { initializeBlogs } from '../reducers/BlogsReducer';
import { setPassword, setUsername } from '../reducers/LoginFormReducer';
import { setNotification } from '../reducers/NotificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';

const LoginForm = () => {
	const dispatch = useDispatch();

	const username = useSelector(state => state.LoginForm.username);
	const password = useSelector(state => state.LoginForm.password);

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			dispatch(login({ username, password }));
			dispatch(setUsername(''));
			dispatch(setPassword(''));
		} catch (error) {
			dispatch(setNotification(error.response.data.error));
		} finally {
			dispatch(initializeBlogs());
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<TextField label="username" variant="outlined" value={username} name="username"
						   size="small" margin="normal"
						   onChange={({ target }) => dispatch(setUsername(target.value))}/>
			</div>
			<div>
				<TextField label="password" variant="outlined" value={password} name="password"
						   size="small" type="password" margin="normal"
						   onChange={({ target }) => dispatch(setPassword(target.value))}/>
			</div>
			<Button variant="outlined" type="submit">login</Button>
		</form>
	);
};

export default LoginForm;