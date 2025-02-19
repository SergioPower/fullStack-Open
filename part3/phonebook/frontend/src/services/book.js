import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
}

const update = (id, updatedPerson) => {
  return axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);
};
export default { getAll, create, deletePerson, update };