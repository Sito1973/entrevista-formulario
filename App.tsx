
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#fbf9f6] via-[#f8f3ee] to-[#f4ece5] p-4">
      <header className="mb-8 text-center">
        {/* Se reemplaza LogoIcon con la etiqueta img */}
        <img 
          src="/assets/logo.png" 
          alt="Logo de Cocinando Sonrisas" 
          className="h-20 w-20 mx-auto mb-4" 
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-[#7f5539] to-[#9c6644] bg-clip-text text-transparent">
          Cocinando Sonrisas
        </h1>
        <p className="text-[#b08968] text-lg mt-1">Plataforma de Carga de Entrevistas</p>
      </header>
      <main className="w-full max-w-md bg-[#ede0d4]/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-[#e6ccb2]/30">
        {!isAuthenticated ? (
          <LoginScreen onLoginSuccess={handleLoginSuccess} />
        ) : (
          <UploadFormScreen userEmail={userEmail || ''} onLogout={handleLogout} />
        )}
      </main>
      <footer className="mt-12 text-center text-sm text-[#b08968]">
        <p>&copy; {new Date().getFullYear()} Cocinando Sonrisas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
