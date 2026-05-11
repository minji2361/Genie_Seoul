type MediaSlotProps = {
  /** Tailwind aspect class, e.g. aspect-video, aspect-square */
  aspectClass?: string;
  className?: string;
  /** Screen reader + visible hint */
  label?: string;
  /** Secondary line under label */
  hint?: string;
  variant?: "on-purple" | "on-light" | "on-white";
};

const variantStyles: Record<NonNullable<MediaSlotProps["variant"]>, string> = {
  "on-purple":
    "border-2 border-dashed border-white/45 bg-white/10 text-white/85",
  "on-light":
    "border-2 border-dashed border-genie-purple/30 bg-genie-lavender/50 text-genie-purple/70",
  "on-white":
    "border-2 border-dashed border-genie-purple/25 bg-genie-lavender/40 text-genie-purple/65",
};

export default function MediaSlot({
  aspectClass = "aspect-[4/3]",
  className = "",
  label = "이미지 영역",
  hint = "추후 이미지·에셋 삽입",
  variant = "on-white",
}: MediaSlotProps) {
  return (
    <div
      role="img"
      aria-label={`${label}. ${hint}`}
      className={`flex flex-col items-center justify-center text-center px-4 py-6 ${aspectClass} ${variantStyles[variant]} ${className}`}
    >
      <span className="text-xs font-bold tracking-tight sm:text-sm">{label}</span>
      <span className="mt-1.5 text-[10px] font-medium opacity-90 sm:text-xs">{hint}</span>
    </div>
  );
}
