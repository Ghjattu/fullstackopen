import React from 'react';
import { login } from '../reducers/UserReducer';
import { initializeBlogs } from '../reducers/BlogReducer';
import { setPassword, setUsername } from '../reducers/LoginFormReducer';
import { setNotification } from '../reducers/NotificationReducer';
import { useDispatch, useSelector } from 'react-redux';

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
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => dispatch(setUsername(target.value))}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => dispatch(setPassword(target.value))}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};

export default LoginForm;