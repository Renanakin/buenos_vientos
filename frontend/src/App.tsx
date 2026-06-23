import { useState } from 'react';
import ClientHome from './components/ClientHome';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState<'client' | 'admin'>('client');

  return (
    <>
      {/* Floating View Switcher (Dev only) */}
      <div className="fixed bottom-4 right-4 z-[9999] bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-white/20 flex gap-2 shadow-2xl">
        <button 
          onClick={() => setView('client')} 
          className={`px-3 py-1.5 text-xs font-semibold rounded ${view === 'client' ? 'bg-brand-gold text-black' : 'text-white hover:bg-white/10'}`}
        >
          Client
        </button>
        <button 
          onClick={() => setView('admin')} 
          className={`px-3 py-1.5 text-xs font-semibold rounded ${view === 'admin' ? 'bg-brand-gold text-black' : 'text-white hover:bg-white/10'}`}
        >
          Admin
        </button>
      </div>
      
      {view === 'client' ? <ClientHome /> : <AdminDashboard />}
    </>
  );
}

export default App;
