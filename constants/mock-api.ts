////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { get } from 'http';
import { matchSorter } from 'match-sorter'; // For filtering

// Define the shape of User data

type Gender = 'male' | 'female';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username : string;
  achievement: string;
  status: string;
  badge: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ['male', 'female'];
      const jobs = [
        'Software Engineer',
        'Data Scientist',
        'Marketing Manager',
        'Graphic Designer',
        'Sales Manager',
        'Product Manager'
      ];
      const cities = [
        'San Francisco',
        'New York City',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'Philadelphia',
        'San Antonio',
        'San Diego',
        'Dallas',
        'San Jose',
        'Austin',
        'Jacksonville'
      ];
      const states = [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'North Carolina',
        'Michigan'
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        username: faker.internet.userName(),
        achievement: faker.helpers.arrayElement(['leaner', 'senior', 'junior']),
        status: faker.helpers.arrayElement(['active', 'block']),
        badge: faker.helpers.arrayElement(['gold', 'silver', 'bronze']),
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: 'USA',
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: '1980-01-01', to: '2000-01-01' })
          .toISOString()
          .split('T')[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 830; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    badges = [],
    search
  }: {
    badges?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected badges
    if (badges.length > 0) {
      users = users.filter((user) => badges.includes(user.badge));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          'username',
          'email',
          'badge',
          'phone'
        ]
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    badges,
    search
  }: {
    page?: number;
    limit?: number;
    badges?: string;
    search?: string;
  }) {
    const badgeArray = badges ? badges.split('.') : [];
    const allUsers = await this.getAll({ badges: badgeArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

// Initialize sample users
fakeUsers.initialize();

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

// Initialize sample products
fakeProducts.initialize();


type status = 'active' | 'block';
export type Forum = {
  id: number;
  uuid: string;
  slug: string;
  title: string;
  status: string;
  username: string;
};

export const fakeForum = {
  records: [] as Forum[], // Holds the list of forum objects

  // Initialize with sample data
  initialize() {
    const sampleForums: Forum[] = [];
    function generateRandomForumData(id: number): Forum {
      return {
        id,
        uuid: faker.string.uuid(),
        slug: faker.helpers.slugify(faker.lorem.words(3)),
        title: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['active', 'block']) as status,
        username: faker.person.fullName()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 500; i++) {
      sampleForums.push(generateRandomForumData(i));
    }

    this.records = sampleForums;
  },

  // Get all forums with optional search
  async getAll({
    search,
    status = [],
  }: {
    search?: string;
    status?: string[];
  }) {

    let forums = [...this.records];

    // Filter forums based on selected status
    if (status.length > 0) {
      forums = forums.filter((forum) => status.includes(forum.status));
    }
    // Search functionality across multiple fields
    if (search) {
      forums = matchSorter(forums, search, {
        keys: ['title', 'slug', 'username']
      });
    }

    return forums;
  },

  async getForumById(id: number) {

    // Find the forum by its ID
    const forum = this.records.find((forum) => forum.id === id);

    if (!forum) {
      return {
        success: false,
        message: `Forum with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      forum,
      message: `Forum with ID ${id} found`,
    }
  },

  // Get paginated results with optional search
  async getForums({
    page = 1,
    limit = 10,
    search,
    status
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) {
    const statusArray = status ? status.split('.') : [];

    const allForums = await this.getAll({ search, status: statusArray });
    const totalForums = allForums.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedForums = allForums.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_forums: totalForums,
      offset,
      limit,
      forums: paginatedForums
    };
  },

  // deleteForum(id: number)
  async deleteForum(id: number) {
    // Find the forum by its ID
    const forum = this.records.find((forum) => forum.id === id);

    if (!forum) {
      return {
        success: false,
        message: `Forum with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Forum with ID ${id} deleted`,
    }
  }, 

  // block forum and change status to block
  async blockForum(id: number) {
    // Find the forum by its ID
    const forum = this.records.find((forum) => forum.id === id);

    if (!forum) {
      return {
        success: false,
        message: `Forum with ID ${id} not found`
      };
    }

    forum.status = 'block';

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Forum with ID ${id} blocked`,
    }
  },
  
}

// Initialize sample forums
fakeForum.initialize();

// Define the shape of Order data
export type Article = {
  id: number;
  uuid: string;
  slug: string;
  title: string;
  status: string;
  username: string;
}

export const fakeArticle = {
  records: [] as Article[], // Holds the list of article objects

  // Initialize with sample data
  initialize() {
    const sampleArticles: Article[] = [];
    function generateRandomArticleData(id: number): Article {
      return {
        id,
        uuid: faker.string.uuid(),
        slug: faker.helpers.slugify(faker.lorem.words(3)),
        title: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['active', 'block']) as status,
        username: faker.person.fullName()
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 237; i++) {
      sampleArticles.push(generateRandomArticleData(i));
    }

    this.records = sampleArticles;
  },

  // Get all articles with optional search
  async getAll({
    search,
    status = [],
  }: {
    search?: string;
    status?: string[];
  }) {

    let articles = [...this.records];

    // Filter articles based on selected status
    if (status.length > 0) {
      articles = articles.filter((article) => status.includes(article.status));
    }
    // Search functionality across multiple fields
    if (search) {
      articles = matchSorter(articles, search, {
        keys: ['title', 'slug', 'username']
      });
    }

    return articles;
  },

  async getArticleById(id: number) {

    // Find the article by its ID
    const article = this.records.find((article) => article.id === id);

    if (!article) {
      return {
        success: false,
        message: `Article with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      article,
      message: `Article with ID ${id} found`,
    }
  },

  // Get paginated results with optional search
  async getArticles({
    page = 1,
    limit = 10,
    search,
    status
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }) {
    const statusArray = status ? status.split('.') : [];

    const allArticles = await this.getAll({ search, status: statusArray });
    const totalArticles = allArticles.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedArticles = allArticles.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_articles: totalArticles,
      offset,
      limit,
      articles: paginatedArticles
    };

  }
}

// Initialize sample articles
fakeArticle.initialize();