import { useState } from "react";

export interface ValidationRules {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string, formData?: Record<string, string>) => string | null;
}

export interface FieldConfig {
  [key: string]: ValidationRules;
}

export const useFormValidation = (fields: FieldConfig) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string, allValues?: Record<string, string>) => {
    const rules = fields[name];
    if (!rules) return null;

    const currentValues = allValues || values;

    if (rules.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rules.pattern && value && !rules.pattern.test(value)) {
      return getPatternErrorMessage(name, rules.pattern);
    }

    if (rules.minLength && value.length < rules.minLength) {
      return `${name} must be at least ${rules.minLength} characters`;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${name} must not exceed ${rules.maxLength} characters`;
    }

    if (rules.custom) {
      return rules.custom(value, currentValues);
    }

    return null;
  };

  const getPatternErrorMessage = (fieldName: string, pattern: RegExp): string => {
    const messages: Record<string, string> = {
      name: "Name should contain only alphabets",
      username: "Username can contain alphanumeric characters and special symbols",
      email: "Please enter a valid email address",
      phone: "Please enter a valid phone number with country code",
      password: "Password can contain alphanumeric characters and special symbols",
    };
    
    return messages[fieldName.toLowerCase()] || `Invalid ${fieldName} format`;
  };

  const setValue = (name: string, value: string) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    
    const error = validateField(name, value, newValues);
    setErrors(prev => ({
      ...prev,
      [name]: error || ""
    }));
  };

  const validateAll = (formValues: Record<string, string>) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(fields).forEach(fieldName => {
      const error = validateField(fieldName, formValues[fieldName] || "", formValues);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    errors,
    values,
    setValue,
    validateAll,
    validateField
  };
};