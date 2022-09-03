import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import anecdoteServices from "./services/anecdotes";
import { addAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		anecdoteServices
			.getAll()
			.then(anecdotes => dispatch(addAnecdotes(anecdotes)));
	}, [dispatch]);

	return (
		<div>
			<h2>Anecdotes</h2>
			<Filter/>
			<Notification/>
			<AnecdoteList/>
			<AnecdoteForm/>
		</div>
	)
}

export default App