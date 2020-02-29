<template>
    <div>
        <div v-bind:key="todo.id" v-for="todo in todos" class="list-group">
            <h3>
                <Todo v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)"/>
            </h3>
        </div>
    </div>
</template>

<script>
    import Todo from './Todo'

    export default {
        name: "Todos",
        components: {Todo},
        props: ["todos"]
    }
</script>

<style scoped>

</style>