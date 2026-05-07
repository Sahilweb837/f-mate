"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Mail, Lock, User as UserIcon, Calendar, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    gender: 'female',
    date_of_birth: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/register', formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      if (res.data.user.profile_complete) {
        router.push('/discover');
      } else {
        router.push('/setup');
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : 'Validation failed. Please check your details.');
      } else {
        setError(err.response?.data?.message || 'Registration failed. Please check your details.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(255,45,149,0.05) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,45,149,0.03) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-surface)',
          borderRadius: '32px',
          padding: '3rem',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/">
            <div style={{ width: 60, height: 60, borderRadius: "16px", background: "var(--grad-primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", boxShadow: "var(--shadow-neon)" }}>
              <Coffee size={30} color="white" />
            </div>
          </Link>
          <h1 className="font-playfair" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>Create Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>Join the community of coffee lovers today.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', padding: '1rem', borderRadius: '12px', color: '#e74c3c', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem' }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <UserIcon size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                required
                type="text"
                placeholder="Aria Bloom"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1rem 1rem 3.5rem', color: 'white', outline: 'none', fontSize: '1rem' }}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                required
                type="email"
                placeholder="aria@cupmate.app"
                style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1rem 1rem 3.5rem', color: 'white', outline: 'none', fontSize: '1rem' }}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
             <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Gender</label>
                <select
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem', color: 'white', outline: 'none', fontSize: '1rem', appearance: 'none' }}
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="male" style={{ background: '#1c1c22' }}>Male</option>
                  <option value="female" style={{ background: '#1c1c22' }}>Female</option>
                  <option value="non_binary" style={{ background: '#1c1c22' }}>Non-binary</option>
                </select>
             </div>
             <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Date of Birth</label>
                <input
                  required
                  type="date"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem', color: 'white', outline: 'none', fontSize: '1rem' }}
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1rem 1rem 3.5rem', color: 'white', outline: 'none', fontSize: '1rem' }}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.5rem', marginLeft: '0.5rem' }}>Confirm</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1rem 1rem 3.5rem', color: 'white', outline: 'none', fontSize: '1rem' }}
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                />
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ marginTop: '1.5rem', padding: '1.1rem', fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,45,149,0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <Loader2 size={22} className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
          </motion.button>
        </form>

        <p style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--pink-primary)', fontWeight: 800, textDecoration: 'none' }}>Log in</Link>
        </p>
      </motion.div>
    </main>
  );
}
