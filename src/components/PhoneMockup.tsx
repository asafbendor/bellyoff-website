import { Lang, t } from '@/i18n/translations';

type Screen = 'summary' | 'maya' | 'alex';

interface Props {
  screen: Screen;
  lang: Lang;
  className?: string;
}

function SummaryScreen({ tr }: { tr: ReturnType<typeof t> }) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0D0F14] overflow-hidden">
      <div className="px-4 pt-5 pb-3">
        <div className="text-[9px] text-[#8A8A9A] mb-0.5">{tr.phone_streak}</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-white">21</div>
          <div className="text-[9px] text-[#6C63FF]">🔥</div>
        </div>
      </div>
      <div className="px-4 pb-2">
        <div className="text-[8px] text-[#8A8A9A] mb-1">{tr.phone_weight}</div>
        <div className="h-16 relative">
          <svg viewBox="0 0 120 48" className="w-full h-full" preserveAspectRatio="none">
            <polyline
              points="0,40 20,36 40,32 60,28 80,22 100,16 120,12"
              fill="none"
              stroke="#6C63FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="0,40 20,36 40,32 60,28 80,22 100,16 120,12"
              fill="url(#grad)"
              stroke="none"
              opacity="0.2"
            />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6C63FF" />
                <stop offset="100%" stopColor="#6C63FF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="mx-4 mb-3 bg-[#1A1D26] rounded-xl p-3">
        <div className="text-[8px] text-[#8A8A9A] mb-1">{tr.phone_waist}</div>
        <div className="flex items-center justify-between">
          <div className="text-base font-bold text-[#00D4AA]">-3.4<span className="text-[8px] font-normal ml-0.5">cm</span></div>
          <div className="w-16 h-2 bg-[#0D0F14] rounded-full overflow-hidden">
            <div className="h-full bg-[#00D4AA] rounded-full" style={{ width: '68%' }} />
          </div>
        </div>
      </div>
      <div className="flex-1 mx-4 bg-[#1A1D26] rounded-xl p-3">
        <div className="text-[8px] text-[#8A8A9A] mb-2">Workouts this week</div>
        <div className="flex gap-1.5">
          {[1,1,1,1,0,1,1].map((done, i) => (
            <div key={i} className={`flex-1 h-5 rounded ${done ? 'bg-[#6C63FF]' : 'bg-[#0D0F14]'}`} />
          ))}
        </div>
      </div>
      <div className="h-4" />
    </div>
  );
}

function WorkoutScreen({ trainer, phaseLabel, gradient, timerColor, tr }: {
  trainer: string;
  phaseLabel: string;
  gradient: string;
  timerColor: string;
  tr: ReturnType<typeof t>;
}) {
  return (
    <div className={`absolute inset-0 flex flex-col ${gradient} overflow-hidden`}>
      <div className="px-3 pt-4 flex items-center justify-between">
        <div className={`text-[8px] font-semibold px-2 py-0.5 rounded-full ${timerColor} bg-white/10`}>
          {phaseLabel}
        </div>
        <div className="text-[8px] text-white/60">3 / 10</div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
          <span className="text-2xl">{trainer === 'maya' ? '🧘‍♀️' : '🧘‍♂️'}</span>
        </div>
      </div>
      <div className="px-4 pb-3 text-center">
        <div className="text-white text-[11px] font-semibold mb-1">
          {trainer === 'maya' ? 'Deep Belly Breathing' : 'Pelvis Correction'}
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <svg className="w-10 h-10" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" />
            <circle
              cx="20" cy="20" r="16" fill="none" stroke="white" strokeWidth="2.5"
              strokeDasharray="100.5" strokeDashoffset="30"
              strokeLinecap="round"
              style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
            />
            <text x="20" y="24" textAnchor="middle" fill="white" fontSize="9" fontWeight="600">0:42</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function PhoneMockup({ screen, lang, className = '' }: Props) {
  const tr = t(lang);
  return (
    <div className={`relative ${className}`}>
      <div className="relative w-[120px] h-[220px] rounded-[20px] bg-[#0D0F14] border-2 border-[#2A2A3A] shadow-lg overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#0D0F14] border-b-2 border-[#2A2A3A] rounded-b-xl z-10" />
        <div className="absolute inset-0 m-[3px] rounded-[18px] overflow-hidden">
          {screen === 'summary' && <SummaryScreen tr={tr} />}
          {screen === 'maya' && (
            <WorkoutScreen
              trainer="maya"
              phaseLabel={tr.phone_phase_a}
              gradient="bg-gradient-to-b from-[#1A2040] to-[#0D0F14]"
              timerColor="text-[#9C95FF]"
              tr={tr}
            />
          )}
          {screen === 'alex' && (
            <WorkoutScreen
              trainer="alex"
              phaseLabel={tr.phone_phase_b}
              gradient="bg-gradient-to-b from-[#0D2A28] to-[#0D0F14]"
              timerColor="text-[#00D4AA]"
              tr={tr}
            />
          )}
        </div>
      </div>
      <div className="mt-2 text-center text-[10px] text-[#8A8A9A]">
        {screen === 'summary' && tr.phone_label_summary}
        {screen === 'maya' && tr.phone_label_maya}
        {screen === 'alex' && tr.phone_label_alex}
      </div>
    </div>
  );
}
