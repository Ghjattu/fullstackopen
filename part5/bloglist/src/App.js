import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const blogFormRef = useRef();

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	useEffect(() => {
		(async () => {
			const blogs = await blogService.getAll();
			setBlogs(blogs.sort((a, b) => b.likes - a.likes));
		})();
	}, []);

	const handleLoginSubmit = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			);
			blogService.setToken(user.token);
			const blogs = await blogService.getAll();
			setBlogs(blogs.sort((a, b) => b.likes - a.likes));
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (error) {
			setMessage(error.response.data.error);
			setTimeout(() => setMessage(null), 3000);
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogAppUser');
		setUser(null);
	};

	const createNewBlog = async (newBlog) => {
		blogFormRef.current.toggleVisibility();
		const savedBlog = await blogService.create(newBlog);
		setBlogs((blogs.concat(savedBlog)));
		setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
		setTimeout(() => setMessage(null), 3000);
	};

	const updateBlog = async (id, newBlog) => {
		const updatedBlog = await blogService.update(id, newBlog);
		setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog));
		setMessage(`the blog ${updatedBlog.title} by ${updatedBlog.author} updated`);
		setTimeout(() => setMessage(null), 3000);
	};

	const deleteBlog = async (id) => {
		await blogService.deleteById(id);
		setBlogs(blogs.filter(blog => blog.id !== id));
		setMessage('blog removed');
		setTimeout(() => setMessage(null), 3000);
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
						handleUsernameChange={({ target }) => setUsername(target.value)}
						handlePasswordChange={({ target }) => setPassword(target.value)}
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
			<Toggleable buttonLabel='new blog' ref={blogFormRef}>
				<BlogForm createNewBlog={createNewBlog}/>
			</Toggleable>
			<Blog blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
		</div>
	);
};

export default App;
