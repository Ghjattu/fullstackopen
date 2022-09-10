import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setName, setPassword } from '../reducers/RegisterFormReducer';
import { register } from '../reducers/UsersReducer';
import { setNotification } from '../reducers/NotificationReducer';
import { login } from '../reducers/UserReducer';
import { initializeBlogs } from '../reducers/BlogsReducer';
import { Button, TextField } from '@mui/material';

const RegisterForm = () => {
	const dispatch = useDispatch();

	const username = useSelector(state => state.RegisterForm.username);
	const name = useSelector(state => state.RegisterForm.name);
	const password = useSelector(state => state.RegisterForm.password);

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			dispatch(register({ username, name, password }));
			dispatch(login({ username, password }));
			dispatch(setUsername(''));
			dispatch(setName(''));
			dispatch(setPassword(''));
		} catch (e) {
			dispatch(setNotification(e.response.data.error));
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
				<TextField label="name" variant="outlined" value={name} name="name"
						   size="small" margin="normal"
						   onChange={({ target }) => dispatch(setName(target.value))}/>
			</div>
			<div>
				<TextField label="password" variant="outlined" value={password} name="password"
						   size="small" margin="normal" type="password"
						   onChange={({ target }) => dispatch(setPassword(target.value))}/>
			</div>
			<Button variant="outlined" type="submit">register</Button>
		</form>
	);
};

export default RegisterForm;