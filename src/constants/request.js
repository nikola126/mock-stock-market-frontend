export const request = async (
  url,
  method,
  jsonForBackend,
  setResponse,
  setError,
  setLoading
) => {
  setLoading(true);

  console.log(url);

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify(jsonForBackend),
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.message) {
        setResponse(response);
      } else {
        setError(response.message);
      }
      setLoading(false);
      return response;
    });
};
