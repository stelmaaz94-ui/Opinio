import React, { useState, useEffect } from 'react';
import { User, Opinion, AgeGroup, PROFESSIONS, AGE_GROUPS, EDUCATION_LEVELS, COUNTRIES, ETHNICITIES } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  User as UserIcon, 
  TrendingUp, 
  Filter, 
  ChevronRight, 
  Star, 
  X, 
  Brain, 
  CreditCard, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Globe,
  Trash2,
  Heart
} from 'lucide-react';

const MultiSelectAncestry = ({ 
  selected, 
  onChange 
}: { 
  selected: string[], 
  onChange: (selected: string[]) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = COUNTRIES.filter(c => 
    c.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (c: string) => {
    if (selected.includes(c)) {
      onChange(selected.filter(item => item !== c));
    } else {
      onChange([...selected, c]);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[40px] p-2 bg-white rounded-xl border border-black/5 text-sm cursor-pointer flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400 px-2">All Ancestries</span>
        ) : (
          selected.map(c => (
            <span key={c} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-md flex items-center gap-1">
              {c}
              <X size={10} onClick={(ev) => { ev.stopPropagation(); toggle(c); }} />
            </span>
          ))
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-xl z-20 max-h-64 overflow-hidden flex flex-col"
            >
              <div className="p-3 border-b border-black/5">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search countries..."
                  className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="overflow-y-auto p-2">
                {filtered.map(c => (
                  <div 
                    key={c}
                    onClick={() => toggle(c)}
                    className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${selected.includes(c) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                  >
                    {c}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-4 text-center text-xs text-gray-400 italic">No countries found</div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MultiSelectEducation = ({ 
  selected, 
  onChange 
}: { 
  selected: string[], 
  onChange: (selected: string[]) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e: string) => {
    if (selected.includes(e)) {
      onChange(selected.filter(item => item !== e));
    } else {
      onChange([...selected, e]);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[40px] p-2 bg-white rounded-xl border border-black/5 text-sm cursor-pointer flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400 px-2">All Education</span>
        ) : (
          selected.map(e => (
            <span key={e} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-md flex items-center gap-1">
              {e}
              <X size={10} onClick={(ev) => { ev.stopPropagation(); toggle(e); }} />
            </span>
          ))
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-xl z-20 max-h-64 overflow-y-auto p-2"
            >
              {EDUCATION_LEVELS.map(e => (
                <div 
                  key={e}
                  onClick={() => toggle(e)}
                  className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${selected.includes(e) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  {e}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MultiSelectProfession = ({ 
  selected, 
  onChange 
}: { 
  selected: string[], 
  onChange: (selected: string[]) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = PROFESSIONS.filter(p => 
    p.toLowerCase().includes(search.toLowerCase())
  );

  const toggle = (p: string) => {
    if (selected.includes(p)) {
      onChange(selected.filter(item => item !== p));
    } else {
      onChange([...selected, p]);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[40px] p-2 bg-white rounded-xl border border-black/5 text-sm cursor-pointer flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400 px-2">All Professions</span>
        ) : (
          selected.map(p => (
            <span key={p} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-md flex items-center gap-1">
              {p}
              <X size={10} onClick={(e) => { e.stopPropagation(); toggle(p); }} />
            </span>
          ))
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-xl z-20 max-h-64 overflow-hidden flex flex-col"
            >
              <div className="p-3 border-b border-black/5">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search professions..."
                  className="w-full p-2 bg-gray-50 rounded-lg text-sm outline-none"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <div className="overflow-y-auto p-2">
                {filtered.map(p => (
                  <div 
                    key={p}
                    onClick={() => toggle(p)}
                    className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${selected.includes(p) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                  >
                    {p}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="p-4 text-center text-xs text-gray-400 italic">No professions found</div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const MultiSelectEthnicity = ({ 
  selected, 
  onChange 
}: { 
  selected: string[], 
  onChange: (selected: string[]) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e: string) => {
    if (selected.includes(e)) {
      onChange(selected.filter(item => item !== e));
    } else {
      onChange([...selected, e]);
    }
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="min-h-[40px] p-2 bg-white rounded-xl border border-black/5 text-sm cursor-pointer flex flex-wrap gap-1 items-center"
      >
        {selected.length === 0 ? (
          <span className="text-gray-400 px-2">All Ethnicities</span>
        ) : (
          selected.map(e => (
            <span key={e} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold rounded-md flex items-center gap-1">
              {e}
              <X size={10} onClick={(ev) => { ev.stopPropagation(); toggle(e); }} />
            </span>
          ))
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-black/5 rounded-2xl shadow-xl z-20 max-h-64 overflow-y-auto p-2"
            >
              {ETHNICITIES.map(e => (
                <div 
                  key={e}
                  onClick={() => toggle(e)}
                  className={`p-2 rounded-lg text-sm cursor-pointer transition-colors ${selected.includes(e) ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                >
                  {e}
                </div>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [userOpinions, setUserOpinions] = useState<Opinion[]>([]);
  const [view, setView] = useState<'feed' | 'my-posts' | 'donations'>('feed');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedOpinion, setSelectedOpinion] = useState<Opinion | null>(null);
  const [viewedOpinion, setViewedOpinion] = useState<any | null>(null);
  const [ratingValue, setRatingValue] = useState(50);
  
  // Filters
  const [sortBy, setSortBy] = useState('latest');
  const [ageFilter, setAgeFilter] = useState('');
  const [profFilter, setProfFilter] = useState<string[]>([]);
  const [eduFilter, setEduFilter] = useState<string[]>([]);
  const [ancestryFilter, setAncestryFilter] = useState<string[]>([]);
  const [ethnicityFilter, setEthnicityFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  // Registration Form
  const [regForm, setRegForm] = useState({
    username: '',
    email: '',
    password: '',
    profession: PROFESSIONS[0],
    age_group: AGE_GROUPS[0],
    education_level: EDUCATION_LEVELS[0],
    ancestry: COUNTRIES[0],
    ethnicity: ETHNICITIES[0],
    iq: 100 as number | null
  });

  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });

  // Settings Form
  const [settingsForm, setSettingsForm] = useState<{
    profession: string;
    age_group: string;
    education_level: string;
    ancestry: string;
    ethnicity: string;
    iq: number | null;
  }>({
    profession: '',
    age_group: '',
    education_level: '',
    ancestry: '',
    ethnicity: '',
    iq: 100
  });

  // Post Form
  const [postForm, setPostForm] = useState({
    content: '',
    keywords: ''
  });

  const fetchUser = async () => {
    const id = localStorage.getItem('vox_user_id');
    if (!id) return;
    
    const res = await fetch(`/api/user/${id}`);
    if (res.ok) {
      const data = await res.json();
      setUser(data);
      setSettingsForm({
        profession: data.profession || '',
        age_group: data.age_group || '',
        education_level: data.education_level || '',
        ancestry: data.ancestry || '',
        ethnicity: data.ethnicity || '',
        iq: data.iq
      });
    }
  };

  const fetchOpinions = async () => {
    const params = new URLSearchParams({
      sortBy,
      ageGroup: ageFilter,
      profession: profFilter.join(','),
      educationLevel: eduFilter.join(','),
      ancestry: ancestryFilter.join(','),
      ethnicity: ethnicityFilter.join(','),
      query: searchQuery
    });
    const res = await fetch(`/api/opinions/search?${params}`);
    const data = await res.json();
    setOpinions(data);
  };

  const fetchUserOpinions = async () => {
    if (!user) return;
    const res = await fetch(`/api/user/${user.id}/opinions`);
    const data = await res.json();
    setUserOpinions(data);
  };

  useEffect(() => {
    fetchUser();
    fetchOpinions(); // Fetch opinions initially even if not logged in
  }, []);

  useEffect(() => {
    if (view === 'feed') {
      fetchOpinions();
    } else if (user && view === 'my-posts') {
      fetchUserOpinions();
    }
  }, [user, view, sortBy, ageFilter, profFilter, eduFilter, ancestryFilter, ethnicityFilter, searchQuery]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regForm)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('vox_user_id', data.id);
      setUser(data);
      setIsRegistering(false);
    } else {
      alert(data.error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginForm)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('vox_user_id', data.id);
      setUser(data);
      setIsRegistering(false);
      setLoginForm({ identifier: '', password: '' });
    } else {
      alert(data.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('vox_user_id');
    setUser(null);
    setIsRegistering(true);
    setAuthMode('login');
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const res = await fetch(`/api/user/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settingsForm)
    });
    if (res.ok) {
      const data = await res.json();
      setUser({ ...user, ...data });
      setIsSettingsOpen(false);
      fetchOpinions();
    }
  };

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const res = await fetch('/api/opinions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: Math.random().toString(36).substring(2, 15),
        userId: user.id,
        content: postForm.content,
        keywords: postForm.keywords.split(',').map(k => k.trim())
      })
    });
    if (res.ok) {
      setPostForm({ content: '', keywords: '' });
      setIsPosting(false);
      fetchUser();
      fetchOpinions();
    }
  };

  const handleViewOpinion = async (opinion: Opinion) => {
    if (!user) {
      setIsRegistering(true);
      setAuthMode('login');
      return;
    }
    if (user.credits < 1) {
      alert("Not enough credits! Post an opinion to earn more.");
      return;
    }

    const res = await fetch(`/api/opinions/${opinion.id}/view`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    });

    if (res.ok) {
      const data = await res.json();
      setViewedOpinion(data);
      setRatingValue(50);
      fetchUser();
    } else {
      const err = await res.json();
      alert(err.error);
    }
  };

  const handleRate = async (score: number) => {
    if (!viewedOpinion || !user) return;
    const res = await fetch(`/api/opinions/${viewedOpinion.id}/rate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, score })
    });
    if (res.ok) {
      setViewedOpinion(null);
      fetchOpinions();
      fetchUser(); // Update credits
    }
  };

  const handleDeleteOpinion = async (opinionId: string) => {
    if (!user || !confirm("Are you sure you want to delete this opinion? This action cannot be undone.")) return;
    
    const res = await fetch(`/api/opinions/${opinionId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id })
    });

    if (res.ok) {
      fetchUserOpinions();
      fetchOpinions();
    } else {
      const data = await res.json();
      alert(data.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] neo-grid pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-bottom border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              className="w-10 h-10 bg-black rounded-xl flex items-center justify-center cursor-pointer"
              onClick={() => setView('feed')}
            >
              <span className="text-white font-serif font-bold text-xl">O</span>
            </div>
            <h1 className="text-xl font-serif font-bold hidden sm:block cursor-pointer" onClick={() => setView('feed')}>Opinio</h1>
            
            <nav className="hidden md:flex items-center gap-1 ml-8 p-1 bg-gray-100 rounded-xl">
              <button 
                onClick={() => setView('feed')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'feed' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Discovery
              </button>
              <button 
                onClick={() => {
                  if (!user) {
                    setAuthMode('login');
                    setIsRegistering(true);
                  } else {
                    setView('my-posts');
                  }
                }}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'my-posts' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                My Posts
              </button>
              <button 
                onClick={() => setView('donations')}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${view === 'donations' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Support Us
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full">
                  <CreditCard size={16} className="text-gray-500" />
                  <span className="text-sm font-bold">{user.credits} Credits</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right hidden md:block">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Your Score</p>
                    <p className="text-lg font-mono font-bold leading-none">{user.score?.toFixed(1) || '0.0'}/100</p>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="w-10 h-10 bg-white border border-black/5 rounded-full flex items-center justify-center shadow-sm hover:border-black/20 transition-all cursor-pointer"
                  >
                    <UserIcon size={20} />
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setIsRegistering(true);
                }}
                className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold hover:bg-gray-800 transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="md:hidden border-t border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-3 overflow-x-auto no-scrollbar">
            <nav className="flex items-center justify-center gap-1 p-1 bg-gray-100 rounded-xl w-max mx-auto">
              <button 
                onClick={() => setView('feed')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${view === 'feed' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Discovery
              </button>
              <button 
                onClick={() => {
                  if (!user) {
                    setAuthMode('login');
                    setIsRegistering(true);
                  } else {
                    setView('my-posts');
                  }
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${view === 'my-posts' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                My Posts
              </button>
              <button 
                onClick={() => setView('donations')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${view === 'donations' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}
              >
                Support Us
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {view === 'feed' && (
          <>
            {/* Search & Filters */}
            <div className="mb-12 space-y-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search keywords or content..."
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-black/5 shadow-sm focus:ring-2 focus:ring-black outline-none transition-all"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => {
                    if (!user) {
                      setAuthMode('login');
                      setIsRegistering(true);
                    } else {
                      setIsPosting(true);
                    }
                  }}
                  className="px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                >
                  <Plus size={20} />
                  Post Opinion
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Filter size={16} />
                  <span>Filter:</span>
                </div>
                
                <select 
                  className="px-4 py-2 bg-white rounded-xl border border-black/5 text-sm outline-none"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="highest_opinion">Highest Opinion Score</option>
                  <option value="highest_user">Highest Person Score</option>
                  <option value="highest_iq">Highest IQ</option>
                </select>

                <select 
                  className="px-4 py-2 bg-white rounded-xl border border-black/5 text-sm outline-none"
                  value={ageFilter}
                  onChange={e => setAgeFilter(e.target.value)}
                >
                  <option value="">All Ages</option>
                  {AGE_GROUPS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>

                <div className="w-64">
                  <MultiSelectProfession 
                    selected={profFilter}
                    onChange={setProfFilter}
                  />
                </div>

                <div className="w-64">
                  <MultiSelectEducation 
                    selected={eduFilter}
                    onChange={setEduFilter}
                  />
                </div>

                <div className="w-64">
                  <MultiSelectAncestry 
                    selected={ancestryFilter}
                    onChange={setAncestryFilter}
                  />
                </div>

                <div className="w-64">
                  <MultiSelectEthnicity 
                    selected={ethnicityFilter}
                    onChange={setEthnicityFilter}
                  />
                </div>
              </div>
            </div>

            {/* Opinions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {opinions.map((op) => (
                <motion.div
                  key={op.id}
                  layoutId={op.id}
                  onClick={() => handleViewOpinion(op)}
                  className="group relative bg-white p-6 rounded-3xl border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex justify-between items-end mb-4">
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Opinion</p>
                      <p className="text-3xl font-mono font-bold">{op.opinion_score.toFixed(0)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Person</p>
                      <p className="text-3xl font-mono font-bold text-gray-400 group-hover:text-black transition-colors">{op.user_score.toFixed(0)}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-4">
                    {op.keywords.split(',').slice(0, 3).map((k, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-wider rounded-md text-gray-500">
                        {k}
                      </span>
                    ))}
                  </div>

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold">
                      <span>View Opinion</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {opinions.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 font-serif italic text-xl">No opinions found matching your criteria.</p>
              </div>
            )}
          </>
        )}

        {view === 'my-posts' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">My Opinions</h2>
                <p className="text-gray-500">A collection of your anonymous contributions to Opinio.</p>
              </div>
              <button 
                onClick={() => setIsPosting(true)}
                className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all"
              >
                <Plus size={20} />
                New Post
              </button>
            </div>

            <div className="space-y-6">
              {userOpinions.map((op) => (
                <motion.div 
                  key={op.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-8 rounded-[32px] border border-black/5 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-wrap gap-2">
                      {op.keywords.split(',').map((k, i) => (
                        <span key={i} className="px-3 py-1 bg-gray-100 text-[10px] font-bold uppercase tracking-widest rounded-full text-gray-400">
                          {k}
                        </span>
                      ))}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Avg Rating</p>
                      <p className="text-2xl font-mono font-bold">{op.opinion_score.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <p className="text-2xl font-serif italic text-gray-800 leading-relaxed mb-6">
                    "{op.content}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-xs text-gray-400 font-mono">
                      Posted on {new Date(op.created_at).toLocaleDateString()}
                    </span>
                    <button 
                      onClick={() => handleDeleteOpinion(op.id)}
                      className="flex items-center gap-2 text-xs font-bold text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete Post
                    </button>
                  </div>
                </motion.div>
              ))}

              {userOpinions.length === 0 && (
                <div className="text-center py-20 bg-white rounded-[32px] border border-dashed border-gray-200">
                  <p className="text-gray-400 font-serif italic text-xl mb-4">You haven't shared any opinions yet.</p>
                  <button 
                    onClick={() => setIsPosting(true)}
                    className="text-black font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Share your first opinion
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'donations' && (
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[48px] p-12 shadow-xl border border-black/5 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Heart className="text-emerald-600" size={40} fill="currentColor" />
              </div>
              
              <h2 className="text-4xl font-serif font-bold mb-6">Support Our Mission</h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed mb-12">
                <p>
                  Opinio was built on the belief that honest, anonymous discourse is essential for a healthy society. 
                  To keep this platform a pure space for ideas, we don't sell your data or run intrusive ads.
                </p>
                <p>
                  Your donations directly support:
                </p>
                <ul className="text-left max-w-md mx-auto space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><b>Keeping the site free</b> for everyone to share and learn.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><b>Expanding our audience</b> to bring more diverse perspectives to the feed.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span><b>Fairly paying employees</b> who maintain, operate, and improve the website daily.</span>
                  </li>
                </ul>
              </div>

              <a 
                href="https://www.paypal.com/donate?campaign_id=N4BA2TUHKLF6E"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-12 py-6 bg-black text-white rounded-2xl font-bold text-xl hover:bg-gray-800 transition-all shadow-xl shadow-black/20 hover:-translate-y-1"
              >
                <Heart size={24} />
                Donate via PayPal
              </a>
              
              <p className="mt-8 text-sm text-gray-400 font-medium">
                Thank you for helping us build a more transparent world.
              </p>
            </motion.div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-8 pb-4">
                <h2 className="text-2xl font-serif font-bold">Account Settings</h2>
                <button onClick={() => setIsSettingsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-0">
                <form onSubmit={handleUpdateSettings} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 font-bold">
                    @{user?.username}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600">
                    {user?.email}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Profession</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={settingsForm.profession}
                    onChange={e => setSettingsForm({...settingsForm, profession: e.target.value})}
                  >
                    {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Age Group</label>
                  <div className="grid grid-cols-3 gap-2">
                    {AGE_GROUPS.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setSettingsForm({...settingsForm, age_group: a})}
                        className={`p-3 text-sm rounded-xl border transition-all ${settingsForm.age_group === a ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Education Level</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={settingsForm.education_level}
                    onChange={e => setSettingsForm({...settingsForm, education_level: e.target.value})}
                  >
                    {EDUCATION_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ancestry</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={settingsForm.ancestry}
                    onChange={e => setSettingsForm({...settingsForm, ancestry: e.target.value})}
                  >
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ethnicity</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={settingsForm.ethnicity}
                    onChange={e => setSettingsForm({...settingsForm, ethnicity: e.target.value})}
                  >
                    {ETHNICITIES.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Claimed IQ</label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settingsForm.iq === null}
                        onChange={e => setSettingsForm({...settingsForm, iq: e.target.checked ? null : 100})}
                        className="accent-black"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Unknown</span>
                    </label>
                  </div>
                  {settingsForm.iq !== null ? (
                    <>
                      <input 
                        type="range" 
                        min="70" 
                        max="160" 
                        step="1"
                        className="w-full accent-black"
                        value={settingsForm.iq}
                        onChange={e => setSettingsForm({...settingsForm, iq: parseInt(e.target.value)})}
                      />
                      <div className="flex justify-between text-xs font-mono text-gray-400 mt-2">
                        <span>70</span>
                        <span className="text-black font-bold">{settingsForm.iq}</span>
                        <span>160</span>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 italic">
                      IQ will be listed as "Unknown"
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                  Save Changes
                </button>

                <div className="pt-6 border-t border-gray-100">
                  <button 
                    type="button"
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-bold hover:bg-red-100 transition-all"
                  >
                    Log Out
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* Post Modal */}
      <AnimatePresence>
        {isPosting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPosting(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-8 pb-4">
                <h2 className="text-2xl font-serif font-bold">Share Your Opinion</h2>
                <button onClick={() => setIsPosting(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 pt-0">
                <form onSubmit={handlePost} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">The Opinion</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="What do you believe?"
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                    value={postForm.content}
                    onChange={e => setPostForm({...postForm, content: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Keywords (Comma separated)</label>
                  <input 
                    required
                    type="text" 
                    placeholder="politics, technology, food..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                    value={postForm.keywords}
                    onChange={e => setPostForm({...postForm, keywords: e.target.value})}
                  />
                </div>

                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <TrendingUp className="text-emerald-600" />
                  <p className="text-sm text-emerald-800">Posting this will earn you <b>1 Credit</b> to view others' opinions.</p>
                </div>

                <button type="submit" className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                  Publish Anonymously
                </button>
              </form>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {viewedOpinion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
            >
              <div className="flex justify-between items-center p-12 pb-4">
                <div className="flex-1" />
                <button 
                  onClick={() => setViewedOpinion(null)}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-12 pt-0">
                <div className="flex flex-wrap gap-6 mb-12">
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <Briefcase size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">{viewedOpinion.profession}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">{viewedOpinion.age_group}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <GraduationCap size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">{viewedOpinion.education_level}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <Globe size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">{viewedOpinion.ancestry}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <UserIcon size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">{viewedOpinion.ethnicity}</span>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-full">
                    <Brain size={16} className="text-gray-500" />
                    <span className="text-sm font-bold">IQ {viewedOpinion.iq ?? 'Unknown'}</span>
                  </div>
                </div>

                <div className="mb-12">
                  <p className="text-3xl font-serif leading-relaxed text-gray-800 italic">
                    "{viewedOpinion.content}"
                  </p>
                </div>

                <div className="pt-12 border-t border-gray-100">
                  <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Rate this opinion (0-100)</p>
                  
                  <div className="space-y-8">
                    <div className="relative pt-4">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="10"
                        list="tickmarks"
                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                        value={ratingValue}
                        onChange={e => setRatingValue(parseInt(e.target.value))}
                      />
                      <datalist id="tickmarks">
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(v => (
                          <option key={v} value={v} />
                        ))}
                      </datalist>
                      <div className="flex justify-between mt-4 text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest">
                        <span>Low Value (0)</span>
                        <span className="text-black text-lg">{ratingValue}</span>
                        <span>High Value (100)</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRate(ratingValue)}
                      className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10"
                    >
                      Submit Exact Rating
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Auth Modal */}
      <AnimatePresence>
        {isRegistering && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRegistering(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-black/5 overflow-y-auto max-h-[90vh]"
            >
              <button 
                onClick={() => setIsRegistering(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex gap-4 mb-8 p-1 bg-gray-100 rounded-2xl">
                <button 
                  onClick={() => setAuthMode('signup')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${authMode === 'signup' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${authMode === 'login' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  Log In
                </button>
              </div>

              <h1 className="text-3xl font-serif font-bold mb-2">
                {authMode === 'signup' ? 'Initialize Identity' : 'Welcome Back'}
              </h1>
              <p className="text-gray-500 mb-6 text-sm">
                {authMode === 'signup' ? 'Select your traits. Your identity remains anonymous.' : 'Enter your credentials to access your account.'}
              </p>
              
              {authMode === 'signup' && (
                <div className="p-4 bg-black/5 rounded-2xl mb-8">
                  <p className="text-xs font-bold uppercase tracking-wider text-black mb-1">Credit System</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Opinio operates on a contribution model. Each opinion you share earns you <span className="text-black font-bold">1 credit</span>, which allows you to unlock and view another person's full opinion.
                  </p>
                </div>
              )}
              
              <form onSubmit={authMode === 'signup' ? handleRegister : handleLogin} className="space-y-6">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Username</label>
                    <input 
                      type="text" 
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                      value={regForm.username}
                      onChange={e => setRegForm({...regForm, username: e.target.value})}
                      placeholder="johndoe"
                      required
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                    {authMode === 'signup' ? 'Email Address' : 'Username or Email'}
                  </label>
                  <input 
                    type={authMode === 'signup' ? 'email' : 'text'}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                    value={authMode === 'signup' ? regForm.email : loginForm.identifier}
                    onChange={e => authMode === 'signup' ? setRegForm({...regForm, email: e.target.value}) : setLoginForm({...loginForm, identifier: e.target.value})}
                    placeholder={authMode === 'signup' ? 'you@example.com' : 'Username or Email'}
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                  <input 
                    type="password" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all text-sm"
                    value={authMode === 'signup' ? regForm.password : loginForm.password}
                    onChange={e => authMode === 'signup' ? setRegForm({...regForm, password: e.target.value}) : setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>

                {authMode === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Profession</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                        value={regForm.profession}
                        onChange={e => setRegForm({...regForm, profession: e.target.value})}
                      >
                        {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Age Group</label>
                      <div className="grid grid-cols-3 gap-2">
                        {AGE_GROUPS.map(a => (
                          <button
                            key={a}
                            type="button"
                            onClick={() => setRegForm({...regForm, age_group: a})}
                            className={`p-3 text-sm rounded-xl border transition-all ${regForm.age_group === a ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Education Level</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                        value={regForm.education_level}
                        onChange={e => setRegForm({...regForm, education_level: e.target.value})}
                      >
                        {EDUCATION_LEVELS.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ancestry</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                        value={regForm.ancestry}
                        onChange={e => setRegForm({...regForm, ancestry: e.target.value})}
                      >
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Ethnicity</label>
                      <select 
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none transition-all"
                        value={regForm.ethnicity}
                        onChange={e => setRegForm({...regForm, ethnicity: e.target.value})}
                      >
                        {ETHNICITIES.map(e => <option key={e} value={e}>{e}</option>)}
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400">Claimed IQ (Self-Reported)</label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={regForm.iq === null}
                            onChange={e => setRegForm({...regForm, iq: e.target.checked ? null : 100})}
                            className="accent-black"
                          />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Unknown</span>
                        </label>
                      </div>
                      {regForm.iq !== null ? (
                        <>
                          <input 
                            type="range" 
                            min="70" 
                            max="160" 
                            step="1"
                            className="w-full accent-black"
                            value={regForm.iq}
                            onChange={e => setRegForm({...regForm, iq: parseInt(e.target.value)})}
                          />
                          <div className="flex justify-between text-xs font-mono text-gray-400 mt-2">
                            <span>70</span>
                            <span className="text-black font-bold">{regForm.iq}</span>
                            <span>160</span>
                          </div>
                        </>
                      ) : (
                        <div className="p-4 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center text-xs text-gray-400 italic">
                          IQ will be listed as "Unknown"
                        </div>
                      )}
                    </div>
                  </>
                )}

                <button type="submit" className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-black/10">
                  {authMode === 'signup' ? 'Enter Opinio' : 'Log In'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
