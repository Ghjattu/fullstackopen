import { configureStore } from '@reduxjs/toolkit';
import blogFormReducer from './reducers/BlogFormReducer';
import loginFormReducer from './reducers/LoginFormReducer';
import notificationReducer from './reducers/NotificationReducer';
import blogsReducer from './reducers/BlogsReducer';
import userReducer from './reducers/UserReducer';
import registerFormReducer from './reducers/RegisterFormReducer';
import usersReducer from './reducers/UsersReducer';

export default configureStore({
	reducer: {
		BlogForm: blogFormReducer,
		LoginForm: loginFormReducer,
		RegisterForm: registerFormReducer,
		Notification: notificationReducer,
		Blogs: blogsReducer,
		User: userReducer,
		Users: usersReducer
	}
});