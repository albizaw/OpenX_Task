const axios = require('axios');

let users, carts, products;

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

const main = async () => {
  const categories = await getAllCategories();
  console.log('Categories: ', categories);

  const carts = await getHighestCart();

  if (carts === null) {
    console.log('No carts found');
  } else {
    console.log('Carts: ', carts);
  }
};

main();
