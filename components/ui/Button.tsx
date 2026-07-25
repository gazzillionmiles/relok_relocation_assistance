import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'w-full h-11 rounded-xl flex items-center justify-center font-semibold text-sm transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#128A4E] focus-visible:ring-offset-2 cursor-pointer select-none';

  const variantStyles = {
    primary:
      disabled || isLoading
        ? 'bg-[#128A4E]/40 text-white cursor-not-allowed shadow-none'
        : 'bg-[#128A4E] hover:bg-[#0F7A44] text-white shadow-sm hover:shadow',
    secondary:
      disabled || isLoading
        ? 'bg-gray-100 border-[1.5px] border-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white border-[1.5px] border-[#128A4E] text-[#128A4E] hover:bg-[#E8F5EE]',
    outline:
      disabled || isLoading
        ? 'bg-gray-50 border border-gray-200 text-gray-400 cursor-not-allowed'
        : 'bg-white border border-[#E5E7EB] text-[#0F172A] hover:bg-slate-50',
    ghost:
      disabled || isLoading
        ? 'text-gray-300 cursor-not-allowed'
        : 'text-[#128A4E] hover:bg-[#E8F5EE]/50 hover:text-[#0F7A44]',
  };

  return (
    <button
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span>{children}</span>
          {icon && <span className="shrink-0">{icon}</span>}
        </div>
      )}
    </button>
  );
}
