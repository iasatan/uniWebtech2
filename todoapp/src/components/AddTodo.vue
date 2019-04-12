<template>
    <div class="container-fluid">
        <form @submit="addTodo">
            <table class="table table-responsive">
                <tr>
                    <td>
                        <input type="text" name="title" v-model="title" placeholder="Add Todo" class="input-group-text">
                    </td>
                    <td>
                        <input type="submit" value="Submit" class="btn btn-dark">
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddTodo",
        data() {
            return {title: ""}
        }, methods: {
            addTodo() {

            }
        }
    }
</script>

<style scoped>

</style>