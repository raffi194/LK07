import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Posts from "../views/Posts.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/posts", component: Posts },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Route Guard
router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = !!localStorage.getItem("access_token");

  // Jika belum login dan mencoba masuk ke halaman privat
  if (authRequired && !loggedIn) {
    return next("/login");
  }

  // Jika sudah login dan mencoba buka login/register
  if ((to.path === "/login" || to.path === "/register") && loggedIn) {
    return next("/");
  }

  next();
});

export default router;
  