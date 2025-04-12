import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

const validateToken = (token) => {
  if (!token) return { valid: false };

  try {
    const decodedToken = jwtDecode(token);
    if (!decodedToken.id || Date.now() / 1000 >= decodedToken.exp) {
      return { valid: false };
    }
    return {
      valid: true,
      userId: decodedToken.id,
    };
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return { valid: false };
  }
};

export const useAuth = create((set) => {
  const storedToken = Cookies.get("token");
  const tokenStatus = validateToken(storedToken);

  return {
    // init
    isAuthenticated: tokenStatus.valid,
    token: tokenStatus.valid ? storedToken : null,
    userId: tokenStatus.valid ? tokenStatus.userId : null,

    setAuth: (token) => {
      const tokenStatus = validateToken(token);

      if (!tokenStatus.valid) {
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
        userId: tokenStatus.userId,
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
      return validateToken(token).valid;
    },
  };
});
