import payments from './data/payments';

const fetch = (mockData, time = 1500) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });
};

export default {
  getPayments() {
    return fetch(payments);
  },
};
