import { ArrowRight } from 'lucide-react';
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
  Safe: 'bg-teal-100 border-teal-300 text-teal-700',
};

const examplePillColors: Record<string, string> = {
  Fear: 'bg-red-200/50 text-red-600',
  Urgency: 'bg-orange-200/50 text-orange-600',
  Greed: 'bg-emerald-200/50 text-emerald-600',
  Authority: 'bg-blue-200/50 text-blue-600',
  Manipulation: 'bg-purple-200/50 text-purple-600',
  Safe: 'bg-teal-200/50 text-teal-600',
};

export const TutorialScreen = ({ onContinue }: TutorialScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col p-6 animate-slide-up">
      <div className="max-w-lg mx-auto w-full flex-1">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            The 6 Emotions
          </h2>
          <p className="text-muted-foreground">
            Scammers use these emotions to manipulate you
          </p>
        </div>

        {/* Emotion Cards */}
        <div className="space-y-3 mb-8">
          {emotions.map((emotion, index) => (
            <div
              key={emotion.type}
              className={`game-card p-4 border-2 ${emotionColors[emotion.type]} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{emotion.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base mb-1">{emotion.type}</h3>
                  <p className="text-sm opacity-80 mb-2">{emotion.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {emotion.examples.map((example) => (
                      <span
                        key={example}
                        className={`text-xs px-2 py-0.5 rounded-full font-medium ${examplePillColors[emotion.type]}`}
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

        {/* Continue Button */}
        <Button
          onClick={onContinue}
          size="lg"
          className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Got it! Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
