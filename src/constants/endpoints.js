export const endpoints = (hostUrl) => {
  
  return {
    userLogin: `${hostUrl}/users/login`,
    userRegister: `${hostUrl}/users/register`,
    userEdit: `${hostUrl}/users/edit`,
    userDelete: `${hostUrl}/users/delete`
  };
};
