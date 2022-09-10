import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Users = ({ users }) => {
	return (
		<div>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<td>usernames</td>
						<td>blogs created</td>
					</tr>
				</thead>
				<tbody>
					{users.map(user =>
						<tr key={user.id}>
							<td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
							<td>{user.blogs.length}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

Users.propTypes = {
	users: PropTypes.array
};

export default Users;