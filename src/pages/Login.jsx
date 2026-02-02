import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ChevronRight, ShieldCheck, Loader2, Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const Login = () => {
  const { t, darkMode } = useAppContext();
  const [step, setStep] = useState('phone'); // phone | otp
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {}
    });
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (phoneNumber.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, formattedNumber, appVerifier);
      setConfirmationResult(result);
      setStep('otp');
    } catch (err) {
      console.error("Firebase Auth Error:", err);
      setError(`Error: ${err.code || 'Unknown'}. ${err.message || ''}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmationResult.confirm(otp);
      navigate('/');
    } catch (err) {
      setError('Invalid OTP. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <div id="recaptcha-container"></div>
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm text-center"
      >
        <div className="w-24 h-24 bg-white rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center shadow-xl border-4 border-rose-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-rose-500 opacity-10" />
          <div className="relative flex flex-col items-center">
            <Heart size={40} className="text-rose-500 fill-rose-500" />
            <span className="text-[10px] font-black text-rose-600 -mt-1 tracking-tighter">HB</span>
          </div>
        </div>
        
        <h1 className={clsx("text-4xl font-black mb-2 tracking-tight", darkMode ? "text-white" : "text-slate-800")}>
          HeartBeat
        </h1>
        <p className="text-slate-500 font-bold mb-10 uppercase tracking-[0.3em] text-[10px]">
          Digital Vitality
        </p>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold border border-rose-100 leading-relaxed shadow-sm">
            {error}
          </div>
        )}

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className={clsx("p-2 rounded-3xl border-2 transition-all flex items-center gap-3 shadow-inner", darkMode ? "bg-slate-800 border-slate-700 focus-within:border-rose-500" : "bg-white border-slate-100 focus-within:border-rose-400")}>
              <div className="pl-4 pr-2 py-2 border-r border-slate-200 text-slate-500 font-black">+91</div>
              <input 
                type="tel" 
                placeholder="Phone Number" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
                className="bg-transparent border-none outline-none w-full py-3 font-black text-lg tracking-widest text-slate-700"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-rose-500 text-white rounded-[2rem] font-black shadow-xl shadow-rose-200 active:scale-95 transition-transform flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ChevronRight size={20} /></>}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <p className="text-sm text-slate-500 font-bold mb-4">Enter the 6-digit code sent to<br/><span className="text-rose-500">{phoneNumber}</span></p>
            <div className={clsx("p-2 rounded-3xl border-2 transition-all shadow-inner", darkMode ? "bg-slate-800 border-slate-700 focus-within:border-rose-500" : "bg-white border-slate-100 focus-within:border-rose-400")}>
              <input 
                type="text" 
                placeholder="0 0 0 0 0 0" 
                maxLength={6}
                value={otp}
                disabled={loading}
                onChange={(e) => setOtp(e.target.value)}
                className="bg-transparent border-none outline-none w-full py-3 font-black text-2xl text-center tracking-[0.5em] text-slate-700"
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-emerald-500 text-white rounded-[2rem] font-black shadow-xl shadow-emerald-100 active:scale-95 transition-transform disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Verify & Login"}
            </button>
            <button 
              type="button"
              onClick={() => setStep('phone')}
              className="text-xs font-black text-slate-400 uppercase tracking-widest mt-4"
            >
              Change Number
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Login;