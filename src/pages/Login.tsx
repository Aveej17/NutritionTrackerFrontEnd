// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/api';
import { useAuth } from '@/context/AuthContext';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Apple, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/api/auth/login', {
        email,
        password,
      });

      await login(res.data);

      navigate('/app');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-card">
        <div className="text-center mb-6">
          <Apple className="mx-auto w-10 h-10" />
          <h1 className="text-2xl font-bold mt-2">Welcome back</h1>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
            />
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setError('');
                }}
                required
              />
              {password && (
                <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                    setShowPassword((prev) => !prev);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2">
                                
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>             
              )}
            </div>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-primary font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
