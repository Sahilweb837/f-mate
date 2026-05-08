"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginForm({ isSimple }: { isSimple?: boolean }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = res.data.user.profile_complete ? '/profile' : '/setup';
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'rgba(231,76,60,0.1)', color: '#e74c3c', padding: '1rem', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(231,76,60,0.2)' }}
        >
          <AlertCircle size={18} /> {error}
        </motion.div>
      )}
      
      <div className="input-group" style={{ position: 'relative' }}>
        <Mail size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', transition: 'all 0.3s' }} className="input-icon" />
        <input 
          type="email" 
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ 
            width: '100%', 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            padding: '1.1rem 1.1rem 1.1rem 3.5rem', 
            borderRadius: '18px', 
            color: 'white', 
            outline: 'none',
            fontSize: '1rem',
            transition: 'all 0.3s'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink-primary)';
            e.currentTarget.style.background = 'rgba(255,0,127,0.02)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--pink-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--text-dim)';
          }}
        />
      </div>

      <div className="input-group" style={{ position: 'relative' }}>
        <Lock size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', transition: 'all 0.3s' }} className="input-icon" />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ 
            width: '100%', 
            background: 'rgba(255,255,255,0.02)', 
            border: '1px solid rgba(255,255,255,0.08)', 
            padding: '1.1rem 1.1rem 1.1rem 3.5rem', 
            borderRadius: '18px', 
            color: 'white', 
            outline: 'none',
            fontSize: '1rem',
            transition: 'all 0.3s'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink-primary)';
            e.currentTarget.style.background = 'rgba(255,0,127,0.02)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--pink-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--text-dim)';
          }}
        />
      </div>

      <motion.button 
        className="btn-primary" 
        disabled={loading} 
        style={{ padding: '1.1rem', width: '100%', justifyContent: 'center', fontSize: '1rem', marginTop: '0.5rem' }}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,0,127,0.4)' }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : 'Log In to CupDate'}
      </motion.button>
    </form>
  );
}
