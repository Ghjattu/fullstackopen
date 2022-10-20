interface HeaderType {
    name: string
}

const Header = (props: HeaderType) => {
	return (
		<div>
			<h1>{props.name}</h1>
		</div>
	);
};

export default Header;