type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmark?: boolean;
};

export function Logo({ className = "", markClassName = "h-7 w-7", wordmark = true }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className={markClassName}
      >
        <rect x="3" y="3" width="26" height="26" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M9 9h8v2H11v10H9V9Z" fill="currentColor" />
        <rect x="18" y="18" width="5" height="5" fill="#c8f542" />
      </svg>
      {wordmark ? (
        <span className="font-display text-[1.15rem] font-semibold tracking-tight">Outframe</span>
      ) : null}
    </span>
  );
}
