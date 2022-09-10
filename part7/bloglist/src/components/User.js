import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => {
	if (!user) {
		return null;
	}

	return (
		<div>
			<h2>{user.username}</h2>
			<p>added blogs</p>
			<ul>
				{user.blogs.map(blog =>
					<li key={blog.id}>{blog.title}</li>
				)}
			</ul>
		</div>
	);
};

User.propTypes = {
	user: PropTypes.object,
	username: PropTypes.string
};

export default User;