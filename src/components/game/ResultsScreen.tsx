import { Trophy, RotateCcw, Share2, Eye, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Answer {
  messageId: number;
  correct: boolean;
  correctVerdict: 'TRUST' | 'TRAP';
}

interface ResultsScreenProps {
  answers: Answer[];
  totalQuestions: number;
  onPlayAgain: () => void;
  onReviewMistakes: () => void;
}

const getAchievement = (score: number, total: number) => {
  const percentage = (score / total) * 100;
  if (percentage === 100) return { title: 'Perfect Score!', emoji: '🏆', color: 'text-yellow-500' };
  if (percentage >= 80) return { title: 'Scam Detector', emoji: '🛡️', color: 'text-primary' };
  if (percentage >= 60) return { title: 'Alert Learner', emoji: '📚', color: 'text-emerald-500' };
  if (percentage >= 40) return { title: 'Getting There', emoji: '💪', color: 'text-orange-500' };
  return { title: 'Keep Practicing', emoji: '🎯', color: 'text-muted-foreground' };
};

export const ResultsScreen = ({
  answers,
  totalQuestions,
  onPlayAgain,
  onReviewMistakes,
}: ResultsScreenProps) => {
  const correctAnswers = answers.filter((a) => a.correct).length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const achievement = getAchievement(correctAnswers, totalQuestions);

  const trapMessages = answers.filter((a) => a.correctVerdict === 'TRAP');
  const trustMessages = answers.filter((a) => a.correctVerdict === 'TRUST');
  const trapCorrect = trapMessages.filter((a) => a.correct).length;
  const trustCorrect = trustMessages.filter((a) => a.correct).length;

  const hasMistakes = correctAnswers < totalQuestions;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-slide-up">
      <div className="max-w-md mx-auto w-full text-center">
        {/* Celebration Header */}
        <div className="mb-8 animate-celebrate">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Game Complete!</h1>
        </div>

        {/* Score Card */}
        <div className="game-card mb-6 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
          <div className="text-6xl font-extrabold text-primary mb-2">
            {correctAnswers}/{totalQuestions}
          </div>
          <div className="text-lg text-muted-foreground mb-4">
            Accuracy: <span className="font-bold text-foreground">{percentage}%</span>
          </div>

          {/* Progress Ring Visual */}
          <div className="w-32 h-32 mx-auto mb-4 relative">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-foreground">{percentage}%</span>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="game-card mb-6" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
            📊 Performance
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-trap/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-trap">
                {trapCorrect}/{trapMessages.length}
              </div>
              <div className="text-sm text-muted-foreground">TRAP messages</div>
            </div>
            <div className="bg-trust/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-trust">
                {trustCorrect}/{trustMessages.length}
              </div>
              <div className="text-sm text-muted-foreground">TRUST messages</div>
            </div>
          </div>
        </div>

        {/* Achievement */}
        <div className="game-card mb-8 bg-primary/5 border-primary/20" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-center gap-3">
            <Award className={cn('w-8 h-8', achievement.color)} />
            <div>
              <div className="text-2xl">{achievement.emoji}</div>
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">{achievement.title}</div>
              <div className="text-xs text-muted-foreground">Achievement Unlocked</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {hasMistakes && (
            <Button
              onClick={onReviewMistakes}
              variant="outline"
              size="lg"
              className="w-full h-12 text-base font-semibold rounded-xl"
            >
              <Eye className="w-5 h-5 mr-2" />
              Review Mistakes
            </Button>
          )}

          <Button
            onClick={onPlayAgain}
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Trust or Trap',
                  text: `I scored ${correctAnswers}/${totalQuestions} (${percentage}%) on Trust or Trap! Can you beat me?`,
                });
              }
            }}
            variant="ghost"
            size="lg"
            className="w-full h-12 text-base font-medium text-muted-foreground hover:text-foreground"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Score
          </Button>
        </div>
      </div>
    </div>
  );
};
