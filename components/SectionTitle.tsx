type SectionTitleProps = {
  text: string
  color: string
  echoColor?: string
}

export default function SectionTitle({ text, color, echoColor = "#FFFFFF" }: SectionTitleProps) {
  return (
    <div className="relative inline-block min-h-[132px] leading-[0.9] uppercase text-center overflow-visible">
      <h2
        className="relative z-10 text-[48px] md:text-[48px] lg:text-[48px] font-bold tracking-[-0.02em]"
        style={{ color }}
      >
        {text}
      </h2>
      <span
        className="absolute left-0 top-[40px] md:top-[40px] lg:top-[40px] text-[48px] md:text-[48px] lg:text-[48px] font-bold tracking-[-0.02em]"
        style={{ color: echoColor, opacity: 0.7 }}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        className="absolute left-0 top-[80px] md:top-[80px] lg:top-[80px] text-[48px] md:text-[48px] lg:text-[48px] font-bold tracking-[-0.02em]"
        style={{ color: echoColor, opacity: 0.3 }}
        aria-hidden="true"
      >
        {text}
      </span>
    </div>
  )
}
