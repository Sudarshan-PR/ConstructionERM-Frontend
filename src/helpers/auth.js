export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  console.log("Logged user: ", user);
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

const getURL = () => {
  console.log("ENV: var", process.env.VUE_APP_DEV_ENV);
  if (process.env.VUE_APP_DEV_ENV === "local_dev") {
    return "http://localhost:8000";
  }
  return "https://construction-erm.herokuapp.com";
};

export const URL = getURL();
