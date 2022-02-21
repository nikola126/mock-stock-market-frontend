export const endpoints = () => {
  const hostUrl = "http://localhost:8080";
  
  return {
    userLogin: `${hostUrl}/users/login`,
    userRegister: `${hostUrl}/users/register`,
    userEdit: `${hostUrl}/users/edit`,
    userDelete: `${hostUrl}/users/delete`
  };
};