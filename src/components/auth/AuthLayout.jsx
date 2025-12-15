import { Apple } from 'lucide-react';

export default function AuthLayout({ title, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-card p-8 rounded-2xl shadow-card">
        {/* Logo + Title */}
        <div className="text-center mb-6">
          <Apple className="mx-auto w-10 h-10" />
          <h1 className="text-2xl font-bold mt-2">{title}</h1>
        </div>

        {/* Form */}
        {children}

        {/* Footer (links) */}
        {footer && (
          <p className="text-center text-sm mt-4">
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
