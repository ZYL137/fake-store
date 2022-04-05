import axios from "axios";

const mainAxios = axios.create({
  baseURL: "https://fakestoreapi.com",
});

const firebaseAxios = axios.create({
  baseURL: "https://us-central1-fake-store-4dd9e.cloudfunctions.net/api",
});

export { mainAxios, firebaseAxios };
