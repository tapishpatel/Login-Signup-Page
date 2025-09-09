import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validationPatterns, customValidations } from "@/utils/validationPatterns";
import { useToast } from "@/hooks/use-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { errors, setValue, validateAll } = useFormValidation({
    name: {
      required: true,
      pattern: validationPatterns.name,
    },
    username: {
      required: true,
      pattern: validationPatterns.username,
    },
    email: {
      required: true,
      pattern: validationPatterns.email,
    },
    phone: {
      required: true,
      pattern: validationPatterns.phone,
    },
    password: {
      required: true,
      pattern: validationPatterns.password,
      minLength: 6,
      custom: customValidations.passwordNotUsername,
    },
    confirmPassword: {
      required: true,
      custom: customValidations.confirmPassword,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    if (validateAll(values)) {
      // Simulate registration process
      setTimeout(() => {
        toast({
          title: "Account Created Successfully",
          description: "Welcome! Please sign in with your credentials.",
        });
        setIsLoading(false);
        navigate("/login");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Create new Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Name"
            name="name"
            type="text"
            placeholder="Enter your name"
            error={errors.name}
            onChange={(e) => setValue("name", e.target.value)}
            required
          />

          <FormInput
            label="Username"
            name="username"
            type="text"
            placeholder="Enter username"
            error={errors.username}
            onChange={(e) => setValue("username", e.target.value)}
            required
          />
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          error={errors.email}
          onChange={(e) => setValue("email", e.target.value)}
          required
        />

        <FormInput
          label="Phone No."
          name="phone"
          type="tel"
          placeholder="+1234567890"
          error={errors.phone}
          onChange={(e) => setValue("phone", e.target.value)}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            error={errors.password}
            showPasswordToggle
            onChange={(e) => setValue("password", e.target.value)}
            required
          />

          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            error={errors.confirmPassword}
            showPasswordToggle
            onChange={(e) => setValue("confirmPassword", e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-6"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "SIGN UP"}
        </Button>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}