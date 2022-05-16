export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({ ...item, count: 1 });

    /**
     * remove duplicates
     * build an Array from new Set and turn it back into array using Array.from
     * so that later we can re-map it
     * new set will allow unique values in it
     * so pass the ids of each object/product
     * if the loop tries to add the same value again, it'll get ignored
     * ... with the array of ids we got on when first map() was used
     * run map() on it again and return the actual product form the caty
     */
    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      return cart.find((p) => p._id === id);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart')).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      return JSON.parse(localStorage.getItem('cart'));
    }
  }
  return [];
};

// TODO: update this function to work properly
// export const updateItem = (productId, count) => {
//   let cart = [];
//   if (typeof window !== 'undefined') {
//     if (localStorage.getItem('cart')) {
//       cart = JSON.parse(localStorage.getItem('cart'));
//     }

//     // cart.map((product, i) => {
//     //   if (product._id === productId) {
//     //     cart[i].count = count;
//     //   }
//     //   return cart;
//     // });

//     cart.map((product, i) =>
//       product._id === productId ? (cart[i].count = count) : cart
//     );
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }
// };

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
  }
  const updateCart = cart.map((item) =>
    item._id === productId ? { ...item, count } : item
  );
  localStorage.setItem('cart', JSON.stringify(updateCart));
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('cart')) {
      cart = JSON.parse(localStorage.getItem('cart'));
    }
  }
  let newCart = cart.filter((product) => product._id !== productId);
  localStorage.setItem('cart', JSON.stringify(newCart));
};

// TODO: Update cart total
