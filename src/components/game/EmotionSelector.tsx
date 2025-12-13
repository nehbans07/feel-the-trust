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

export const EmotionSelector = ({ selectedEmotions, onToggle }: EmotionSelectorProps) => {
  return (
    <div className="game-card">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
        What emotion is triggered? (select 1-2)
      </h3>
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => {
          const isSelected = selectedEmotions.includes(emotion.type);
          const styles = emotionStyles[emotion.type];
          
          return (
            <button
              key={emotion.type}
              onClick={() => onToggle(emotion.type)}
              className={cn(
                'emotion-chip flex items-center gap-2',
                isSelected ? `${styles.selected} ${styles.ring} selected` : styles.bg
              )}
            >
              <span className="text-base">{emotion.emoji}</span>
              <span className="font-medium text-sm">{emotion.type}</span>
            </button>
          );
        })}
      </div>
      {selectedEmotions.length > 0 && (
        <p className="text-xs text-muted-foreground mt-3">
          Selected: {selectedEmotions.join(', ')}
        </p>
      )}
    </div>
  );
};
