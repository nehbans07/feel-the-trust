import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, ArrowLeft } from 'lucide-react';
import { GameMessage, EmotionType, VerdictType } from '@/data/gameMessages';
import { MessageCard } from './MessageCard';
import { EmotionSelector } from './EmotionSelector';
import { VerdictSelector } from './VerdictSelector';
import { ProgressBar } from './ProgressBar';

interface GameScreenProps {
  message: GameMessage;
  currentQuestion: number;
  totalQuestions: number;
  onSubmit: (emotions: EmotionType[], verdict: VerdictType) => void;
  onBack?: () => void;
  canGoBack?: boolean;
}

export const GameScreen = ({ 
  message, 
  currentQuestion, 
  totalQuestions, 
  onSubmit,
  onBack,
  canGoBack = false,
}: GameScreenProps) => {
  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>([]);
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictType | null>(null);

  const handleEmotionToggle = (emotion: EmotionType) => {
    setSelectedEmotions((prev) => {
      if (prev.includes(emotion)) {
        return prev.filter((e) => e !== emotion);
      }
      if (prev.length >= 2) {
        return [prev[1], emotion];
      }
      return [...prev, emotion];
    });
  };

  const handleVerdictSelect = (verdict: VerdictType) => {
    setSelectedVerdict(verdict);
  };

  const handleSubmit = () => {
    if (selectedEmotions.length > 0 && selectedVerdict) {
      onSubmit(selectedEmotions, selectedVerdict);
      setSelectedEmotions([]);
      setSelectedVerdict(null);
    }
  };

  const canSubmit = selectedEmotions.length > 0 && selectedVerdict !== null;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 animate-fade-scale">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Header with Back Button and Progress */}
        <div className="mb-4 md:mb-6">
          <div className="flex items-center gap-3 mb-3">
            {canGoBack && onBack && (
              <Button
                onClick={onBack}
                variant="ghost"
                size="sm"
                className="h-8 w-8 md:h-9 md:w-9 p-0 rounded-lg"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            )}
            <div className="flex-1">
              <ProgressBar current={currentQuestion} total={totalQuestions} />
            </div>
          </div>
        </div>

        {/* Message Card */}
        <div className="mb-3 md:mb-4">
          <MessageCard
            type={message.type}
            sender={message.sender}
            message={message.message}
          />
        </div>

        {/* Emotion Selector */}
        <div className="mb-3 md:mb-4">
          <EmotionSelector
            selectedEmotions={selectedEmotions}
            onToggle={handleEmotionToggle}
          />
        </div>

        {/* Verdict Selector */}
        <div className="mb-4 md:mb-6">
          <VerdictSelector
            selectedVerdict={selectedVerdict}
            onSelect={handleVerdictSelect}
          />
        </div>

        {/* Submit Button */}
        <div className="mt-auto">
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            size="lg"
            className="w-full h-12 md:h-14 text-base md:text-lg font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Submit Answer
          </Button>
          {!canSubmit && (
            <p className="text-center text-[10px] md:text-xs text-muted-foreground mt-2">
              Select at least one emotion and a verdict to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
