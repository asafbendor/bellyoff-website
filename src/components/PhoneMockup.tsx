interface Props {
  src: string;
  width?: number;
  className?: string;
  alt?: string;
}

export default function PhoneMockup({ src, width = 200, className = '', alt = 'BellyOff app screen' }: Props) {
  const h = Math.round(width * 2.164);
  const r = Math.round(width * 0.183);
  const ri = r - 4;

  return (
    <div
      className={`relative select-none shrink-0 ${className}`}
      style={{ width: `${width}px`, height: `${h}px` }}
    >
      {/* Phone body */}
      <div
        className="absolute inset-0 bg-[#111111]"
        style={{
          borderRadius: `${r}px`,
          boxShadow: '0 40px 100px rgba(0,0,0,0.75), 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      />

      {/* Volume up */}
      <div
        className="absolute bg-[#1E1E1E]"
        style={{
          left: '-3px',
          top: `${Math.round(h * 0.155)}px`,
          width: '3px',
          height: `${Math.round(h * 0.065)}px`,
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Volume down */}
      <div
        className="absolute bg-[#1E1E1E]"
        style={{
          left: '-3px',
          top: `${Math.round(h * 0.245)}px`,
          width: '3px',
          height: `${Math.round(h * 0.1)}px`,
          borderRadius: '2px 0 0 2px',
        }}
      />
      {/* Power button */}
      <div
        className="absolute bg-[#1E1E1E]"
        style={{
          right: '-3px',
          top: `${Math.round(h * 0.2)}px`,
          width: '3px',
          height: `${Math.round(h * 0.085)}px`,
          borderRadius: '0 2px 2px 0',
        }}
      />

      {/* Screen bezel */}
      <div
        className="absolute overflow-hidden bg-[#0D0F14]"
        style={{ inset: '4px', borderRadius: `${ri}px` }}
      >
        {/* Screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Glass sheen */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '4px',
          borderRadius: `${ri}px`,
          background: 'linear-gradient(130deg, rgba(255,255,255,0.045) 0%, transparent 45%)',
        }}
      />
    </div>
  );
}
