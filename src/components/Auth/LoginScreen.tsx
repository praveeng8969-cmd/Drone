import React, { useState } from 'react';
import { IMAGES } from '../../data/mockData';
import { 
  Map, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  Shield, 
  CheckCircle,
  Cpu,
  Layers
} from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'government' | 'designer'>('government');
  const [email, setEmail] = useState('surveyor.tn@municipal.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  const handleDemoAccess = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 400);
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-6 lg:p-10 font-sans overflow-y-auto custom-scrollbar">
      {/* Mode Switcher Pill in Top Right for seamless preview between the two design styles from prompt */}
      <div className="fixed top-4 right-4 z-50 flex items-center bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-xl border border-slate-200 gap-2 text-xs font-bold">
        <span className="text-slate-400">UI Theme:</span>
        <button
          onClick={() => setAuthMode('government')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            authMode === 'government'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Municipal Gov Portal
        </button>
        <button
          onClick={() => setAuthMode('designer')}
          className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
            authMode === 'designer'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Atmospheric Spatial Mode
        </button>
      </div>

      {authMode === 'government' ? (
        /* ================== GOVERNMENT FEDRAMP MUNICIPAL SCREEN (Image 1 & 3) ================== */
        <div className="w-full min-h-[580px] md:h-[90vh] md:max-h-[920px] md:max-w-6xl bg-white rounded-3xl md:rounded-[32px] flex flex-col md:flex-row shadow-2xl overflow-hidden relative border border-slate-100 my-auto">
          {/* Left Panel: GIS Map Visualization & Branding */}
          <div className="relative w-full md:w-1/2 lg:w-7/12 h-64 md:h-full bg-slate-950 flex flex-col justify-between p-6 md:p-12 overflow-hidden text-white">
            {/* Background Visualization Layer */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center opacity-35 transition-transform duration-1000 scale-105"
              style={{ backgroundImage: `url('${IMAGES.loginGisBg}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent z-0" />

            {/* Top Brand */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
                  <Map className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h1 className="font-black text-2xl text-white tracking-tight leading-none">
                    UrbanCadastra AI
                  </h1>
                  <p className="text-[11px] font-bold text-indigo-300 tracking-widest uppercase mt-1">
                    Municipal Planning Dept
                  </p>
                </div>
              </div>
            </div>

            {/* Center Content */}
            <div className="relative z-10 my-auto py-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-xs font-semibold mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                Sub-Centimeter Cadastral Vectorization
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                AI-Powered Urban Parcel Mapping
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-lg">
                Transform high-resolution drone imagery into accurate, validated cadastral intelligence. Secure, government-grade infrastructure for spatial boundary analysis and land records.
              </p>
            </div>

            {/* Bottom Security Badges */}
            <div className="relative z-10 hidden md:flex items-center gap-6 text-slate-400 text-xs pt-4 border-t border-slate-800">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>FedRAMP Authorized</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span>AES-256 Spatial Encryption</span>
              </div>
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Survey of India Grid Compliance</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Login Interface */}
          <div className="w-full md:w-1/2 lg:w-5/12 bg-white h-full flex flex-col justify-center items-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
            <div className="w-full max-w-sm">
              {/* Header */}
              <div className="mb-6 text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Sign In</h3>
                <p className="text-sm text-slate-500">Access the spatial intelligence dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Government Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@agency.gov"
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="block w-full pl-10 pr-3.5 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-900 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to government email domain."); }} className="font-bold text-indigo-600 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-all cursor-pointer shadow-lg shadow-indigo-600/20"
                  >
                    {isLoading ? (
                      <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      <>
                        <span>Authenticate Session</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="my-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Restricted Access
                  </span>
                </div>
              </div>

              {/* Demo Access Card */}
              <div 
                onClick={handleDemoAccess}
                className="border border-indigo-100 rounded-2xl p-4 bg-slate-50/50 hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer group text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform border border-indigo-100">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">
                  AI Demo Environment
                </h4>
                <p className="text-xs text-slate-500 mb-3">
                  Explore the AI processing engine with sample municipal data sets (Chennai, Coimbatore, Madurai).
                </p>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 py-2.5 px-3 rounded-xl transition-colors cursor-pointer"
                >
                  <span>Quick Launch Demo Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-wider">
                WARNING: This is a restricted government system. Unauthorized access is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================== ATMOSPHERIC DESIGNER SCREEN (Image 7 & 9) ================== */
        <div className="w-full max-w-[1180px] min-h-[720px] bg-white rounded-3xl md:rounded-[36px] flex flex-col md:flex-row shadow-2xl overflow-hidden p-3 relative border border-slate-100">
          {/* Left Atmospheric Image Panel */}
          <div className="relative w-full md:w-[55%] h-72 md:h-full bg-slate-950 rounded-2xl md:rounded-[28px] flex flex-col justify-between p-6 md:p-10 overflow-hidden text-white">
            <div
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${IMAGES.spaceBg}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-0" />

            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-center">
              <span className="font-bold text-sm tracking-wide">Selected Works</span>
              <div className="flex space-x-4 items-center text-xs">
                <a href="#signup" onClick={handleDemoAccess} className="text-white/80 hover:text-white transition-colors">Sign Up</a>
                <button onClick={handleDemoAccess} className="border border-white/40 hover:border-white rounded-full px-4 py-1.5 font-bold transition-colors cursor-pointer">
                  Join Us
                </button>
              </div>
            </div>

            {/* Bottom Credit */}
            <div className="relative z-10 flex justify-between items-end mt-auto pt-10">
              <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-md p-2 pr-4 rounded-full border border-white/10">
                <img
                  src={IMAGES.designerAvatar}
                  alt="Andrew.ui"
                  className="w-10 h-10 rounded-full border border-white/20 object-cover"
                />
                <div>
                  <div className="font-bold text-sm leading-tight">Andrew.ui</div>
                  <div className="text-xs text-white/70">UI & Spatial Illustration</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer">
                  ←
                </button>
                <button className="w-9 h-9 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 transition-colors backdrop-blur-sm cursor-pointer">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right Login Interface */}
          <div className="w-full md:w-[45%] h-full flex flex-col p-6 md:p-12 relative z-20 bg-white">
            <div className="flex justify-between items-center w-full mb-10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-black text-slate-900 tracking-tight text-lg uppercase">URBANCADASTRA</span>
              </div>
              <div className="border border-slate-200 rounded-full px-3 py-1 text-xs font-bold text-slate-600 bg-slate-50">
                🇬🇧 EN ▾
              </div>
            </div>

            <div className="my-auto max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-black text-slate-900 mb-1 tracking-tight">Hi Spatial Designer</h1>
                <p className="text-sm text-slate-500">Welcome to UrbanCadastra AI Platform</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none bg-slate-50/50 focus:bg-white"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none bg-slate-50/50 focus:bg-white"
                />
                <div className="flex justify-end">
                  <a href="#forgot" className="text-xs font-bold text-indigo-600 hover:underline">Forgot password ?</a>
                </div>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                  <div className="relative flex justify-center text-xs"><span className="px-3 bg-white text-slate-400 font-bold">or</span></div>
                </div>

                <button
                  type="button"
                  onClick={handleDemoAccess}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-slate-200 rounded-xl shadow-xs bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>Login with Google Workspace</span>
                </button>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 transition-all cursor-pointer"
                >
                  Login & Launch Dashboard
                </button>
              </form>

              <div className="mt-6 text-center text-xs text-slate-500">
                Don't have an account?{' '}
                <button onClick={handleDemoAccess} className="font-bold text-indigo-600 hover:underline cursor-pointer">
                  Sign up for Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
