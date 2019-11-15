import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
	},
	mutations: {
		addTodo: (state, payload) => {
			if (state.todos[0]) {
				let newTodoId = state.todos.reduce((maxId, todo) => todo.id > maxId ? todo.id : maxId, state.todos[0].id) + 1;
				state.todos.push({ id: newTodoId, todo: payload.todo, done: false });
			} else {
				state.todos.push({ id: 1, todo: payload.todo, done: false });
			}
		},
		deleteTodo: (state, payload) => {
			state.todos.splice(state.todos.findIndex(todo => todo.id == payload.id), 1);
		},
		toggleCompleted: (state, payload) => state.todos.filter(todo => todo.id == payload.id)[0].done = !state.todos.filter(todo => todo.id == payload.id)[0].done
	},
	getters: {
		getTodos: state => state.todos,
		getDoneTodos: state => state.todos.filter(todo => todo.done),
		getUncompletedTodos: state => state.todos.filter(todo => !todo.done)
	},
});