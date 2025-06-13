
import React, { useState, useCallback } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
}

const VALID_EMAIL = 'administrativa@cocinandosonrisas.co';
const VALID_PASSWORD = 'Cocinando2025*';

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('El correo electrónico y la contraseña son obligatorios.');
      return;
    }

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      console.log('Login successful for:', email);
      onLoginSuccess(email);
    } else {
      setError('Correo electrónico o contraseña incorrectos.');
    }
  }, [email, password, onLoginSuccess]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-center text-slate-700">Iniciar Sesión</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="email"
          type="email"
          label="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="su.correo@ejemplo.com"
          required
          aria-describedby={error ? "email-error" : undefined}
        />
        <Input
          id="password"
          type="password"
          label="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          required
          aria-describedby={error ? "password-error" : undefined}
        />
         {error && (
            <p id="email-error" className="sr-only">{error}</p>
         )}
        <Button type="submit" fullWidth>
          Ingresar
        </Button>
      </form>
    </div>
  );
};

export default LoginScreen;
