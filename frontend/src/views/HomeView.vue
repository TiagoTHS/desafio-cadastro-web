<template>
  <div class="home-content">
    <h1>Olá, {{ user.name }}</h1>
    <div class="options">
      <router-link to="/edit">Editar Dados</router-link>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userKey } from "../global";

export default {
  name: "HomeView",
  computed: mapState(["user"]),
  methods: {
    logout() {
      localStorage.removeItem(userKey);
      this.$store.commit("setUser", null);
      this.$router.push({ name: "auth" });
    },
  },
};
</script>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  min-width: 250px;
}

.options {
  display: flex;
  justify-content: space-around;
}

.home-content h1 {
  text-align: center;
}

.options button,
a {
  border: 1px solid black;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  padding: 5px 15px;
  cursor: pointer;
}

.options a {
  background-color: #2460ae;
}

.options button {
  background-color: #dc3545;
}
</style>
