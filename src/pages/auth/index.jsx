import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      let authResponse;
      if (isLogin) {
        authResponse = await signIn({ email, password });
      } else {
        authResponse = await signUp({ email, password });
      }
      
      if (authResponse.error) {
        setError(authResponse.error.message);
      } else {
        navigate('/marketplace'); // Redirect to a protected route on success
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{isLogin ? 'Login' : 'Sign Up'} - EcoFinds</title>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 sm:pt-24 pb-16 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-card border border-border rounded-xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {!isLogin && (
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              )}
              {error && <p className="text-destructive text-sm">{error}</p>}
              <Button type="submit" fullWidth disabled={loading}>
                {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Sign Up')}
              </Button>
            </form>
            <div className="text-center mt-4">
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError(null); // Clear errors when switching form
                }}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
              </button>
            </div>
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
            </div>
            <div>
                <Button variant="outline" fullWidth>
                    <Icon name="Google" className="mr-2" />
                    Google
                </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
