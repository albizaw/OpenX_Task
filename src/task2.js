const axios = require('axios');

const getUsers = async () => {
  const response = await axios.get('https://fakestoreapi.com/users');
  return response.data;
};

const getUserById = async (userId) => {
  const users = await getUsers();
  return users.find((user) => user.id === userId);
};

const getCarts = async () => {
  const response = await axios.get(
    ' https://fakestoreapi.com/carts/?startdate=2000-01-01&enddate=2023-04-07'
  );
  return response.data;
};

const getProducts = async () => {
  const response = await axios.get(' https://fakestoreapi.com/products');
  return response.data;
};

const getProductById = async (productId) => {
  const products = await getProducts();
  const product = products.find((product) => product.id === productId);
  return product.price;
};

const getAllCategories = async () => {
  const products = await getProducts();
  const categoryTotals = {};

  products.forEach((product) => {
    const category = product.category;
    const price = product.price;

    category in categoryTotals
      ? (categoryTotals[category] += price)
      : (categoryTotals[category] = price);
  });

  return categoryTotals;
};

const getHighestCart = async () => {
  const carts = await getCarts();
  const products = await getProducts();
  let highestValue = 0;
  let highestCart = null;

  for (const cart of carts) {
    const cartValue = cart.products.reduce((acc, product) => {
      const productPrice = products.find((p) => p.id === product.productId);
      return acc + productPrice.price * product.quantity;
    }, 0);

    if (cartValue > highestValue) {
      highestValue = cartValue;
      highestCart = cart;
    }
  }

  if (!highestCart) {
    return null;
  }

  const user = await getUserById(highestCart.userId);
  const fullName = `${user.name.firstname} ${user.name.lastname}`;
  return { value: highestValue, fullName };
};

const theFurthestAway = async () => {
  const users = await getUsers();
  const locations = {};
  users.forEach(
    (user) =>
      (locations[user.id] = {
        lat: user.address.geolocation.lat,
        lng: user.address.geolocation.long,
      })
  );
  let maxDistance = 0;
  let maxDistanceUsers = null;

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users.length; j++) {
      const user1 = users[i];
      const user2 = users[j];

      const distance = Math.sqrt(
        Math.pow(locations[user1.id].lat - locations[user2.id].lat, 2) +
          Math.pow(locations[user1.id].lng - locations[user2.id].lng, 2)
      );

      if (distance > maxDistance) {
        maxDistance = distance;
        maxDistanceUsers = [
          { fullName: `${user1.name.firstname} ${user1.name.lastname}` },
          { fullName: `${user2.name.firstname} ${user2.name.lastname}` },
        ];
      }
    }
  }

  return [maxDistance, maxDistanceUsers];
};

const main = async () => {
  //all categories
  const categories = await getAllCategories();
  console.log('Categories: ', categories);

  //highest value in cart
  const carts = await getHighestCart();

  if (carts === null) {
    console.log('\n\nNo carts found');
  } else {
    console.log('\n\nCarts: ', carts);
  }

  //the furthest away
  const maxDistance = await theFurthestAway();
  console.log('\n\nThe furthest away: ', maxDistance);
};

main();

module.exports = {
  getUsers,
  getUserById,
  getCarts,
  getProducts,
  getProductById,
  getAllCategories,
  getHighestCart,
  theFurthestAway,
};
