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
    <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-slide-up">
      <div className="max-w-md mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
            <span className="text-3xl">📱</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How to Play
          </h2>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="game-card p-4 flex items-start gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <step.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rule */}
        <div
          className="game-card p-5 bg-warning/10 border-warning/30 mb-8 animate-slide-up"
          style={{ animationDelay: '0.45s' }}
        >
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-foreground mb-1">Golden Rule</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Messages that push <span className="font-semibold text-warning">emotions before facts</span> are usually traps.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={onStart}
          size="lg"
          className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Let's Play!
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
};
