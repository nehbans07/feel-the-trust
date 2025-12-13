import { CheckCircle, XCircle, ArrowRight, ArrowLeft, Lightbulb, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameMessage, EmotionType, VerdictType } from '@/data/gameMessages';
import { cn } from '@/lib/utils';

interface FeedbackScreenProps {
  message: GameMessage;
  userEmotions: EmotionType[];
  userVerdict: VerdictType;
  onNext: () => void;
  onBack?: () => void;
  isLastQuestion: boolean;
  showBackButton?: boolean;
}

const emotionColors: Record<EmotionType, string> = {
  Fear: 'bg-red-100 text-red-700',
  Urgency: 'bg-orange-100 text-orange-700',
  Greed: 'bg-emerald-100 text-emerald-700',
  Authority: 'bg-blue-100 text-blue-700',
  Manipulation: 'bg-purple-100 text-purple-700',
  Safe: 'bg-teal-100 text-teal-700',
};

export const FeedbackScreen = ({
  message,
  userEmotions,
  userVerdict,
  onNext,
  onBack,
  isLastQuestion,
  showBackButton = false,
}: FeedbackScreenProps) => {
  const isCorrect = userVerdict === message.correctVerdict;
  const emotionsMatch = message.correctEmotions.some((e) => userEmotions.includes(e));

  // Dynamic explanation title based on verdict
  const getExplanationTitle = () => {
    if (message.correctVerdict === 'TRUST') {
      return 'Why this message looks trustworthy';
    }
    return 'Why this is a TRAP';
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 animate-slide-up">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Result Banner */}
        <div
          className={cn(
            'game-card text-center py-4 md:py-6 mb-3 md:mb-4 animate-bounce-in',
            isCorrect
              ? 'bg-trust/10 border-trust/30'
              : 'bg-trap/10 border-trap/30'
          )}
        >
          <div className="flex justify-center mb-2 md:mb-3">
            {isCorrect ? (
              <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-trust" />
            ) : (
              <XCircle className="w-12 h-12 md:w-16 md:h-16 text-trap" />
            )}
          </div>
          <h2 className={cn('text-xl md:text-2xl font-bold', isCorrect ? 'text-trust' : 'text-trap')}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mt-1">
            {isCorrect
              ? "Great job! You're learning to spot the tricks!"
              : "Good try! Here's what to look for..."}
          </p>
        </div>

        {/* Grid layout for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
          {/* Correct Answer */}
          <div className="game-card">
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 md:mb-3 uppercase tracking-wide">
              Correct Answer
            </h3>
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  'px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-base md:text-lg',
                  message.correctVerdict === 'TRAP'
                    ? 'bg-trap text-trap-foreground'
                    : 'bg-trust text-trust-foreground'
                )}
              >
                {message.correctVerdict} {message.correctVerdict === 'TRAP' ? '🚫' : '✅'}
              </span>
            </div>
          </div>

          {/* Emotions Breakdown */}
          <div className="game-card">
            <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-2 md:mb-3 uppercase tracking-wide flex items-center gap-2">
              <span>📊</span> Emotions in this message
            </h3>
            <div className="space-y-1.5 md:space-y-2">
              {message.correctEmotions.map((emotion, index) => (
                <div
                  key={emotion}
                  className={cn(
                    'px-2 md:px-3 py-1.5 md:py-2 rounded-lg flex items-center gap-2 text-sm md:text-base',
                    emotionColors[emotion]
                  )}
                >
                  <span className="font-medium">{emotion}</span>
                  <span className="text-[10px] md:text-xs opacity-70">
                    ({index === 0 ? 'main' : 'secondary'})
                  </span>
                  {userEmotions.includes(emotion) && (
                    <CheckCircle className="w-3 h-3 md:w-4 md:h-4 ml-auto" />
                  )}
                </div>
              ))}
            </div>
            {emotionsMatch && (
              <p className="text-[10px] md:text-xs text-success mt-2 font-medium">
                ✓ You identified at least one correct emotion!
              </p>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="game-card mb-3 md:mb-4 bg-primary/5 border-primary/20">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wide flex items-center gap-2">
            <Lightbulb className="w-3 h-3 md:w-4 md:h-4" /> {getExplanationTitle()}
          </h3>
          <p className="text-sm md:text-base text-foreground leading-relaxed">{message.explanation}</p>
        </div>

        {/* Advice */}
        <div className="game-card mb-4 md:mb-6 bg-warning/10 border-warning/30">
          <h3 className="text-xs md:text-sm font-semibold text-muted-foreground mb-1.5 md:mb-2 uppercase tracking-wide flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-warning" /> What to do instead
          </h3>
          <p className="text-sm md:text-base text-foreground leading-relaxed">{message.advice}</p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-auto flex gap-3">
          {showBackButton && onBack && (
            <Button
              onClick={onBack}
              variant="outline"
              size="lg"
              className="h-12 md:h-14 px-4 md:px-6 rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          )}
          <Button
            onClick={onNext}
            size="lg"
            className="flex-1 h-12 md:h-14 text-base md:text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLastQuestion ? 'See Results' : 'Next Message'}
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
