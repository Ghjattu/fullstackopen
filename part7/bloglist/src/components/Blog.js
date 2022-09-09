import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBlogById, updateBlogLikes, updateVisible } from '../reducers/BlogReducer';

const style = {
	border: '1px solid black',
	margin: '10px 0'
};

const Blog = () => {
	const dispatch = useDispatch();

	const visible = useSelector(state => state.Blogs.visible);
	const blogs = useSelector(state => state.Blogs.blogs);

	const handleVisibleButtonClick = (idx) => {
		dispatch(updateVisible(idx));
	};

	const handleLikeButtonClick = (id, oldBlog) => {
		const newBlog = { ...oldBlog, likes: oldBlog.likes + 1 };
		dispatch(updateBlogLikes(id, newBlog));
	};

	const handleRemoveButtonClick = (id, title, author) => {
		if (window.confirm(`Remove blog ${title} by ${author}?`)) {
			dispatch(deleteBlogById(id));
		}
	};

	return (
		<div>
			{blogs.map((blog, index) =>
				<div key={blog.id} style={style} className="blog">
					<p>
						{blog.author}: {blog.title}
						<button onClick={() => handleVisibleButtonClick(index)}>
							{visible[`${index}`] ? 'hide' : 'view'}
						</button>
					</p>
					{visible[`${index}`] && <div className="toggleable-content">
						<p>{blog.url}</p>
						<p>likes {blog.likes} <button onClick={() => handleLikeButtonClick(blog.id, blog)}>like</button></p>
						<button onClick={() => handleRemoveButtonClick(blog.id, blog.title, blog.author)}>remove</button>
					</div>}
				</div>
			)}
		</div>
	);
};

export default Blog;
