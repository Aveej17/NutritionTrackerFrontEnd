
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '@/api';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Apple, Eye, EyeOff } from 'lucide-react';
import { validatePassword } from '@/utils/passwordValidator';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/api/auth/register', {
      name,
      email,
      password,
      confirmPassword
    });

      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.error || 'Signup failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-card">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create account
        </h1>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <Label>Full Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              required
            />
          </div>

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
                  setPasswordError(validatePassword(value));
                  setError('');
                  if (!value) setShowPassword(false);
                }}
                required
              />

              {password && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                    setShowConfirmPassword(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
            </div>
          </div>



          <div>
            <Label>Confirm Password</Label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  setConfirmError(
                    value && value !== password ? 'Passwords do not match' : ''
                  );
                  setError('');
                  if (!value) setShowConfirmPassword(false);
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                onCut={(e) => e.preventDefault()}
                onDrop={(e) => e.preventDefault()} 
                required
              />

              {confirmPassword && (
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setShowConfirmPassword((prev) => !prev);
                    setShowPassword(false);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              )}
            </div>
          </div>





          {confirmError && (
            <p className="text-xs text-destructive mt-1">
              {confirmError}
            </p>
          )}

          {passwordError && (
              <p className="text-xs text-muted-foreground mt-1">
                {passwordError}
              </p>
            )}

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button
            className="w-full"
            disabled={loading || !!passwordError || !!confirmError}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
