import { useToast } from "vue-toastification";

export const userKey = "__challenge_user";
export const baseApiUrl = "https://desafio-cadastro-web.onrender.com";

export function showError(e) {
  if (e && e.response && e.response.data) {
    useToast().error(e.response.data);
  } else if (typeof e === "string") {
    useToast().error(e);
  } else {
    useToast().error("Oops.. Erro inesperado.");
  }
}

export default { baseApiUrl, userKey };
