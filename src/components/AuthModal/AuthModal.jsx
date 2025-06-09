import { useState } from "react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ type, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === "signup" && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log(`${type} form submitted`, formData);
    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.authTitle}>{type === "login" ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {type === "signup" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={styles.authInput}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleChange}
                className={styles.authInput}
                required
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.authInput}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={styles.authInput}
            required
          />
          {type === "signup" && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.authInput}
              required
            />
          )}
          <button type="submit" className={styles.submitButton}>
            {type === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;