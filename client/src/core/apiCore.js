import queryString from 'query-string';

export const getProducts = (sortBy) => {
  return fetch(`/api/v1/products?sortBy=${sortBy}&order=desc&limit=6`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const getCategories = () => {
  return fetch(`/api/v1/categories`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

// TODO: filters doesn't seem to work perfectly
// TODO: This method return all product on every search! Inspect backend for the bug
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = { limit, skip, filters };

  return fetch(`/api/v1/products/by/search`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log({ params, query });
  return fetch(`/api/v1/products/search?${query}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`/api/v1/product/${productId}`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
  return fetch(`/api/v1/products/related/${productId}`, { method: 'GET' })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
