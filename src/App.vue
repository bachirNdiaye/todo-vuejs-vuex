<template>
	<div id="app">
		<todo-component></todo-component>
	</div>
</template>

<script>
import TodoComponent from './components/TodoComponent.vue'

export default {
	name: 'app',
	components: {
		TodoComponent
	}
}
</script>

<style>
html, body {
	margin: 0;
	padding: 0;
}

#app {
	display: flex;
	justify-content: center;
	margin: 10% auto;
	font-size: 1.9em;
}
</style>
