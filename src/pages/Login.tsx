import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormInput } from "@/components/auth/FormInput";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validationPatterns, customValidations } from "@/utils/validationPatterns";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { errors, setValue, validateAll } = useFormValidation({
    username: {
      required: true,
      pattern: validationPatterns.username,
    },
    password: {
      required: true,
      pattern: validationPatterns.password,
      minLength: 6,
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const values = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    if (validateAll(values)) {
      // Simulate login process
      setTimeout(() => {
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        setIsLoading(false);
        // Navigate to dashboard or home page
        navigate("/");
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout title="Login" subtitle="Sign in to continue">
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          label="Username"
          name="username"
          type="text"
          placeholder="Enter your username"
          error={errors.username}
          onChange={(e) => setValue("username", e.target.value)}
          required
        />

        <FormInput
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          error={errors.password}
          showPasswordToggle
          onChange={(e) => setValue("password", e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "LOGIN"}
        </Button>

        <div className="text-center text-sm text-gray-600">
          Don't have Account?{" "}
          <Link
            to="/signup"
            className="text-primary hover:underline font-medium"
          >
            SignUp
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}