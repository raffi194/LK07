<template>
    <div>
        <h1>Posts</h1>
        <ul>
            <li v-for="post in posts" :key="post.id">
                {{ post.title }}
                <button @click="editPost(post.id)">Edit</button>
                <button @click="removePost(post.id)">Delete</button>
            </li>
        </ul>
        <input v-model="newTitle" placeholder="New post title" />
        <button @click="addPost">Add Post</button>
    </div>
</template>
<script>
import { ref, onMounted } from 'vue';
import { getPosts, createPost, updatePost, deletePost } from
    '../services/api';
export default {
    setup() {
        const posts = ref([]);
        const newTitle = ref('');
        // GET: ambil semua post
        const fetchPosts = async () => {
            try {
                const res = await getPosts();
                posts.value = res.data; // pastikan API mengembalikan array
            } catch (err) {
                console.error(err);
            }
        };
        // POST: tambah post baru
        const addPost = async () => {
            if (!newTitle.value) return;
            try {
                await createPost({ title: newTitle.value });
                newTitle.value = '';
                fetchPosts();
            } catch (err) {
                console.error(err);
            }
        };
        // PUT/PATCH: edit post
        const editPost = async (id) => {
            const updatedTitle = prompt('Enter new title:');
            if (!updatedTitle) return;

            try {
                // bisa pakai updatePost (PUT) atau patchPost (PATCH)
                await updatePost(id, { title: updatedTitle });
                fetchPosts();
            } catch (err) {
                console.error(err);
            }
        };
        // DELETE: hapus post
        const removePost = async (id) => {
            if (!confirm('Are you sure you want to delete this post?')) return;
            try {
                await deletePost(id);
                fetchPosts();
            } catch (err) {
                console.error(err);
            }
        };
        onMounted(fetchPosts);
        return { posts, newTitle, addPost, editPost, removePost };
    }
}
</script>