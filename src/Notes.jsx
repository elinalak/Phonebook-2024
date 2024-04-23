import axios from "axios";
const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  return axios.get(baseUrls);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject);
};

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject);
};

console.log("getAll", getAll);
console.log("create", create);
console.log("update", update);

export default {
  getAll: getAll,
  create: create,
  update: update,
};
