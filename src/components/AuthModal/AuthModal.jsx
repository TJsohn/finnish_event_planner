import { useState } from "react";
import styles from "./AuthModal.module.css";

const AuthModal = ({ type, onClose }) => {
  const isSignup = type === "signup";

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    onClose();
  };

  const renderInput = (name, type = "text", placeholder) => (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={formData[name]}
      onChange={handleChange}
      className={styles.authInput}
      required
    />
  );

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2 className={styles.authTitle}>
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {isSignup && (
            <>
              {renderInput("name", "text", "Name")}
              {renderInput("surname", "text", "Surname")}
            </>
          )}
          {renderInput("email", "email", "Email")}
          {renderInput("password", "password", "Password")}
          {isSignup && renderInput("confirmPassword", "password", "Confirm Password")}
          <button type="submit" className={styles.submitButton}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;