import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const Toggleable = forwardRef((props, refs) => {
	const [visible, setVisible] = useState(false);

	const hideWhenVisible = { display: visible ? 'none' : '', margin: 20 };
	const showWhenVisible = { display: visible ? '' : 'none', margin: 20 };

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	useImperativeHandle(refs, () => {
		return {
			toggleVisibility
		};
	});

	return (
		<div>
			<div style={hideWhenVisible}>
				<Button variant="outlined" onClick={toggleVisibility}>{props.buttonLabel}</Button>
			</div>
			<div style={showWhenVisible}>
				{props.children}
				<Button variant="outlined" onClick={toggleVisibility}>cancel</Button>
			</div>
		</div>
	);
});

Toggleable.displayName = 'Toggleable';

Toggleable.propTypes = {
	buttonLabel: PropTypes.string,
	children: PropTypes.element
};

export default Toggleable;