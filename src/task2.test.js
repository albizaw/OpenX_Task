const {
  getUsers,
  getUserById,
  getCarts,
  getProducts,
  getProductById,
  getAllCategories,
  theFurthestAway,
} = require('./task2.js');

// getUsers function test
describe('getUsers', () => {
  it('should return an array of users', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
  });
});

// getUserById function test
describe('getUserById', () => {
  it('should return a user object', async () => {
    const user = await getUserById(1);
    expect(typeof user).toBe('object');
    expect(user.id).toBe(1);
  });

  it('should return undefined if the user is not found', async () => {
    const user = await getUserById(100);
    expect(user).toBeUndefined();
  });
});

// getCarts function test
describe('getCarts', () => {
  it('should return an array of carts', async () => {
    const carts = await getCarts();
    expect(Array.isArray(carts)).toBe(true);
  });
});

// getProducts function test
describe('getProducts', () => {
  it('should return an array of products', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });
});

// getProductById function test
describe('getProductById', () => {
  it('should return the price of the product with the specified id', async () => {
    const price = await getProductById(1);
    expect(typeof price).toBe('number');
  });
});

// getAllCategories function test
describe('getAllCategories', () => {
  it('should return an object with the total price for each category', async () => {
    const categories = await getAllCategories();
    expect(typeof categories).toBe('object');
    expect(Object.keys(categories).length).toBeGreaterThan(0);
  });
});

// theFurthestAway function test
describe('theFurthestAway', () => {
  it('should return an array with the maximum distance and an array of two user objects with fullName property', async () => {
    const result = await theFurthestAway();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(typeof result[0]).toBe('number');
    expect(Array.isArray(result[1])).toBe(true);
    expect(result[1].length).toBe(2);
    expect(typeof result[1][0].fullName).toBe('string');
    expect(typeof result[1][1].fullName).toBe('string');
  });
});
