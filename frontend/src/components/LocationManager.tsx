"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { MapPin, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocationManager() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    // Only run if user is logged in (token exists)
    const token = localStorage.getItem('token');
    if (!token) return;

    if (!navigator.geolocation) {
      setStatus('error');
      setErrorMsg('Geolocation is not supported by your browser');
      return;
    }

    const updateLocation = async (position: GeolocationPosition) => {
      setStatus('loading');
      try {
        const { latitude, longitude } = position.coords;
        
        await api.put('/profile/location', {
          latitude,
          longitude,
        });

        setStatus('success');
        setTimeout(() => setStatus('idle'), 3000);
      } catch (err) {
        console.error('Failed to update location:', err);
        setStatus('error');
      }
    };

    const handleError = (error: GeolocationPositionError) => {
      console.warn('Geolocation error:', error.message);
      setStatus('error');
      setErrorMsg(error.message);
    };

    // Initial check
    navigator.geolocation.getCurrentPosition(updateLocation, handleError);

    // Watch for changes
    const watchId = navigator.geolocation.watchPosition(updateLocation, handleError, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000,
    });

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  if (status === 'idle') return null;

  const config = {
    loading: { icon: <Loader2 size={18} className="animate-spin" />, bg: 'rgba(255,255,255,0.05)', color: 'white', border: 'rgba(255,255,255,0.1)' },
    success: { icon: <CheckCircle2 size={18} />, bg: 'rgba(34,197,94,0.1)', color: '#22c55e', border: 'rgba(34,197,94,0.2)' },
    error: { icon: <AlertTriangle size={18} />, bg: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'rgba(239,68,68,0.2)' }
  };

  const current = config[status as keyof typeof config] || config.loading;

  return (
    <div style={{ position: 'fixed', bottom: '2.5rem', right: '2.5rem', zIndex: 9999 }}>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          style={{
            background: current.bg,
            backdropFilter: 'blur(15px)',
            color: current.color,
            padding: '0.75rem 1.25rem',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: 700,
            border: `1px solid ${current.border}`,
          }}
        >
          <div style={{ color: current.color }}>
            {current.icon}
          </div>
          <span>
            {status === 'loading' && 'Syncing Live Location...'}
            {status === 'success' && 'Live Location Synced!'}
            {status === 'error' && `Location Error: ${errorMsg}`}
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
