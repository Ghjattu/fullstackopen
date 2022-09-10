import React, { useEffect } from 'react';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from './reducers/UserReducer';
import RegisterForm from './components/RegisterForm';
import { initializeUsers } from './reducers/UsersReducer';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

const App = () => {
	const dispatch = useDispatch();

	const user = useSelector(state => state.User.user);
	const message = useSelector(state => state.Notification.message);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			dispatch(setUser(user));
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		dispatch(initializeUsers());
	}, []);

	const handleLogout = () => {
		dispatch(logout());
	};

	if (user === null) {
		return (
			<div>
				<h1>Log in the app</h1>
				<p>{message}</p>
				<Toggleable buttonLabel="login">
					<LoginForm/>
				</Toggleable>
				<Toggleable buttonLabel="register">
					<RegisterForm/>
				</Toggleable>
			</div>
		);
	}

	return (
		<div>
			<h1>Blog App</h1>
			<p>{message}</p>
			<p><b>{user.name}</b> logged in <button onClick={handleLogout}>log out</button></p>
			<BrowserRouter>
				<Menu/>
			</BrowserRouter>
		</div>
	);
};

export default App;
