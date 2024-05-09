"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import RedirectLink from "@/components/RedirectLink";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function Signin() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const { signin, isAuthenticated } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(email, password);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await isAuthenticated();
      if (isAuth) {
        router.replace("/");
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className={styles.mainContainer}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.formContainer}>
        <h1>Log in to your account</h1>
        <form className={styles.form} onSubmit={submitFormHandler}>
          <div className={styles.inputContainer}>
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <input
            type="submit"
            value="Sign in"
            className={styles.submitButton}
          />
          <p>
            Don{"'"}t have an account?{" "}
            <RedirectLink location="/auth/signup" text="Sign up" />
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;
