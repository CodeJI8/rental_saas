import api from "./axios"


export const register = async (data) => {
  const response = await api.post("/register", {
    name: data.fullName,
    email: data.email,
    password: data.password,
    orgName: data.orgName,
  });

  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/login", data);
  return response.data;
};
