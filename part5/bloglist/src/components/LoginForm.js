import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit, handleUsernameChange, handlePasswordChange, username, password }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				username
				<input
					type="text"
					value={username}
					name="Username"
					onChange={handleUsernameChange}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={handlePasswordChange}
				/>
			</div>
			<button type="submit">login</button>
		</form>
	);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func,
	handleUsernameChange: PropTypes.func,
	handlePasswordChange: PropTypes.func,
	username: PropTypes.string,
	password: PropTypes.string
};

export default LoginForm;