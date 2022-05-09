export const getProducts = (sortBy) => {
  return fetch(`/api/v1/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};