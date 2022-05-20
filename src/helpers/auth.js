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

// export const URL = "https://construction-erm.herokuapp.com";
export const URL = "http://192.168.1.34:8000";
// export const URL = "http://localhost:8000";
//
