<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />         <!-- Navbar di atas -->
    <router-view />    <!-- Tempat halaman berubah -->
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
