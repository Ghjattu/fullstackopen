import React, { useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setUser } from './reducers/UserReducer';
import RegisterForm from './components/RegisterForm';
import { initializeUsers } from './reducers/UsersReducer';
import Users from './components/Users';

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.Blogs.blogs);
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
				<h2>Log in the app</h2>
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
			<h2>Blogs</h2>
			<p>{message}</p>
			<p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
			<Toggleable buttonLabel='new blog'>
				<BlogForm/>
			</Toggleable>
			<Blog blogs={blogs}/>
			<Users/>
		</div>
	);
};

export default App;
