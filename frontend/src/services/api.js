import mockDb from './mockDb';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const API = {
  get: async (url, config) => {
    await delay(60);
    const data = mockDb.get(url);
    return { data };
  },
  post: async (url, body, config) => {
    await delay(100);
    try {
      const data = mockDb.post(url, body);
      return { data };
    } catch (err) {
      throw {
        response: {
          data: { message: err.message || 'Action failed' }
        }
      };
    }
  },
  put: async (url, body, config) => {
    await delay(100);
    const data = mockDb.put(url, body);
    return { data };
  },
  delete: async (url, config) => {
    await delay(80);
    const data = mockDb.delete(url);
    return { data };
  }
};

// Optional helper to check if admin is logged in
export const isAdminLoggedIn = () => {
  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');
  return !!(token && admin);
};

// Optional helper to log out
export const adminLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};

export default API;
