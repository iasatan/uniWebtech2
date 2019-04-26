import axios from 'axios';

const url = "api/posts/";

class PostService {
    //get
    static getPosts() {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const res = await axios.get(url);
                    const data = res.data;
                    resolve(
                        data.map(post => ({
                            ...post,
                            createdAt: new Date(post.createdAt)
                        }))
                    )
                } catch (e) {
                    reject(e);
                }
            }
        );
    }

    //create
    static insertPost(text, user) {
        return axios.post(url, {text, user})

    }

    //delete
    static deletePost(id) {
        return axios.delete(url + id);
    }
}

export default PostService;