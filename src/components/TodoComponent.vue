<template>
	<div class="todo-container">
		<input type="text" v-model="todoToAdd"><button @click="PUSH_AddTodo">Add</button>

		<div>
			<div @click="UPDATE_toggleCompleted({ id: todo.id })" v-for="todo in todos" :key="todo.id" :class="{ done : todo.done }">
				{{ todo.id }} | {{ todo.todo }} | {{ todo.done ? 'Done' : 'Not completed' }} |
				<span @click="deleteTodo({ id: todo.id })" > X </span>
			</div>
		</div>

		<button @click="changeDisplay('done')">Get Done</button>
		&nbsp;
		<button @click="changeDisplay('uncompleted')">Get Uncompleted</button>
		&nbsp;
		<button @click="changeDisplay('all')">All todos</button>
	</div>
</template>

<script>
import { mapGetters, mapActions/*, mapMutations*/ } from 'vuex'

export default {
	name: 'TodoComponent',
	data() {
		return {
			todoToAdd: null,
			todos: []
		}
	},
	methods: {
		changeDisplay(toDisplay) {
			if (toDisplay == 'done') this.todos = this.getDoneTodos
			else if (toDisplay == 'uncompleted') this.todos = this.getUncompletedTodos
			else if (toDisplay == 'all') this.todos = this.getTodos
		},/*
		//Pour utiliser les mutations on peut soit faire ça
		PUSH_AddTodo() {
			//this.$store.commit('addTodo', { todo: this.todoToAdd });
			//or
			this.$store.commit({
				type: 'addTodo',
				todo: this.todoToAdd
			});
		},
		//Oubien utiliser mapMutations. Dans ce cas le commit est fait automatiquement
		...mapMutations(['toggleCompleted', 'deleteTodo'])
		*/
		/**
		 * Mais la manière adéquate est d'utiliser les actions pour propager les actions dont on a besoin
		 * les actions se chargenront de faire le commit des mutations
		 * Cela nous permettra d'utiliser des operations asynchrones au niveau des actions
		 * ensuite faire un commit de la mutation vu qu'il ne faut pas faire d'operations
		 * asynchrones au niveau des mutations
		 */
		PUSH_AddTodo() {
			//this.$store.dispatch('addTodo', { todo: this.todoToAdd });
			//or
			this.$store.dispatch({
				type: 'addTodo', //L'action à dispatcher
				todo: this.todoToAdd
			});
		},
		UPDATE_toggleCompleted(payload) {
			this.$store.dispatch('toggleCompleted', payload)
				.then(response => {
					window.console.log(response);
				})
				.catch(err => {
					window.console.error(err);
				})
		},
		//On peut toujours utiliser mapActions pour aller vite
		...mapActions(['deleteTodo']),
	},
	computed: {
		doSomething() { //juste pour montrer qu'on peut mettre d'autres valeurs computed et mettre les getters avec ...mapGetters. Au lieu de mettre directement computed: mapGetters([...], [...]). Cette derniere peut etre utilisée si les donnes du getters sont les seules donnees computed pour ce composant
			return true;
		},
		...mapGetters(['getDoneTodos', 'getTodos', 'getUncompletedTodos'])
		//We can also use something like doneTodos: this.$state.getters.getDoneTodos
	},
	created() {
		this.todos = this.getTodos;
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
	text-align: left;
}

.done {
	color: green;
}
</style>
