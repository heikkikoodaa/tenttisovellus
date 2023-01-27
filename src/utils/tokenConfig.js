const tokenConfig = () => {
  return {
    headers: {
      Authorization: `bearer ${localStorage.getItem('tenttisovellus_token')}`,
    },
  };
};

module.exports = tokenConfig;
