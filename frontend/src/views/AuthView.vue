<template>
  <div class="auth-content">
    <div class="auth-modal">
      <h1>Olá, Visitante</h1>
      <hr />
      <div class="auth-title">{{ showSignup ? "Cadastro" : "Login" }}</div>

      <input
        v-if="!showSignup"
        v-model="user.login"
        type="text"
        placeholder="E-mail, CPF ou PIS"
      />
      <input
        v-if="!showSignup"
        v-model="user.password"
        type="password"
        placeholder="Senha"
      />
      <template v-if="showSignup">
        <input v-model="user.name" type="text" placeholder="Nome" />
        <input v-model="user.email" type="text" placeholder="E-mail" />
        <input v-model="user.password" type="password" placeholder="Senha" />
        <input
          v-model="user.confirmPassword"
          type="password"
          placeholder="Confirme a Senha"
        />
        <input v-model="user.country" type="text" placeholder="País" />
        <input v-model="user.state" type="text" placeholder="Estado" />
        <input v-model="user.city" type="text" placeholder="Cidade" />
        <input
          v-model="user.zipcode"
          type="text"
          v-maska="'#*'"
          placeholder="CEP"
        />
        <input v-model="user.street" type="text" placeholder="Rua" />
        <input
          v-model="user.number"
          type="text"
          v-maska="'#*'"
          placeholder="Número"
        />
        <input
          v-model="user.complement"
          type="text"
          placeholder="Complemento"
        />
        <input
          v-model="user.cpf"
          type="text"
          v-maska="'###########'"
          placeholder="CPF"
        />
        <input
          v-model="user.pis"
          type="text"
          v-maska="'###########'"
          placeholder="PIS"
        />
      </template>

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin">Entrar</button>

      <a href @click.prevent="changeMode">
        <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span>
      </a>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { maska } from "maska";
import { baseApiUrl, showError, userKey } from "@/global";
import axios from "axios";

export default {
  name: "AuthView",
  directives: { maska },
  data() {
    return {
      toast: useToast(),
      showSignup: false,
      user: {},
    };
  },
  methods: {
    changeMode() {
      this.user = {};
      this.showSignup = !this.showSignup;
    },
    signin() {
      axios
        .post(`${baseApiUrl}/signin`, this.user)
        .then((res) => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data));
          this.$router.push({ path: "/" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.toast.success("Operação realizada com sucesso!");
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    },
  },
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .auth-content {
    width: 350px;
  }
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.auth-modal input {
  border: 1px solid #bbb;
  border-radius: 2px;
  font-size: 14px;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  border: 1px solid black;
  border-radius: 5px;
  align-self: center;
  background-color: #2460ae;
  color: #fff;
  font-size: 14px;
  padding: 5px 15px;
  cursor: pointer;
}

.auth-modal a {
  margin-top: 35px;
}

.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>
