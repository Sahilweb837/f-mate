"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Camera, User, Check, ArrowRight, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const coffeeStyles = [
  "Espresso Enthusiast", "Latte Lover", "Cappuccino Queen", "Cold Brew Addict", 
  "Mocha Maven", "Chai Girl/Boy", "Flat White Fan", "Iced Latte Icon"
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    bio: '',
    coffee_style: '',
    interest_tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const nextStep = () => setStep(step + 1);

  const handleComplete = async () => {
    setLoading(true);
    try {
      // 1. Update Profile Info
      await api.put('/users/profile', profile);

      // 2. Upload Photo if exists
      if (photo) {
        const formData = new FormData();
        formData.append('photo', photo);
        await api.post('/users/photos', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      router.push('/');
    } catch (err) {
      console.error('Failed to complete onboarding:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <motion.div
        layout
        style={{
          width: '100%',
          maxWidth: '560px',
          background: 'white',
          borderRadius: '32px',
          padding: '3rem',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Progress Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#f0f0f0' }}>
           <motion.div 
             animate={{ width: `${(step / 3) * 100}%` }}
             style={{ height: '100%', background: 'var(--grad-hero)' }}
           />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'var(--pink-100)', color: 'var(--pink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <User size={32} />
                </div>
                <h2 className="font-playfair" style={{ fontSize: '2.2rem', fontWeight: 800 }}>About You</h2>
                <p style={{ color: '#888' }}>Tell your future matches a bit about yourself.</p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>Your Bio</label>
                <textarea
                  placeholder="I love sunsets, long walks, and extra foam on my lattes..."
                  style={{ width: '100%', height: '120px', padding: '1rem', borderRadius: '16px', border: '1px solid #eee', outline: 'none', background: '#fcfcfc', resize: 'none' }}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </div>

              <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={nextStep}>
                Continue <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'var(--pink-100)', color: 'var(--pink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Coffee size={32} />
                </div>
                <h2 className="font-playfair" style={{ fontSize: '2.2rem', fontWeight: 800 }}>Coffee Style</h2>
                <p style={{ color: '#888' }}>What's your go-to caffeine fix?</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '2.5rem' }}>
                {coffeeStyles.map((style) => (
                  <button
                    key={style}
                    onClick={() => setProfile({ ...profile, coffee_style: style })}
                    style={{
                      padding: '0.85rem',
                      borderRadius: '12px',
                      border: profile.coffee_style === style ? '2px solid var(--pink-500)' : '1px solid #eee',
                      background: profile.coffee_style === style ? 'var(--pink-50)' : 'white',
                      color: profile.coffee_style === style ? 'var(--pink-600)' : '#555',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {style}
                  </button>
                ))}
              </div>

              <button className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={nextStep}>
                Next <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                <div style={{ width: 64, height: 64, borderRadius: '20px', background: 'var(--pink-100)', color: 'var(--pink-600)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Camera size={32} />
                </div>
                <h2 className="font-playfair" style={{ fontSize: '2.2rem', fontWeight: 800 }}>Profile Photo</h2>
                <p style={{ color: '#888' }}>Show your best self! Matches love a great photo.</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
                <div 
                  style={{ 
                    width: '200px', 
                    height: '240px', 
                    borderRadius: '24px', 
                    border: '3px dashed var(--pink-200)', 
                    background: '#fcfcfc',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('photo-input')?.click()}
                >
                   {preview ? (
                     <img src={preview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Preview" />
                   ) : (
                     <div style={{ textAlign: 'center', color: '#bbb' }}>
                        <Plus size={40} style={{ marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>Click to Upload</div>
                     </div>
                   )}
                   <input 
                     id="photo-input" 
                     type="file" 
                     hidden 
                     accept="image/*" 
                     onChange={handleFileChange} 
                   />
                </div>
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} 
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? 'Saving Profile...' : 'Finish & Start Matching'} <Check size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
