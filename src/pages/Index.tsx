import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-background">
      <div className="text-center max-w-md mx-auto p-8">
        <h1 className="mb-6 text-4xl font-bold text-auth-header">Authentication Demo</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to the login and sign-up application demo
        </p>
        <div className="space-y-4">
          <Link to="/login" className="block">
            <Button className="w-full" size="lg">
              Go to Login
            </Button>
          </Link>
          <Link to="/signup" className="block">
            <Button variant="outline" className="w-full" size="lg">
              Go to Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
