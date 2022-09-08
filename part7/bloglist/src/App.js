import React, { useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setUsername } from './reducers/LoginFormReducer';
import { setMessage } from './reducers/NotificationReducer';
import { initializeBlogs } from './reducers/BlogReducer';
import { login, logout, setUser } from './reducers/UserReducer';

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.Blogs.blogs);
	const username = useSelector(state => state.LoginForm.username);
	const password = useSelector(state => state.LoginForm.password);
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

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		try {
			dispatch(login({ username, password }));
			dispatch(initializeBlogs());
			dispatch(setUsername(''));
			dispatch(setPassword(''));
		} catch (error) {
			dispatch(setMessage(error.response.data.error));
			setTimeout(() => dispatch(setMessage(null)), 3000);
		}
	};

	const handleLogout = () => {
		dispatch(logout());
	};

	if (user === null) {
		return (
			<div>
				<h2>Log in the app</h2>
				<p>{message}</p>
				<Toggleable buttonLabel="login">
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({ target }) => dispatch(setUsername(target.value))}
						handlePasswordChange={({ target }) => dispatch(setPassword(target.value))}
						handleSubmit={handleLoginSubmit}
					/>
				</Toggleable>
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{message}</p>
			<p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
			<Toggleable buttonLabel='new blog'>
				<BlogForm/>
			</Toggleable>
			<Blog blogs={blogs}/>
		</div>
	);
};

export default App;
