import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/users';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const register = async (newUser) => {
	const response = await axios.post(baseUrl, newUser);
	return response.data;
};

const usersService = { getAll, register };

export default usersService;