// Validation patterns for different input types
export const validationPatterns = {
  // Name: Only alphabets and spaces
  name: /^[A-Za-z\s]+$/,
  
  // Username: Alphanumeric with special characters (excluding spaces)
  username: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  
  // Email: Google email format
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  
  // Phone: Country code followed by phone number
  phone: /^\+[1-9]\d{1,14}$/,
  
  // Password: Same as username (alphanumeric with special characters)
  password: /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
};

// Custom validation functions
export const customValidations = {
  // Password should not be same as username
  passwordNotUsername: (password: string, formData?: Record<string, string>) => {
    if (formData?.username && password === formData.username) {
      return "Password should not be same as username";
    }
    return null;
  },
  
  // Confirm password should match password
  confirmPassword: (confirmPassword: string, formData?: Record<string, string>) => {
    if (formData?.password && confirmPassword !== formData.password) {
      return "Passwords do not match";
    }
    return null;
  },
};