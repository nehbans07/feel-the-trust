import { Shield, Play, AlertTriangle, Home, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 animate-fade-scale">
      <div className="text-center max-w-lg mx-auto">
        {/* Logo/Icon */}
        <div className="relative mb-6 md:mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-primary/10 rounded-3xl flex items-center justify-center animate-pulse-glow">
            <Shield className="w-10 h-10 md:w-12 md:h-12 text-primary" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-trap rounded-full flex items-center justify-center text-trap-foreground text-sm font-bold animate-bounce-in" style={{ animationDelay: '0.3s' }}>
            🚫
          </div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-trust rounded-full flex items-center justify-center text-trust-foreground text-sm font-bold animate-bounce-in" style={{ animationDelay: '0.5s' }}>
            ✅
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-3 leading-tight">
          Trust or Trap
        </h1>
        <p className="text-base md:text-lg text-primary font-semibold mb-6 md:mb-8">
          Emotion Detector
        </p>

        {/* Scam Statistics Card */}
        <div className="game-card p-4 md:p-6 mb-6 md:mb-8 bg-trap/5 border-trap/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-trap" />
            <span className="text-xl md:text-2xl font-bold text-trap">₹2,000 Crores</span>
          </div>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            Lost to scams last year. That's enough to buy:
          </p>
          
          <div className="grid grid-cols-1 gap-2 md:gap-3 text-left mb-4">
            <div className="flex items-center gap-2 md:gap-3 bg-background/50 rounded-lg p-2 md:p-3">
              <Home className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm text-foreground">🏠 <strong>4 lakh</strong> homes for families</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-background/50 rounded-lg p-2 md:p-3">
              <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm text-foreground">🎓 Free education for <strong>20 lakh</strong> students</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 bg-background/50 rounded-lg p-2 md:p-3">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="text-xs md:text-sm text-foreground">🚑 <strong>2,000</strong> fully-equipped hospitals</span>
            </div>
          </div>

          <div className="border-t border-trap/20 pt-3 md:pt-4">
            <p className="text-xs md:text-sm text-foreground font-medium mb-1">
              <span className="text-trap font-bold">The trick?</span> Scammers play with your emotions.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground">
              Learn to recognize their tactics in just 15 minutes.
            </p>
          </div>
          
          <p className="text-xs text-trap/80 font-semibold mt-3 md:mt-4 italic">
            All stolen. One message at a time.
          </p>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-12 md:h-14 text-base md:text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Game
        </Button>

        {/* Footer note */}
        <p className="mt-6 md:mt-10 text-xs text-muted-foreground/60">
          No login required • 14 messages • ~10 minutes
        </p>
      </div>
    </div>
  );
};
