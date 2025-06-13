
import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import UploadFormScreen from './components/UploadFormScreen';
// import { LogoIcon } from './components/icons/LogoIcon'; // LogoIcon ya no se usa

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const handleLoginSuccess = useCallback((email: string) => {
    setIsAuthenticated(true);
    setUserEmail(email);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUserEmail(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 p-4">
      <header className="mb-8 text-center">
        {/* Se reemplaza LogoIcon con la etiqueta img */}
        <img 
          src="/assets/logo.png" 
          alt="Logo de Cocinando Sonrisas" 
          className="h-20 w-20 mx-auto mb-4" 
        />
        <h1 className="text-4xl font-bold text-sky-700">
          Cocinando Sonrisas
        </h1>
        <p className="text-slate-600 text-lg mt-1">Plataforma de Carga de Entrevistas</p>
      </header>
      <main className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        {!isAuthenticated ? (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        ) : (
          <UploadFormScreen userEmail={userEmail || ''} onLogout={handleLogout} />
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Cocinando Sonrisas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
