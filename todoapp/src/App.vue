<template>
    <div id="app">
        <Header/>
        <AddTodo/>
        <Todos v-bind:todos="todos" v-on:del-todo="delTodo"/>
    </div>
</template>

<script>
    import Todos from './components/Todos'
    import Header from './components/layout/Header'
    import AddTodo from './components/AddTodo'

    export default {
        name: 'app',
        components: {
            Todos, Header, AddTodo
        },
        data() {
            return {
                todos: [{id: 1, title: "todo1", completed: false},
                    {id: 2, title: "todo2", completed: true},
                    {id: 3, title: "todo3", completed: false}
                ]
            }
        },
        methods: {
            delTodo(id) {
                this.todos = this.todos.filter(todo => todo.id !== id);
            }
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
