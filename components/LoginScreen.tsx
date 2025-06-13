
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
    <div className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#ddb892] to-[#b08968] rounded-full opacity-20 blur-xl"></div>
      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-[#e6ccb2] to-[#ddb892] rounded-full opacity-20 blur-xl"></div>
      
      <div className="relative z-10 space-y-8">
        {/* Header with icon and title */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-[#b08968] to-[#7f5539] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#7f5539] to-[#9c6644] bg-clip-text text-transparent">
              Bienvenido
            </h2>
            <p className="text-[#b08968] mt-2">Accede a tu cuenta para continuar</p>
          </div>
        </div>

        {/* Error message with modern styling */}
        {error && (
          <div className="bg-gradient-to-r from-[#f8f3ee] to-[#f4ece5] border-l-4 border-[#9c6644] p-4 rounded-r-lg shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-[#9c6644]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[#7f5539]">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Modern form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-5">
            <div className="relative">
              <Input
                id="email"
                type="email"
                label="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@cocinandosonrisas.co"
                required
                aria-describedby={error ? "email-error" : undefined}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#b08968] mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <Input
                id="password"
                type="password"
                label="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                aria-describedby={error ? "password-error" : undefined}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#b08968] mt-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>

          {error && (
            <p id="email-error" className="sr-only">{error}</p>
          )}

          {/* Modern gradient button */}
          <div className="pt-2">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-[#b08968] to-[#7f5539] hover:from-[#9c6644] hover:to-[#7f5539] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#b08968] transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-[#ddb892] group-hover:text-[#e6ccb2] transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </span>
              Iniciar Sesión
            </button>
          </div>
        </form>

        {/* Security note */}
        <div className="text-center">
          <p className="text-xs text-[#b08968] flex items-center justify-center space-x-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Conexión segura y protegida</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
