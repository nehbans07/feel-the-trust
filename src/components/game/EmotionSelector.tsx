import { emotions, EmotionType } from '@/data/gameMessages';
import { cn } from '@/lib/utils';

interface EmotionSelectorProps {
  selectedEmotions: EmotionType[];
  onToggle: (emotion: EmotionType) => void;
}

const emotionStyles: Record<EmotionType, { bg: string; selected: string; ring: string }> = {
  Fear: {
    bg: 'bg-red-100 text-red-700 hover:bg-red-200',
    selected: 'bg-red-500 text-white',
    ring: 'ring-red-500',
  },
  Urgency: {
    bg: 'bg-orange-100 text-orange-700 hover:bg-orange-200',
    selected: 'bg-orange-500 text-white',
    ring: 'ring-orange-500',
  },
  Greed: {
    bg: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200',
    selected: 'bg-emerald-500 text-white',
    ring: 'ring-emerald-500',
  },
  Authority: {
    bg: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    selected: 'bg-blue-500 text-white',
    ring: 'ring-blue-500',
  },
  Manipulation: {
    bg: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    selected: 'bg-purple-500 text-white',
    ring: 'ring-purple-500',
  },
  Safe: {
    bg: 'bg-teal-100 text-teal-700 hover:bg-teal-200',
    selected: 'bg-teal-500 text-white',
    ring: 'ring-teal-500',
  },
};

// Separate scammer emotions from Safe
const scammerEmotions = emotions.filter(e => e.type !== 'Safe');
const safeEmotion = emotions.find(e => e.type === 'Safe')!;

export const EmotionSelector = ({ selectedEmotions, onToggle }: EmotionSelectorProps) => {
  return (
    <div className="game-card">
      <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 md:mb-3 uppercase tracking-wide">
        What emotion is triggered? (select 1-2)
      </h3>
      
      {/* Scammer emotions */}
      <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2 md:mb-3">
        {scammerEmotions.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion.type);
          const styles = emotionStyles[emotion.type];
          
          return (
            <button
              key={emotion.type}
              onClick={() => onToggle(emotion.type)}
              className={cn(
                'emotion-chip flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2',
                isSelected ? `${styles.selected} ${styles.ring} selected` : styles.bg
              )}
            >
              <span className="text-sm md:text-base">{emotion.emoji}</span>
              <span className="font-medium text-xs md:text-sm">{emotion.type}</span>
            </button>
          );
        })}
      </div>

      {/* Safe/Legitimate option - separate */}
      <div className="border-t border-border pt-2 md:pt-3">
        <p className="text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">Or is it legitimate?</p>
        <button
          onClick={() => onToggle(safeEmotion.type)}
          className={cn(
            'emotion-chip flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2',
            selectedEmotions.includes('Safe') 
              ? `${emotionStyles.Safe.selected} ${emotionStyles.Safe.ring} selected` 
              : emotionStyles.Safe.bg
          )}
        >
          <span className="text-sm md:text-base">{safeEmotion.emoji}</span>
          <span className="font-medium text-xs md:text-sm">Legitimate / No Trick</span>
        </button>
      </div>

      {selectedEmotions.length > 0 && (
        <p className="text-[10px] md:text-xs text-muted-foreground mt-2 md:mt-3">
          Selected: {selectedEmotions.join(', ')}
        </p>
      )}
    </div>
  );
};
