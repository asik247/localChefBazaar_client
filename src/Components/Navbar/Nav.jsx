import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../Auth/AuthProvider/AuthProvider';

const Nav = () => {
  const { user, logOutUsers } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/meals', label: 'Meals' },
    { to: '/dashboardLayouts', label: 'Dashboard' },
  ];

  // ! handler logOut
  const handlerLogOut = () => {
    logOutUsers()
      .then(() => {
        console.log('logOut done');
      });
  };

  const linkClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors ${isActive
      ? 'text-red-600'
      : 'text-base-content/70 hover:text-red-600'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md border-b border-base-300 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md shadow-red-500/30">
              <span className="text-white font-bold text-sm tracking-tight select-none">
                LCB
              </span>
              {/* Hover tooltip with full name */}
              <span className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-neutral text-neutral-content text-xs font-semibold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-lg">
                LocalChefBazaar
              </span>
            </div>
            <span className="font-bold text-base-content text-lg tracking-tight">
              LocalChef<span className="text-red-500">Bazaar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({ to, label }) => (
              <NavLink key={to} to={to} className={linkClass} end={to === '/'}>
                {({ isActive }) => (
                  <span className="relative py-2">
                    {label}
                    <span
                      className={`absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-red-500 transition-transform origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                    />
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* Auth */}
            {user ? (
              <div className="hidden sm:flex items-center gap-3">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName}
                  className="w-9 h-9 rounded-full object-cover border-2 border-red-500/50"
                />
                <button
                  onClick={handlerLogOut}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-base-content border border-base-300 hover:border-red-400 hover:text-red-600 transition-colors"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="hidden sm:inline-flex px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 hover:scale-[1.03] transition-all"
              >
                Log In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-base-200 transition-colors"
              aria-label="Toggle menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-base-300 pt-3">
            <nav className="flex flex-col gap-1">
              {navItems.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                      ? 'bg-red-50 text-red-600'
                      : 'text-base-content/70 hover:bg-base-200'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-3 pt-3 border-t border-base-300">
              {user ? (
                <div className="flex items-center gap-3 px-3">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-9 h-9 rounded-full object-cover border-2 border-red-500/50"
                  />
                  <button
                    onClick={() => {
                      handlerLogOut();
                      setMenuOpen(false);
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-base-content border border-base-300 hover:border-red-400 hover:text-red-600 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMenuOpen(false)}
                  className="block text-center mx-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-400 to-red-500 shadow-md shadow-red-500/30"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Nav;