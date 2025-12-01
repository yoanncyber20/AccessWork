import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Eye, EyeOff, Mic, UserCircle2 } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: 'employee' | 'manager') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent, role: 'employee' | 'manager') => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl !border-0">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center">
              <UserCircle2 className="w-12 h-12 text-primary-foreground" aria-hidden="true" />
            </div>
          </div>
          <CardTitle className="text-3xl">Welcome to AccessWork</CardTitle>
          <CardDescription className="text-lg">
            Sign in to access your workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={(e) => handleSubmit(e, 'employee')} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-lg">
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-4 !border-0 text-lg"
                  aria-label="Enter your email address"
                  aria-required="true"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-2 h-10 w-10 p-0"
                  aria-label="Voice input for email"
                  title="Use voice command"
                >
                  <Mic className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 px-4 pr-24 !border-0 text-lg"
                  aria-label="Enter your password"
                  aria-required="true"
                />
                <div className="absolute right-2 top-2 flex gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 p-0"
                    aria-label="Voice input for password"
                    title="Use voice command"
                  >
                    <Mic className="w-5 h-5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    className="h-10 w-10 p-0"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                type="submit"
                size="lg"
                className="w-full h-16 text-lg bg-primary hover:bg-primary/90"
                aria-label="Sign in as employee"
              >
                Employee Login
              </Button>
              
              <Button
                type="button"
                onClick={(e) => handleSubmit(e as any, 'manager')}
                size="lg"
                variant="secondary"
                className="w-full h-16 text-lg bg-secondary hover:bg-secondary/90"
                aria-label="Sign in as manager"
              >
                Manager Login
              </Button>
            </div>
          </form>

          <div className="pt-4 text-center">
            <p className="text-muted-foreground">
              Demo mode - Click a button to sign in
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
