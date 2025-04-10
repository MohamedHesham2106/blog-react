import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

export const useAuth = create((set) => ({
  isAuthenticated: false,
  token: null,
  userId: null,

  setAuth: (token) => {
    console.log(token);

    let decodedToken;
    try {
      decodedToken = jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      set({
        isAuthenticated: false,
        token: null,
        userId: null,
      });
      Cookies.remove("token");
      return;
    }

    if (!decodedToken.id || Date.now() / 1000 >= decodedToken.exp) {
      set({
        isAuthenticated: false,
        token: null,
        userId: null,
      });
      Cookies.remove("token");
      return;
    }

    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);

    Cookies.set("token", token, { expires: expiresIn });

    set({
      isAuthenticated: true,
      token: token,
      userId: decodedToken.id,
    });
  },

  logout: () => {
    Cookies.remove("token");
    set({
      isAuthenticated: false,
      token: null,
      userId: null,
    });
  },

  isTokenValid: () => {
    const token = Cookies.get("token");
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      return Date.now() / 1000 < decodedToken.exp;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return false;
    }
  },
}));
