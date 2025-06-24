import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";
import { toast } from "react-toastify";
import CheckBox from "../common/CheckBox";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.firstname.trim()) {
      toast.error("Please enter your firstname");
      return false;
    }

    if (!formData.lastname.trim()) {
      toast.error("Please enter your lastname");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await register(formData.email, formData.password, formData.lastname, formData.lastname);
      toast.success("Registration successful! Please verify your email.");
      navigate("/auth/login");
    } catch (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-lg pt-6"
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <Input
            label="First Name"
            type="text"
            id="lastname"
            name="firstname"
            placeholder="John"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Doe"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Email"
            type="email"
            id="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            label="Password"
            type={isChecked ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Must be at least 8 characters long
          </p>
        </div>

        <div className="mb-8">
          <Input
            label="Confirm Password"
            type={isChecked ? "text" : "password"}
            id="confirmPassword"
            name="confirm_password"
            placeholder="••••••••"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <CheckBox
            label="Show Password"
            className="mt-2"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Register"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
