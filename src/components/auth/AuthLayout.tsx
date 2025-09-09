import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-auth-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-auth-header text-auth-header-foreground px-8 py-6 rounded-t-lg">
          <h1 className="text-xl font-medium text-center">{title}</h1>
          {subtitle && (
            <p className="text-center text-sm opacity-90 mt-1">{subtitle}</p>
          )}
        </div>
        
        {/* Form Area */}
        <div className="bg-white px-8 py-8 rounded-b-lg shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
};