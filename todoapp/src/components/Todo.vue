<template>
    <div class="list-group-item" v-bind:class="{'is-complete':todo.completed}">
        <input type="checkbox" v-on:change="markComplete"> {{todo.title}}
        <button class="close" @click="$emit('del-todo', todo.id)">X</button>
    </div>
</template>

<script>
    export default {
        name: "Todo",
        props: ["todo"],
        methods: {
            markComplete() {
                this.todo.completed = !this.todo.completed;
            }
        }
    }
</script>

<style scoped>
    .is-complete {
        text-decoration: line-through;
    }
</style>