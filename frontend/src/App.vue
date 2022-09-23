<template>
  <div id="app">
    <LoadingItem v-if="validatingToken" />
    <ContentItem v-else />
    <FooterItem />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";
import ContentItem from "./components/template/Content.vue";
import FooterItem from "./components/template/Footer.vue";
import LoadingItem from "./components/template/Loading.vue";

export default {
  name: "App",
  components: { ContentItem, FooterItem, LoadingItem },
  computed: mapState(["user"]),
  data() {
    return {
      validatingToken: true,
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);
      if (!userData) {
        this.validatingToken = false;
        this.$router.push({ name: "auth" });
        return;
      }
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }
      this.validatingToken = false;
    },
  },
  created() {
    this.validateToken();
  },
};
</script>

<style>
* {
  font-family: "Roboto", sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

body {
  margin: 0;
}
</style>
