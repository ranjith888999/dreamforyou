import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'
import { Menu, X, LogOut, ShoppingCart, User } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { user, logout } = useAuthStore()
  const { uiMode, toggleUIMode } = useUIStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/home" className="flex items-center space-x-2">
            <div
              className="text-2xl font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  uiMode === 'zomato'
                    ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                    : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
              }}
            >
              🍕
            </div>
            <h1
              className="text-2xl font-bold text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  uiMode === 'zomato'
                    ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                    : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
              }}
            >
              DreamFood
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/home"
              className="text-slate-700 dark:text-slate-300 transition"
              style={{
                color: 'inherit',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  uiMode === 'zomato' ? '#E23744' : '#FC8019'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'inherit'
              }}
            >
              Home
            </Link>
            <Link
              href="/home"
              className="text-slate-700 dark:text-slate-300 transition"
              style={{
                color: 'inherit',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  uiMode === 'zomato' ? '#E23744' : '#FC8019'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'inherit'
              }}
            >
              Restaurants
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-700 dark:text-slate-300 transition"
              style={{
                color: 'inherit',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color =
                  uiMode === 'zomato' ? '#E23744' : '#FC8019'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'inherit'
              }}
            >
              Dashboard
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* UI Mode Toggle */}
            <button
              onClick={toggleUIMode}
              className={`relative w-24 h-10 rounded-full transition-all duration-300 flex items-center px-1 ${
                uiMode === 'zomato'
                  ? 'bg-gradient-to-r from-[#E23744] to-[#D63447]'
                  : 'bg-gradient-to-r from-[#FC8019] to-[#FD9139]'
              }`}
              title="Toggle between Swiggy and Zomato UI"
            >
              <div
                className={`absolute w-8 h-8 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center text-sm font-bold ${
                  uiMode === 'zomato' ? 'translate-x-12' : 'translate-x-1'
                }`}
              >
                {uiMode === 'zomato' ? '🟠' : '🔵'}
              </div>
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <ShoppingCart className="w-6 h-6" />
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{
                      background:
                        uiMode === 'zomato'
                          ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                          : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                    }}
                  >
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{user.fullName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-white rounded-lg hover:shadow-lg transition"
                style={{
                  background:
                    uiMode === 'zomato'
                      ? 'linear-gradient(135deg, #E23744 0%, #D63447 100%)'
                      : 'linear-gradient(135deg, #FC8019 0%, #FD9139 100%)',
                }}
              >
                Sign In
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="/home"
              className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/home"
              className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Restaurants
            </Link>
            <Link
              href="/dashboard"
              className="block px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              Dashboard
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
