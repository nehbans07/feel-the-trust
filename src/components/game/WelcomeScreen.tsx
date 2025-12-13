import { Shield, Play, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
  onHowToPlay: () => void;
}

export const WelcomeScreen = ({ onStart, onHowToPlay }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-scale">
      <div className="text-center max-w-md mx-auto">
        {/* Logo/Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse-glow">
            <Shield className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-trap rounded-full flex items-center justify-center text-trap-foreground text-sm font-bold animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            🚫
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-trust rounded-full flex items-center justify-center text-trust-foreground text-sm font-bold animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            ✅
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight">
          Trust or Trap
        </h1>
        <p className="text-lg text-primary font-semibold mb-4">
          Emotion Detector
        </p>

        {/* Tagline */}
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Learn to spot scams by recognizing emotional tricks in messages
        </p>

        {/* Buttons */}
        <div className="space-y-4">
          <Button
            onClick={onStart}
            size="lg"
            className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Game
          </Button>

          <Button
            onClick={onHowToPlay}
            variant="ghost"
            size="lg"
            className="w-full h-12 text-base font-medium text-muted-foreground hover:text-foreground"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            How to Play
          </Button>
        </div>

        {/* Footer note */}
        <p className="mt-10 text-xs text-muted-foreground/60">
          No login required • 15 messages • ~10 minutes
        </p>
      </div>
    </div>
  );
};
