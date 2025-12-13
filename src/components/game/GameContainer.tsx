import { useState, useMemo } from 'react';
import { gameMessages, EmotionType, VerdictType, GameMessage } from '@/data/gameMessages';
import { WelcomeScreen } from './WelcomeScreen';
import { TutorialScreen } from './TutorialScreen';
import { InstructionsScreen } from './InstructionsScreen';
import { GameScreen } from './GameScreen';
import { FeedbackScreen } from './FeedbackScreen';
import { ResultsScreen } from './ResultsScreen';

type GamePhase = 'welcome' | 'tutorial' | 'instructions' | 'playing' | 'feedback' | 'results' | 'review';

interface Answer {
  messageId: number;
  userEmotions: EmotionType[];
  userVerdict: VerdictType;
  correct: boolean;
  correctVerdict: VerdictType;
}

export const GameContainer = () => {
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<{
    emotions: EmotionType[];
    verdict: VerdictType;
  } | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);

  // Shuffle messages on game start
  const shuffledMessages = useMemo(() => {
    return [...gameMessages].sort(() => Math.random() - 0.5);
  }, [phase === 'welcome' ? Date.now() : 0]);

  const currentMessage = shuffledMessages[currentQuestionIndex];
  const totalQuestions = shuffledMessages.length;

  const mistakes = useMemo(() => {
    return answers.filter((a) => !a.correct);
  }, [answers]);

  const handleStart = () => {
    setPhase('tutorial');
  };

  const handleHowToPlay = () => {
    setPhase('tutorial');
  };

  const handleTutorialContinue = () => {
    setPhase('instructions');
  };

  const handleInstructionsStart = () => {
    setPhase('playing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleSubmitAnswer = (emotions: EmotionType[], verdict: VerdictType) => {
    const isCorrect = verdict === currentMessage.correctVerdict;
    
    setCurrentAnswer({ emotions, verdict });
    setAnswers((prev) => [
      ...prev,
      {
        messageId: currentMessage.id,
        userEmotions: emotions,
        userVerdict: verdict,
        correct: isCorrect,
        correctVerdict: currentMessage.correctVerdict,
      },
    ]);
    setPhase('feedback');
  };

  const handleNextMessage = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer(null);
      setPhase('playing');
    } else {
      setPhase('results');
    }
  };

  const handlePlayAgain = () => {
    setPhase('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer(null);
  };

  const handleReviewMistakes = () => {
    if (mistakes.length > 0) {
      setReviewIndex(0);
      setPhase('review');
    }
  };

  const handleNextReview = () => {
    if (reviewIndex < mistakes.length - 1) {
      setReviewIndex((prev) => prev + 1);
    } else {
      setPhase('results');
    }
  };

  // Get the message for review
  const getReviewMessage = (): GameMessage | undefined => {
    if (mistakes.length === 0) return undefined;
    const mistake = mistakes[reviewIndex];
    return gameMessages.find((m) => m.id === mistake.messageId);
  };

  return (
    <div className="min-h-screen bg-background">
      {phase === 'welcome' && (
        <WelcomeScreen onStart={handleStart} onHowToPlay={handleHowToPlay} />
      )}

      {phase === 'tutorial' && (
        <TutorialScreen onContinue={handleTutorialContinue} />
      )}

      {phase === 'instructions' && (
        <InstructionsScreen onStart={handleInstructionsStart} />
      )}

      {phase === 'playing' && currentMessage && (
        <GameScreen
          message={currentMessage}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitAnswer}
        />
      )}

      {phase === 'feedback' && currentMessage && currentAnswer && (
        <FeedbackScreen
          message={currentMessage}
          userEmotions={currentAnswer.emotions}
          userVerdict={currentAnswer.verdict}
          onNext={handleNextMessage}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
        />
      )}

      {phase === 'results' && (
        <ResultsScreen
          answers={answers}
          totalQuestions={totalQuestions}
          onPlayAgain={handlePlayAgain}
          onReviewMistakes={handleReviewMistakes}
        />
      )}

      {phase === 'review' && (
        <>
          {(() => {
            const reviewMessage = getReviewMessage();
            const mistake = mistakes[reviewIndex];
            if (!reviewMessage || !mistake) return null;
            
            return (
              <div className="min-h-screen bg-background">
                <div className="p-4 bg-muted text-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Reviewing mistake {reviewIndex + 1} of {mistakes.length}
                  </span>
                </div>
                <FeedbackScreen
                  message={reviewMessage}
                  userEmotions={mistake.userEmotions}
                  userVerdict={mistake.userVerdict}
                  onNext={handleNextReview}
                  isLastQuestion={reviewIndex === mistakes.length - 1}
                />
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
};
