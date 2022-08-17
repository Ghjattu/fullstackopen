import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault();

		try {
			const user = await loginService.login({ username, password });

			window.localStorage.setItem(
				'loggedBlogAppUser', JSON.stringify(user)
			);
			blogService.setToken(user.token);
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

	const handleNewBlog = async (e) => {
		e.preventDefault();

		const savedBlog = await blogService.create({ title, author, url });
		setBlogs(blogs.concat(savedBlog));
		setTitle('');
		setAuthor('');
		setUrl('');
		setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`);
		setTimeout(() => setMessage(null), 3000);
	};

	const loginForm = () => {
		return (
			<form onSubmit={handleLogin}>
				<div>
					username
					<input
						type="text"
						value={username}
						name="Username"
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password
					<input
						type="password"
						value={password}
						name="Password"
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">login</button>
			</form>
		);
	};

	const newBlogForm = () => {
		return (
			<form onSubmit={handleNewBlog}>
				<div>title<input type="text" value={title} name="title"
								 onChange={({ target }) => setTitle(target.value)}/></div>
				<div>author<input type="text" value={author} name="author"
								  onChange={({ target }) => setAuthor(target.value)}/></div>
				<div>url<input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)}/>
				</div>
				<button type="submit">create</button>
			</form>
		);
	};

	if (user === null) {
		return (
			<div>
				<h2>Log in the app</h2>
				<p>{message}</p>
				{loginForm()}
			</div>
		);
	}

	return (
		<div>
			<h2>blogs</h2>
			<p>{message}</p>
			<p>{user.name} logged in <button onClick={handleLogout}>log out</button></p>
			<h2>create new blog</h2>
			{newBlogForm()}
			{blogs.map((blog) => <Blog key={blog.id} blog={blog}/>)}
		</div>
	);
};

export default App;
