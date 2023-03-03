const store = {};

export default {
  getItem: (key) => store[key],
  setItem: (key, value) => {
    store[key] = value;
  },
};
