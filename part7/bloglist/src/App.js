import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Togglable';
import BlogForm from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { setPassword, setUsername } from './reducers/LoginFormReducer';
import { setMessage } from './reducers/NotificationReducer';
import { addBlog, initializeBlogs } from './reducers/BlogReducer';

const App = () => {
	const dispatch = useDispatch();

	const blogs = useSelector(state => state.Blogs.blogs);
	const username = useSelector(state => state.LoginForm.username);
	const password = useSelector(state => state.LoginForm.password);
	const [user, setUser] = useState(null);
	const message = useSelector(state => state.Notification.message);
	// const blogFormRef = useRef();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	// useEffect(() => {
	// 	dispatch(initializeBlogs());
	// }, []);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			);
			blogService.setToken(user.token);
			dispatch(initializeBlogs());

			setUser(user);
			dispatch(setUsername(''));
			dispatch(setPassword(''));

		} catch (error) {
			dispatch(setMessage(error.response.data.error));
			setTimeout(() => dispatch(setMessage(null)), 3000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogAppUser');
		setUser(null);
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
