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


// export const loginUser  = async (userData) =>{

//     const response  =  await api.post("/login", userData);
//     console.log(response.data)
//     return response.data;
    
// }

