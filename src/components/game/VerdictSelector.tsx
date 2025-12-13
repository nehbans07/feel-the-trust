import { VerdictType } from '@/data/gameMessages';
import { cn } from '@/lib/utils';
import { ShieldCheck, ShieldX } from 'lucide-react';

interface VerdictSelectorProps {
  selectedVerdict: VerdictType | null;
  onSelect: (verdict: VerdictType) => void;
}

export const VerdictSelector = ({ selectedVerdict, onSelect }: VerdictSelectorProps) => {
  return (
    <div className="game-card">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        Your Verdict
      </h3>
      <div className="flex gap-3">
        <button
          onClick={() => onSelect('TRUST')}
          className={cn(
            'verdict-btn flex items-center justify-center gap-2',
            selectedVerdict === 'TRUST'
              ? 'bg-trust text-trust-foreground border-trust shadow-lg shadow-trust/25'
              : 'bg-trust/10 text-trust border-trust/30 hover:bg-trust/20'
          )}
        >
          <ShieldCheck className="w-5 h-5" />
          <span>TRUST</span>
          <span>✅</span>
        </button>
        
        <button
          onClick={() => onSelect('TRAP')}
          className={cn(
            'verdict-btn flex items-center justify-center gap-2',
            selectedVerdict === 'TRAP'
              ? 'bg-trap text-trap-foreground border-trap shadow-lg shadow-trap/25'
              : 'bg-trap/10 text-trap border-trap/30 hover:bg-trap/20'
          )}
        >
          <ShieldX className="w-5 h-5" />
          <span>TRAP</span>
          <span>🚫</span>
        </button>
      </div>
    </div>
  );
};
