import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { setMessage } from './NotificationReducer';

const blogReducer = createSlice({
	name: 'Blogs',
	initialState: {
		blogs: [],
		visible: []
	},
	reducers: {
		setBlogs(state, action) {
			state.blogs.push(...action.payload);
			const temp = new Array(action.payload.length).fill(false);
			state.visible.push(...temp);
		},
		addBlog(state, action) {
			state.blogs.push(action.payload);
			state.visible.push(false);
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
					state.visible.splice(index, 1);
				}
			});
		},
		updateVisible(state, action) {
			const idx = action.payload;
			state.visible[`${idx}`] = !state.visible[`${idx}`];
		}
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
		dispatch(setMessage(`a new blog ${savedBlog.title} by ${savedBlog.author} added`));
		setTimeout(() => dispatch(setMessage(null)), 3000);
	};
};

export const updateBlogLikes = (id, newBlog) => {
	return async (dispatch) => {
		const updatedBlog = await blogService.update(id, newBlog);
		dispatch(updateBlog(updatedBlog));
		dispatch(setMessage(`the blog ${updatedBlog.title} by ${updatedBlog.author} updated`));
		setTimeout(() => dispatch(setMessage(null)), 3000);
	};
};

export const deleteBlogById = (id) => {
	return async (dispatch) => {
		await blogService.deleteById(id);
		dispatch(deleteBlog(id));
		dispatch(setMessage('blog removed'));
		setTimeout(() => dispatch(setMessage(null)), 3000);
	};
};

export const { setBlogs, addBlog, updateBlog, deleteBlog, updateVisible } = blogReducer.actions;
export default blogReducer.reducer;