<template>
    <div class="container">
        <h1>Latest Posts</h1>
        <div>
            <label for="create-post">Say something...</label>
            <input type="text" id="create-post" v-model="text" placeholder="Create a post">
            <input type="text" id="username" v-model="user" placeholder="Username">
            <button v-on:click="createPost">Post!</button>
        </div>
        <hr>
        <p class="error" v-if="error">{{error}}</p>
        <div class="container">
            <div class="post"
                 v-for="(post, index) in posts"
                 v-bind:key="post._id"
                 v-bind:item="post"
                 v-bind:index="index"
                 @dblclick="deletePost(post._id)"
            >
                {{post.createdAt}}
                <p class="text">{{post.text}}</p>
                {{post.user}}
            </div>
        </div>
    </div>
</template>

<script>
    import PostService from "../PostService"

    export default {
        name: 'PostComponent',
        data() {
            return {
                posts: [],
                error: '',
                text: '',
                user: '',
            }
        },
        methods: {
            async createPost() {
                await PostService.insertPost(this.text, this.user);
                this.posts = await PostService.getPosts();
            },
            async deletePost(id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
        },
        async created() {
            try {
                this.posts = await PostService.getPosts();
            } catch (e) {
                this.error = e.message;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.container {
        max-width: 800px;
        margin: 0 auto;
    }

    p.error {
        border: 1px solid #ff5b5f;
        background-color: #ffc5c1;
        padding: 10px;
        margin-bottom: 15px;
    }

    div.post {
        position: relative;
        border: 1px solid #5bd658;
        background-color: #bcffb8;
        padding: 10px 10px 30px 10px;
        margin-bottom: 15px;
    }

    div.created-at {
        position: absolute;
        top: 0;
        left: 0;
        padding: 5px 15px 5px 15px;
        background-color: darkgreen;
        color: white;
        font-size: 13px;
    }

    p.text {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 0;
    }
</style>
