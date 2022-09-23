<template>
  <div class="edit-content">
    <div class="edit-modal">
      <h2>Olá, {{ userEdited.name }}</h2>
      <hr />
      <div class="edit-title">
        Editar {{ showChangePassword ? "Senha" : "Dados" }}
      </div>
      <template v-if="!showChangePassword">
        <span>Nome:</span>
        <input v-model="userEdited.name" type="text" placeholder="Nome" />
        <span>Email:</span>
        <input v-model="userEdited.email" type="text" placeholder="E-mail" />
        <span>País:</span>
        <input v-model="userEdited.country" type="text" placeholder="País" />
        <span>Estado:</span>
        <input v-model="userEdited.state" type="text" placeholder="Estado" />
        <span>Cidade:</span>
        <input v-model="userEdited.city" type="text" placeholder="Cidade" />
        <span>CEP:</span>
        <input
          v-model="userEdited.zipcode"
          type="text"
          v-maska="'########'"
          placeholder="CEP"
        />
        <span>Rua:</span>
        <input v-model="userEdited.street" type="text" placeholder="Rua" />
        <span>Número:</span>
        <input v-model="userEdited.number" type="number" placeholder="Número" />
        <span>Complemento:</span>
        <input
          v-model="userEdited.complement"
          type="text"
          placeholder="Complemento"
        />
        <span>CPF:</span>
        <input
          v-model="userEdited.cpf"
          type="text"
          v-maska="'###########'"
          placeholder="CPF"
        />
        <span>PIS:</span>
        <input
          v-model="userEdited.pis"
          type="text"
          v-maska="'###########'"
          placeholder="PIS"
        />

        <div class="options-buttons">
          <button class="delete-button" @click="deleteUser">
            Excluir Conta
          </button>
          <button
            class="change-button"
            @click="showChangePassword = !showChangePassword"
          >
            Mudar Senha
          </button>
          <button class="save-button" @click="saveEdit">Salvar</button>
        </div>
        <router-link to="/">Voltar</router-link>
      </template>
      <template v-else>
        <input
          v-model="newPass.password"
          type="password"
          placeholder="Nova Senha"
        />
        <input
          v-model="newPass.confirmPassword"
          type="password"
          placeholder="Confirme a Nova Senha"
        />
        <div class="options-buttons">
          <button
            class="delete-button"
            @click="showChangePassword = !showChangePassword"
          >
            Cancelar
          </button>
          <button class="save-button" @click="changePassword">Salvar</button>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { maska } from "maska";
import { mapState } from "vuex";
import { baseApiUrl, showError, userKey } from "../global";

export default {
  name: "EditView",
  directives: { maska },
  computed: mapState(["user"]),
  data() {
    return {
      toast: useToast(),
      userEdited: {},
      newUserStore: {},
      newPass: {},
      showChangePassword: false,
    };
  },
  methods: {
    loadUser() {
      const url = `${baseApiUrl}/users/${this.user.id}`;

      axios.get(url).then((res) => (this.userEdited = res.data));
    },
    updateStore() {
      this.newUserStore = { ...this.$store.state.user };
      this.newUserStore.name = this.userEdited.name;
      this.newUserStore.email = this.userEdited.email;
      this.$store.commit("setUser", this.newUserStore);
      localStorage.setItem(userKey, JSON.stringify(this.newUserStore));
    },
    saveEdit() {
      axios["put"](`${baseApiUrl}/users/${this.userEdited.id}`, this.userEdited)
        .then(() => {
          this.updateStore();
          this.toast.success("Operação realizada com sucesso!");
          this.loadUser();
        })
        .catch(showError);
    },
    changePassword() {
      axios
        .post(
          `${baseApiUrl}/users/${this.user.id}/changePassword`,
          this.newPass
        )
        .then(() => {
          this.toast.success("Operação realizada com sucesso!");
          this.newPass = {};
        })
        .catch(showError);
    },
    deleteUser() {
      axios
        .delete(`${baseApiUrl}/users/${this.user.id}`)
        .then(() => {
          this.toast.success("Operação realizada com sucesso!");
          localStorage.removeItem(userKey);
          this.$store.commit("setUser", null);
          this.$router.push({ name: "auth" });
        })
        .catch(showError);
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.edit-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 600px) {
  .edit-content {
    width: 350px;
  }
}

.edit-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-top: 10px;
  margin-bottom: 15px;
}

.edit-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 10px;
  padding: 3px 8px;
  outline: none;
}

.edit-modal a {
  margin-top: 35px;
}

.edit-modal hr {
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

.edit-modal span {
  font-size: 13px;
  font-weight: bold;
  align-self: flex-start;
  margin-left: -6px;
}

.options-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 3px 8px;
}

.options-buttons button {
  border: 1px solid black;
  border-radius: 5px;
  text-decoration: none;
  font-size: 16px;
  color: #fff;
  padding: 5px 15px;
  cursor: pointer;
}

.delete-button {
  background-color: #dc3545;
}

.change-button {
  background-color: #ffc107;
}

.save-button {
  background-color: #2460ae;
}
</style>
