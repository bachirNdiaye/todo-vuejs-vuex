import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		todos: [],
	},
	mutations: { /** IMPORTANT: mutations must not have ascynchronous operation. If we want to call an API for example, we have to do it using actions then we commit a mutation */
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
	actions: {
		/**
		 * - Context is passed to actions and it is an object that contains
		 * all the properties of state. We dispatch an action when needed
		 * and it commit a mutations
		 * - It is not possible to do an asynchronous operation inside mutations
		 * but we can handle asynchronous here inside the actions and commit mutation
		 * when our asynchrounous operation is resolved. It's more powerful when we
		 * use 'async' and 'await'
		 */
		addTodo(context, payload) {
			//We simulate asynchronous operation
			setTimeout(() => {
				context.commit('addTodo', payload);
			}, 1000);
		},
		deleteTodo({ commit }, payload) { //Ici on utilise la destructuration d'argument afin de pouvoir utiliser directement commit sans faire contexr.commit
			setTimeout(() => {
				commit('deleteTodo', payload);
			}, 1000);
		},
		toggleCompleted({ commit }, payload) {
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					if (payload) {
						commit('toggleCompleted', payload);
						resolve(`Todo ${payload.id} state changed`);
					} else {
						reject(`Error while updated todo ${payload.id} state: NO payload`);
					}
				}, 1000);
			});
		}
	},
	getters: {
		getTodos: state => state.todos,
		getDoneTodos: state => state.todos.filter(todo => todo.done),
		getUncompletedTodos: state => state.todos.filter(todo => !todo.done)
	},
});