import axios from "axios";
const API_URL = "http://localhost:4500";
const addUser = (data) => {
  // console.log(data);
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "/users/add", data, { headers: headers });
};
const listUser = () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "/users/list", { headers: headers });
};
const deleteUser = (data) => {
  const user_id = {
    user_id: data,
  };
  // console.log(user_id)
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(API_URL + "/users/delete", user_id, { headers: headers });
};
const detailsUser = (user_id) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.get(API_URL + "/users/details/" + user_id, {
    headers: headers,
  });
};

const updateUser = (data) => {

  const headers = {
    "Content-Type": "application/json",
  };
  return axios.put(API_URL + "/users/update", data, { headers: headers });
};

const UserServices = {
  addUser,
  listUser,
  deleteUser,
  detailsUser,
  updateUser
};
export default UserServices;
