import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getPersons = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

export const create = (name, number) => {
  const newNameObject = { name, number };

  const request = axios.post(baseUrl, newNameObject);

  return request.then((response) => response.data);
};

export const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request.then((response) => response.data);
};

export const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);

  return request.then((response) => response.data);
};
