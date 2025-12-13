import { Lightbulb, MessageSquare, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InstructionsScreenProps {
  onStart: () => void;
}

export const InstructionsScreen = ({ onStart }: InstructionsScreenProps) => {
  const steps = [
    {
      icon: MessageSquare,
      title: 'Read the Message',
      description: 'You\'ll see a real-world message (SMS/Email/WhatsApp)',
    },
    {
      icon: Heart,
      title: 'Identify Emotions',
      description: 'Select 1-2 emotions the message is triggering',
    },
    {
      icon: CheckCircle,
      title: 'Make Your Verdict',
      description: 'Decide: Is it TRUST ✅ or TRAP 🚫?',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 animate-slide-up">
      <div className="max-w-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-3 md:mb-4">
            <span className="text-2xl md:text-3xl">📱</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
            How to Play
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="game-card p-3 md:p-4 flex items-start gap-3 md:gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5 md:mb-1">
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary text-primary-foreground text-xs md:text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-sm md:text-base text-foreground">{step.title}</h3>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rule */}
        <div
          className="game-card p-4 md:p-5 bg-warning/10 border-warning/30 mb-6 md:mb-8 animate-slide-up"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-sm md:text-base text-foreground mb-2">💡 The Golden Rule</h3>
              <div className="space-y-2 text-xs md:text-sm text-muted-foreground leading-relaxed">
                <p>
                  Scammers target your <span className="font-semibold text-trap">EMOTIONS</span> first.
                </p>
                <p>
                  Legitimate messages share <span className="font-semibold text-trust">FACTS</span> first.
                </p>
                <p className="pt-1 text-foreground/80 italic">
                  If you feel fear, urgency, or greed before you understand what's happening — it's likely a trap.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-12 md:h-14 text-base md:text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Let's Play!
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
