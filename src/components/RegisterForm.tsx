"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Calendar, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';

export default function RegisterForm({ isSimple }: { isSimple?: boolean }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: 'female',
    date_of_birth: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.href = '/setup';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ background: 'rgba(231,76,60,0.1)', color: '#e74c3c', padding: '1rem', borderRadius: '16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(231,76,60,0.2)' }}
        >
          <AlertCircle size={18} /> {error}
        </motion.div>
      )}
      
      <div style={{ position: 'relative' }}>
        <User size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', transition: 'all 0.3s' }} />
        <input 
          type="text" placeholder="Full Name" value={formData.name} required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '18px', color: 'white', outline: 'none', transition: 'all 0.3s' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink-primary)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--pink-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--text-dim)';
          }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <Mail size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', transition: 'all 0.3s' }} />
        <input 
          type="email" placeholder="Email address" value={formData.email} required
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '18px', color: 'white', outline: 'none', transition: 'all 0.3s' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink-primary)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--pink-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--text-dim)';
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ position: 'relative' }}>
          <select 
            value={formData.gender} required
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem', borderRadius: '18px', color: 'white', outline: 'none', appearance: 'none' }}
          >
            <option value="male" style={{ background: '#050505' }}>Male</option>
            <option value="female" style={{ background: '#050505' }}>Female</option>
          </select>
        </div>
        <input 
          type="date" value={formData.date_of_birth} required
          onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
          style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem', borderRadius: '18px', color: 'white', outline: 'none' }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <Lock size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)', transition: 'all 0.3s' }} />
        <input 
          type="password" placeholder="Password" value={formData.password} required
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          style={{ width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '18px', color: 'white', outline: 'none', transition: 'all 0.3s' }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--pink-primary)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--pink-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget.previousSibling as HTMLElement).style.color = 'var(--text-dim)';
          }}
        />
      </div>

      <motion.button 
        className="btn-primary" 
        disabled={loading} 
        style={{ padding: '1.1rem', width: '100%', justifyContent: 'center', fontSize: '1rem', marginTop: '1rem' }}
        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(255,0,127,0.4)' }}
        whileTap={{ scale: 0.98 }}
      >
        {loading ? <Loader2 className="animate-spin" size={24} /> : 'Create My Account'}
      </motion.button>
    </form>
  );
}
