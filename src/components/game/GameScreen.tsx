import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
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
}

export const GameScreen = ({ message, currentQuestion, totalQuestions, onSubmit }: GameScreenProps) => {
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
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col">
        {/* Progress */}
        <div className="mb-6">
          <ProgressBar current={currentQuestion} total={totalQuestions} />
        </div>

        {/* Message Card */}
        <div className="mb-4">
          <MessageCard
            type={message.type}
            sender={message.sender}
            message={message.message}
          />
        </div>

        {/* Emotion Selector */}
        <div className="mb-4">
          <EmotionSelector
            selectedEmotions={selectedEmotions}
            onToggle={handleEmotionToggle}
          />
        </div>

        {/* Verdict Selector */}
        <div className="mb-6">
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
            className="w-full h-14 text-lg font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5 mr-2" />
            Submit Answer
          </Button>
          {!canSubmit && (
            <p className="text-center text-xs text-muted-foreground mt-2">
              Select at least one emotion and a verdict to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
