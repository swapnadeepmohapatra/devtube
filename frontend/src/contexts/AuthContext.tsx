import { BACKEND_URL } from "@/config/keys";
import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

interface AuthContextProps {
  user: { name: string; username: string; _id: string } | null;
  signin: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  signin: () => {},
  signup: () => {},
  logout: () => {},
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState(null);

  const signup = (name: string, email: string, password: string) => {
    axios
      .post(
        `${BACKEND_URL}/auth/signup`,
        {
          name,
          username: email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setUser(response?.data?.data);
        } else if (response?.data?.status === "error") {
          toast.error(response?.data?.message);
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === "error") {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const signin = (email: string, password: string) => {
    axios
      .post(
        `${BACKEND_URL}/auth/login`,
        {
          username: email,
          password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);

        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setUser(response?.data?.data);
        } else if (response?.data?.status === "error") {
          toast.error(response?.data?.message);
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === "error") {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  const logout = () => {
    axios
      .post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true })
      .then((response) => {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setUser(null);
        } else if (response?.data?.status === "error") {
          toast.error(response?.data?.message);
        } else {
          toast.info(response?.data?.message);
        }
      })
      .catch((error) => {
        if (error?.response?.data?.status === "error") {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <AuthContext.Provider value={{ user, signin, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
