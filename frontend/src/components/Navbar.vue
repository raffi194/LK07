<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/posts">Posts</router-link>

    <!-- Tampilkan tombol sesuai status login -->
    <router-link v-if="!isLoggedIn" to="/register">Register</router-link>
    <router-link v-if="!isLoggedIn" to="/login">Login</router-link>
    <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../services/auth'

export default {
  setup() {
    const router = useRouter()
    const isLoggedIn = ref(!!localStorage.getItem('access_token'))

    // Fungsi logout → kirim request ke backend + hapus token
    const handleLogout = async () => {
      try {
        const token = localStorage.getItem('access_token')
        if (token) await logout()

        localStorage.removeItem('access_token')
        alert('Logout berhasil!')
        isLoggedIn.value = false

        // broadcast event global ke semua komponen
        window.dispatchEvent(new Event('auth-change'))

        router.push('/login')
      } catch (err) {
        console.error('Logout gagal:', err)
        alert('Terjadi kesalahan saat logout.')
      }
    }

    // Dengarkan event global untuk update status login
    const updateAuthState = () => {
      isLoggedIn.value = !!localStorage.getItem('access_token')
    }

    onMounted(() => {
      window.addEventListener('auth-change', updateAuthState)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('auth-change', updateAuthState)
    })

    return { handleLogout, isLoggedIn }
  },
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  background: #222;
  padding: 1rem;
}
a {
  color: white;
  text-decoration: none;
}
a.router-link-exact-active {
  font-weight: bold;
  color: yellow;
}
</style>
