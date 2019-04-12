<template>
    <div>
        <h1>Todos</h1>
        <div v-bind:key="todo.id" v-for="todo in todos" class="list-group">
            <h3>
                <Todo v-bind:todo="todo"/>
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