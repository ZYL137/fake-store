import axios from "axios";

const mainAxios = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const firebaseAxios = axios.create({
  baseURL: "https://us-central1-clone-76cf8.cloudfunctions.net/api",
});

export { mainAxios, firebaseAxios };
