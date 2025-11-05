<template>
  <div class="form-container">
    <h2>Login</h2>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleLogin">Login</button>

    <p>
      Belum punya akun?
      <router-link to="/register">Daftar di sini</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";
import { login } from "../services/auth";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");

    const handleLogin = async () => {
      try {
        const res = await login({
          email: email.value,
          password: password.value,
        });
        // Simpan token di localStorage
        localStorage.setItem("access_token", res.data.access_token);
        alert("Login berhasil!");
        router.push("/"); // redirect ke home
      } catch (err) {
        console.error(err);
        alert("Login gagal!");
      }
    };

    return { email, password, handleLogin };
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
