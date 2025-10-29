<template>
  <div class="container">
    <h1>📋 To-Do List Real CRUD</h1>

    <div class="input-section">
      <input v-model="newTitle" placeholder="Tulis kegiatan baru..." />
      <button @click="addPost">Tambah</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Judul</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>
            <span :class="post.status">{{ post.status }}</span>
          </td>
          <td>
            <button @click="editPost(post.id)">✏️ Edit</button>
            <button @click="removePost(post.id)">🗑️ Hapus</button>
            <button @click="markDone(post.id)" v-if="post.status !== 'done'">✅ Selesai</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getPosts, createPost, updatePost, patchPost, deletePost } from '../services/api';

export default {
  setup() {
    const posts = ref([]);
    const newTitle = ref('');

    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        posts.value = res.data;
      } catch (err) {
        console.error('Gagal mengambil data:', err);
      }
    };

    const addPost = async () => {
      if (!newTitle.value.trim()) return alert('Judul tidak boleh kosong!');
      await createPost({ title: newTitle.value });
      newTitle.value = '';
      fetchPosts();
    };

    const editPost = async (id) => {
      const title = prompt('Masukkan judul baru:');
      if (!title) return;
      await updatePost(id, { title, status: 'pending' });
      fetchPosts();
    };

    const markDone = async (id) => {
      await patchPost(id, { status: 'done' });
      fetchPosts();
    };

    const removePost = async (id) => {
      if (confirm('Yakin ingin menghapus data ini?')) {
        await deletePost(id);
        fetchPosts();
      }
    };

    onMounted(fetchPosts);

    return { posts, newTitle, addPost, editPost, markDone, removePost };
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  text-align: center;
  font-family: "Quicksand", sans-serif;
}
input {
  padding: 8px;
  width: 60%;
  border: 1px solid #ccc;
  border-radius: 6px;
}
button {
  margin-left: 8px;
  background-color: #42b883;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #2c9c6a;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th {
  background: #42b883;
  color: white;
  padding: 8px;
}
td {
  border: 1px solid #ccc;
  padding: 8px;
}
.done {
  color: green;
  font-weight: bold;
}
.pending {
  color: orange;
  font-weight: bold;
}
</style>
