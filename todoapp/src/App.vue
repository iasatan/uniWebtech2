<template>
    <div id="app">
        <Header/>
        <AddTodo v-on:add-todo="addTodo"/>
        <Todos v-bind:todos="todos" v-on:del-todo="delTodo"/>
    </div>
</template>

<script>
    import Todos from './components/Todos'
    import Header from './components/layout/Header'
    import AddTodo from './components/AddTodo'
    import axios from 'axios'

    export default {
        name: 'app',
        components: {
            Todos, Header, AddTodo
        },
        data() {
            return {
                todos: []
            }
        },
        methods: {
            delTodo(id) {
                axios.delete("https://jsonplaceholder.typicode.com/todos/" + id)
                    .then(this.todos = this.todos.filter(todo => todo.id !== id))
                    .catch(err => console.log(err))
            },
            addTodo(newTodo) {
                axios.post("https://jsonplaceholder.typicode.com/todos", newTodo)
                    .then(res => this.todos = [...this.todos, res.data])
                    .catch(err => console.log(err))
            }
        },
        created() {
            axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10")
                .then(res => this.todos = res.data)
                .catch(err => console.log(err))
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
