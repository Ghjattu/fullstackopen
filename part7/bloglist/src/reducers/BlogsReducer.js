import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setNotification } from './NotificationReducer';
import { updateUsersInfo } from './UsersReducer';

const blogsReducer = createSlice({
	name: 'Blogs',
	initialState: {
		blogs: [],
	},
	reducers: {
		setBlogs(state, action) {
			state.blogs = action.payload;
		},
		addBlog(state, action) {
			state.blogs.push(action.payload);
		},
		updateBlog(state, action) {
			const updatedBlog = action.payload;
			for (let i = 0; i < state.blogs.length; i++) {
				if (state.blogs[`${i}`].id === updatedBlog.id) {
					state.blogs[`${i}`] = updatedBlog;
				}
			}
		},
		deleteBlog(state, action) {
			const id = action.payload;
			state.blogs.forEach((blog, index, arr) => {
				if (blog.id === id) {
					arr.splice(index, 1);
				}
			});
		},
	}
});

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll();
		blogs.sort((a, b) => b.likes - a.likes);
		dispatch(setBlogs(blogs));
	};
};

export const createBlog = (newBlog) => {
	return async (dispatch) => {
		const savedBlog = await blogService.create(newBlog);
		dispatch(addBlog(savedBlog));
		dispatch(updateUsersInfo(savedBlog));
		dispatch(setNotification(`a new blog ${savedBlog.title} by ${savedBlog.author} added`));
	};
};

export const updateBlogLikes = (id, newBlog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(id, newBlog);
		dispatch(updateBlog(updatedBlog));
		dispatch(setNotification(`the blog ${updatedBlog.title} by ${updatedBlog.author} updated`));
	};
};

export const updateBlogComments = (id, newBlog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(id, newBlog);
		dispatch(updateBlog(updatedBlog));
		dispatch(setNotification(`the blog ${updatedBlog.title}'s comments updated`));
	};
};

export const deleteBlogById = (id) => {
	return async (dispatch) => {
		await blogService.deleteById(id);
		dispatch(deleteBlog(id));
		dispatch(setNotification('blog removed'));
	};
};

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogsReducer.actions;
export default blogsReducer.reducer;