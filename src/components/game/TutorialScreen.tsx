import { ArrowRight, Skull, AlertCircle, UserX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { emotions } from '@/data/gameMessages';

interface TutorialScreenProps {
  onContinue: () => void;
}

const emotionColors: Record<string, string> = {
  Fear: 'bg-red-100 border-red-300 text-red-700',
  Urgency: 'bg-orange-100 border-orange-300 text-orange-700',
  Greed: 'bg-emerald-100 border-emerald-300 text-emerald-700',
  Authority: 'bg-blue-100 border-blue-300 text-blue-700',
  Manipulation: 'bg-purple-100 border-purple-300 text-purple-700',
};

const examplePillColors: Record<string, string> = {
  Fear: 'bg-red-200/50 text-red-600',
  Urgency: 'bg-orange-200/50 text-orange-600',
  Greed: 'bg-emerald-200/50 text-emerald-600',
  Authority: 'bg-blue-200/50 text-blue-600',
  Manipulation: 'bg-purple-200/50 text-purple-600',
};

// Filter out 'Safe' - it's not an emotion scammers use
const scammerEmotions = emotions.filter(e => e.type !== 'Safe');

export const TutorialScreen = ({ onContinue }: TutorialScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 animate-slide-up">
      <div className="max-w-2xl mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Skull className="w-6 h-6 md:w-8 md:h-8 text-trap" />
            <UserX className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 md:mb-2">
            5 Emotions Scammers Use
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            They manipulate these feelings to trick you
          </p>
        </div>

        {/* Emotion Cards - Grid for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
          {scammerEmotions.map((emotion, index) => (
            <div
              key={emotion.type}
              className={`game-card p-3 md:p-4 border-2 ${emotionColors[emotion.type]} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-2 md:gap-3">
                <span className="text-xl md:text-2xl">{emotion.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm md:text-base mb-0.5 md:mb-1">{emotion.type}</h3>
                  <p className="text-xs md:text-sm opacity-80 mb-1.5 md:mb-2">{emotion.description}</p>
                  <div className="flex flex-wrap gap-1 md:gap-1.5">
                    {emotion.examples.slice(0, 3).map((example) => (
                      <span
                        key={example}
                        className={`text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 rounded-full font-medium ${examplePillColors[emotion.type]}`}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Safe Messages Note */}
        <div className="game-card p-3 md:p-4 bg-trust/10 border-trust/30 mb-4 md:mb-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-start gap-2 md:gap-3">
            <span className="text-xl md:text-2xl">✅</span>
            <div>
              <h3 className="font-bold text-sm md:text-base text-trust mb-0.5 md:mb-1">Legitimate Messages</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Real messages share facts without emotional pressure. No urgency, no threats, no too-good-to-be-true offers.
              </p>
            </div>
          </div>
        </div>

        {/* Illustration hint */}
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4 md:mb-6 text-muted-foreground animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-2xl md:text-3xl">🎣</div>
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
          <div className="text-2xl md:text-3xl">🕵️</div>
          <AlertCircle className="w-4 h-4 md:w-5 md:h-5" />
          <div className="text-2xl md:text-3xl">💻</div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full h-12 md:h-14 text-base md:text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Got it! Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
