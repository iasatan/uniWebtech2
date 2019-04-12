<template>
    <div id="app">
        <Todos v-bind:todos="todos"/>
    </div>
</template>

<script>
    import Todos from './components/Todos'

    export default {
        name: 'app',
        components: {
            Todos
        },
        data() {
            return {
                todos: [{id: 1, title: "todo1", completed: false},
                    {id: 2, title: "todo2", completed: true},
                    {id: 3, title: "todo3", completed: false}
                ]
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
        margin-top: 60px;
    }
</style>
