import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsername, setName, setPassword } from '../reducers/RegisterFormReducer';
import { register } from '../reducers/UsersReducer';
import { setNotification } from '../reducers/NotificationReducer';
import { login } from '../reducers/UserReducer';
import { initializeBlogs } from '../reducers/BlogReducer';

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
				username: <input type="text" value={username} name="username"
								 onChange={({ target }) => dispatch(setUsername(target.value))}/>
			</div>
			<div>
				name: <input type="text" value={name} name="name"
							 onChange={({ target }) => dispatch(setName(target.value))}/>
			</div>
			<div>
				password: <input type="password" value={password} name="password"
								 onChange={({ target }) => dispatch(setPassword(target.value))}/>
			</div>
			<button type="submit">register</button>
		</form>
	);
};

export default RegisterForm;