type ImagePlaceholderProps = {
  label: string;
  className?: string;
};

export function ImagePlaceholder({ label, className = "" }: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center bg-neutral-300 text-center text-xs font-medium leading-snug text-neutral-700 ring-1 ring-inset ring-neutral-400/50 ${className}`}
    >
      {label}
    </div>
  );
}
