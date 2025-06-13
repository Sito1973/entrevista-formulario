
import React, { useState, useCallback, useRef } from 'react';
import { Input } from './common/Input';
import { Button } from './common/Button';
import { UploadIcon } from './icons/UploadIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { LogoutIcon } from './icons/LogoutIcon';
import { N8N_WEBHOOK_URL } from '../constants';
import type { UploadFormData } from '../types';

interface UploadFormScreenProps {
  userEmail: string;
  onLogout: () => void;
}

const UploadFormScreen: React.FC<UploadFormScreenProps> = ({ userEmail, onLogout }) => {
  const [formData, setFormData] = useState<UploadFormData>({
    employeeId: '',
    employeeName: '',
    interviewerName: '',
    audioFile: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UploadFormData, string>>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UploadFormData]) {
      setErrors(prev => ({...prev, [name]: undefined}));
    }
  }, [errors]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, audioFile: e.target.files![0] }));
       if (errors.audioFile) {
        setErrors(prev => ({...prev, audioFile: undefined}));
      }
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof UploadFormData, string>> = {};
    if (!formData.employeeId.trim()) newErrors.employeeId = 'La cédula es obligatoria.';
    if (!formData.employeeName.trim()) newErrors.employeeName = 'El nombre es obligatorio.';
    if (!formData.interviewerName.trim()) newErrors.interviewerName = 'El entrevistador es obligatorio.';
    if (!formData.audioFile) newErrors.audioFile = 'El archivo de audio es obligatorio.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('idle');
    setSubmitMessage('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const data = new FormData();
    data.append('cedulaColaborador', formData.employeeId);
    data.append('nombreColaborador', formData.employeeName);
    data.append('entrevistador', formData.interviewerName);
    if (formData.audioFile) {
      data.append('archivoAudio', formData.audioFile, formData.audioFile.name);
    }
    data.append('usuarioEmail', userEmail); // Include user email

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('¡Datos enviados exitosamente!');
        setFormData({ employeeId: '', employeeName: '', interviewerName: '', audioFile: null });
        if(fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
      } else {
        const errorData = await response.text();
        console.error('Error from webhook:', errorData);
        setSubmitStatus('error');
        setSubmitMessage(`Error al enviar: ${response.statusText}. Consulte la consola para más detalles.`);
      }
    } catch (error) {
      console.error('Network or other error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Error de red o desconocido. Consulte la consola.');
    } finally {
      setIsLoading(false);
    }
  }, [formData, userEmail, validateForm]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-slate-700">Registrar Entrevista</h2>
        <Button onClick={onLogout} variant="outline" size="sm">
          <LogoutIcon className="h-4 w-4 mr-2" />
          Salir
        </Button>
      </div>
      
      <p className="text-sm text-slate-500">
        Conectado como: <span className="font-medium text-sky-600">{userEmail}</span>
      </p>

      {submitStatus === 'success' && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitMessage}</span>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{submitMessage}</span>
        </div>
      )}
       {N8N_WEBHOOK_URL.includes('your-n8n-instance.com') && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline"><strong>Atención:</strong> La URL del webhook (<code>N8N_WEBHOOK_URL</code> en <code>constants.ts</code>) es un placeholder. Reemplácela con su URL real de n8n para que el formulario funcione.</span>
        </div>
      )}


      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          id="employeeId"
          name="employeeId"
          label="Cédula del Colaborador"
          value={formData.employeeId}
          onChange={handleInputChange}
          placeholder="Ej: 123456789"
          required
          error={errors.employeeId}
        />
        <Input
          id="employeeName"
          name="employeeName"
          label="Nombre del Colaborador"
          value={formData.employeeName}
          onChange={handleInputChange}
          placeholder="Ej: Ana Pérez"
          required
          error={errors.employeeName}
        />
        <Input
          id="interviewerName"
          name="interviewerName"
          label="Nombre del Entrevistador"
          value={formData.interviewerName}
          onChange={handleInputChange}
          placeholder="Ej: Carlos López"
          required
          error={errors.interviewerName}
        />
        <div>
          <label htmlFor="audioFile" className="block text-sm font-medium text-slate-700 mb-1">
            Archivo de Audio (entrevista)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:border-sky-500 transition-colors">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
              <div className="flex text-sm text-slate-600">
                <label
                  htmlFor="audioFile"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500"
                >
                  <span>Subir un archivo</span>
                  <input id="audioFile" name="audioFile" type="file" className="sr-only" onChange={handleFileChange} accept="audio/*,video/mp4,audio/mp4,audio/m4a,audio/x-m4a" ref={fileInputRef} required />
                </label>
                <p className="pl-1">o arrastrar y soltar</p>
              </div>
              <p className="text-xs text-slate-500">
                Archivos de audio (MP3, WAV, M4A, MP4, etc.)
              </p>
              {formData.audioFile && (
                <p className="text-sm text-green-600 pt-2">Archivo seleccionado: {formData.audioFile.name}</p>
              )}
            </div>
          </div>
           {errors.audioFile && <p className="mt-2 text-sm text-red-600">{errors.audioFile}</p>}
        </div>
        <Button type="submit" fullWidth disabled={isLoading}>
          {isLoading ? <SpinnerIcon className="animate-spin h-5 w-5 mr-2" /> : null}
          {isLoading ? 'Enviando...' : 'Enviar Datos'}
        </Button>
      </form>
    </div>
  );
};

export default UploadFormScreen;
