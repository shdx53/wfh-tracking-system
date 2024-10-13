// Component
import LoginButton from "@/components/login/login-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  return (
    <div className="absolute left-1/2 top-1/2 h-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-8 rounded-lg border p-8 md:left-1/2 md:flex md:h-3/4 md:max-w-5xl md:-translate-x-1/2">
      <div className="flex h-full flex-col justify-center space-y-6 md:w-1/2">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <h2 className="text-sm text-black/40">
            Enter your staff ID and password to continue
          </h2>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="staffID">Email</Label>
            <Input type="text" id="staffID" placeholder="Enter your staff ID" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <LoginButton />
      </div>
      <img
        className="hidden w-1/2 object-cover md:block"
        src="/images/brooke-cagle--uHVRvDr7pg-unsplash.jpg"
        alt="Four young individuals seated at a table, engaged with a tablet, sharing ideas and collaborating on a project."
      />
    </div>
  );
}
