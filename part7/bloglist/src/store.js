import { configureStore } from '@reduxjs/toolkit';
import blogFormReducer from './reducers/BlogFormReducer';
import loginFormReducer from './reducers/LoginFormReducer';
import notificationReducer from './reducers/NotificationReducer';
import blogReducer from './reducers/BlogReducer';

export default configureStore({
	reducer: {
		BlogForm: blogFormReducer,
		LoginForm: loginFormReducer,
		Notification: notificationReducer,
		Blogs: blogReducer
	}
});