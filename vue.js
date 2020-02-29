javascript framework
frontend

//sudo npm install -g @vue/cli 
sudo yarn global add @vue/cli

///vue create test
vue ui
csinálj projektet
webstrom import
npm serve 
src/public/index.html tölt be
src/main.js csinálja
------------------------------------------------------------------------------------------
APP:VUE

App.vue az alapja
3 rész:
template:html
script: js
style: css
template: logo+helloworld
helloworld-öt importáljuk scriptben
és megadjuk az export default-ban hogy használjuk mint komponenst
kép törlése, az app frissül magától
msg: prop amit átadunk a komponensnek

helloworld.vue
{{msg}}
többi csak hard coded html
töröljük a div-ben lévő dolgokat, a div-et ne, az fontos, max 1 db lehet
sytel scoped:
csak abban a scope-ban érvényes
------------------------------------------------------------------------------------------
npm i vue bootstrap-vue bootstrap
// main.js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
------------------------------------------------------------------------------------------
töröljük a helloworld komponenst app.vue-ból

data() {
            return {
                todos: [
                    {
                        id: 1,
                        title: "todo 1",
                        completed: false
                    },
                    {
                        id: 2,
                        title: "todo 2",
                        completed: true
                    },
                    {
                        id: 3,
                        title: "todo 3",
                        completed: false
                    }

                ]
            }
        }

------------------------------------------------------------------------------------------
hozzunk létre egy Todos vue komponenst
templatebe: div és h1 Todos
app.vue-ban:
import Todos from "./components/Todos"
components:{Todos}
template: <Todos/>
------------------------------------------------------------------------------------------
Átadjuk a todo-kat a komponensnek

app.vue:
<Todos v-bind:todos="todos"/>

Todos.vue:
name:Todos,
props:["todos"]

<template>
    <div>
        <div v-bind:key="todo.id" v-for="todo in todos">
            <h3>{{todo.title}}</h3>
        </div>
    </div>
</template>

------------------------------------------------------------------------------------------
TodoItem.vue komponens
<template>
    <div>
        <p>Todo Item</p>
    </div>
</template>
Todo.vue:
import
component
template <TodoItem/>

<TodoItem v-bind:todo="todo"/>

<template>
    <div class=list-group-item>
        <p>{{todo.title}}</p>
    </div>
</template>

<script>
    export default {
        name: "TodoItem",
        props: ["todo"]
    }
</script>
<div v-bind:key="todo.id" v-for="todo in todos" class="list-group">
<div class="list-group-item" v-bind:class="{'disabled':todo.completed}">
------------------------------------------------------------------------------------------
<div class="list-group-item" v-bind:class="{'disabled':todo.completed}">
        <input type="checkbox" v-on:change="markComplete">
        {{todo.title}}
    </div>
    ///
------------------------------------------------------------------------------------------
name: "TodoItem",
        props: ["todo"],
        methods: {
            markComplete() {
                console.log(123);
            }
        }




         this.todo.completed = !this.todo.completed;
------------------------------------------------------------------------------------------


<template>
    <div class="list-group-item" v-bind:class="{'is_complete':todo.completed}">
        <p>{{todo.title}}</p>
    </div>
</template>


<style scoped>
    .is_complete {
        text-decoration: line-through;
    }
</style>
------------------------------------------------------------------------------------------
<button class="close">x</button>
//
<button class="close" @click="$emit('del-todo', todo.id )">x</button>
//
vue dev tool event

<TodoItem v-bind:todo="todo" v-on:del-todo="$emit('del-todo', todo.id)"/>
vue dev tool event
<Todos v-bind:todos="todos" v-on:del-todo="delTodo"/>

methods: {
            delTodo(id) {
                this.todos = this.todos.filter(todo => todo.id !== id)
            }
        }
------------------------------------------------------------------------------------------
layout folder
header.vue
<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand href="#">Todolist</b-navbar-brand>
        </b-navbar>
    </div>

</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>

behúz app.vue-ban
------------------------------------------------------------------------------------------
<template>
    <div class="container-fluid">
        <form>
            <table class="table table-responsive">
                <tr>
                    <td><input type="text" name="title" placeholder="Add Todo" class="input-group-text"></td>
                    <td><input type="submit" value="Submit" class="btn btn-dark"></td>
                </tr>
            </table>


        </form>
    </div>
</template>

<script>
    export default {
        name: "AddTodo"
    }
</script>

<style scoped>

</style>
------------------------------------------------------------------------------------------
<td><input type="text" name="title" v-model="title" placeholder="Add Todo" class="input-group-text">
                    </td>

                   //
   data(){
   	return title:""
   }


   <form @submit="addTodo">
------------------------------------------------------------------------------------------
npm i uuid

methods: {
            addTodo(e) {
            	e.preventDefault()
                const newTodo = {
                    id: uuid.v4(),
                    title: this.title,
                    completed: false
                };
                this.$emit("add-todo", newTodo);
                this.title="";
            }
        }

<AddTodo v-on:add-todo="addTodo"/>

,
addTodo(newTodo) {
    this.todos = [...this.todos, newTodo];
}
------------------------------------------------------------------------------------------
https://jsonplaceholder.typicode.com 
empty todos in App.vue
npm i axios
,
created() {
    axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(res => this.todos = res.data)
        .catch(err => console.log(err));
}

https://jsonplaceholder.typicode.com/todos?_limit=10
remove id and uuid from addtodo 
addTodo(newTodo) {
	const {title, completed} = newTodo;
    axios.post("https://jsonplaceholder.typicode.com/todos", {title, completed})
    .then(res => this.todos = [...this.todos, res.data])
    .catch(err => console.log(err))
    //this.todos = [...this.todos, newTodo];
}

delTodo(id) {
    axios.delete("https://jsonplaceholder.typicode.com/todos/" + id)
        .then(() => this.todos = this.todos.filter(todo => todo.id !== id))
        .catch(err => console.log(err))

},
------------------------------------------------------------------------------------------
save app.vue Home.vue-ba
add vue router
új fájl: router.js
kicserélni a Home.vue-ra a /views/Home-ot
------------------------------------------------------------------------------------------
Header kiszedése a homeból
átrakása az app.vue-ba
header kiegészítése

<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-brand href="#">Todolist</b-navbar-brand>
            <b-navbar-nav id="nav">
                <b-nav-item>
                    <router-link to="/">Home</router-link>
                </b-nav-item>
                <b-nav-item>
                    <router-link to="/about">About</router-link>
                </b-nav-item>

            </b-navbar-nav>
        </b-navbar>
        <router-view/>
    </div>

</template>
------------------------------------------------------------------------------------------
task build kész
------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------

