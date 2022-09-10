import React from 'react';
import { Link, Route, Routes, useMatch } from 'react-router-dom';
import Blogs from './Blogs';
import Users from './Users';
import { useSelector } from 'react-redux';
import User from './User';
import Blog from './Blog';

const Menu = () => {
	const style = {
		padding: 10
	};

	const users = useSelector(state => state.Users.users);
	const allBlogs = useSelector(state => state.Blogs.blogs);

	const userMatch = useMatch('/users/:id');
	const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null;

	const blogMatch = useMatch('/blogs/:id');
	const blog = blogMatch ? allBlogs.find(blog => blog.id === blogMatch.params.id) : null;

	return (
		<div>
			<div>
				<Link to="/" style={style}>home</Link>
				<Link to="/blogs" style={style}>blogs</Link>
				<Link to="/users" style={style}>users</Link>
			</div>
			<Routes>
				<Route path="/" element={<Blogs blogs={allBlogs} filter={false}/>}/>
				<Route path="/blogs" element={<Blogs blogs={allBlogs} filter={true}/>}/>
				<Route path="/blogs/:id" element={<Blog blog={blog}/>}/>
				<Route path="/users" element={<Users users={users}/>}/>
				<Route path="/users/:id" element={<User user={user}/>}/>
			</Routes>
		</div>
	);
};

export default Menu;