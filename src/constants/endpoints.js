export const endpoints = () => {
  // TODO Proxy this
  // TODO Separate configuration for development/production
  // const hostUrl = "http://159.223.28.181:8080";
  const hostUrl = "http://localhost:8080";

  return {
    userLogin: `${hostUrl}/users/login`,
    userRegister: `${hostUrl}/users/register`,
    userEdit: `${hostUrl}/users/edit`,
    userDelete: `${hostUrl}/users/delete`,
    stockGet: `${hostUrl}/stocks/get`,
    stockUpdate: `${hostUrl}/stocks/update`,
    assetsGet: `${hostUrl}/assets/get`,
    transactionAdd: `${hostUrl}/transactions/add`,
    transactionGet: `${hostUrl}/transactions/get`,
  };
};
