<template>
  <div class="form-container">
    <h2>Register</h2>
    <input v-model="name" placeholder="Name" />
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleRegister">Register</button>

    <p>
      Sudah punya akun?
      <router-link to="/login">Login di sini</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { register } from "../services/auth";

export default {
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const handleRegister = async () => {
      try {
        await register({
          name: name.value,
          email: email.value,
          password: password.value,
        });
        alert("Register berhasil! Silakan login.");
      } catch (err) {
        console.error(err);
        alert("Register gagal!");
      }
    };

    return { name, email, password, handleRegister };
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 50px auto;
  gap: 10px;
}
input {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  background: #42b883;
  color: white;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
