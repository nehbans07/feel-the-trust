import { MessageSquare, Mail, MessageCircle } from 'lucide-react';
import { MessageType } from '@/data/gameMessages';

interface MessageCardProps {
  type: MessageType;
  sender: string;
  message: string;
}

const typeConfig: Record<MessageType, { icon: typeof MessageSquare; label: string; bubbleClass: string; iconBg: string }> = {
  SMS: {
    icon: MessageSquare,
    label: 'SMS',
    bubbleClass: 'message-bubble-sms',
    iconBg: 'bg-blue-500',
  },
  Email: {
    icon: Mail,
    label: 'Email',
    bubbleClass: 'message-bubble-email',
    iconBg: 'bg-red-500',
  },
  WhatsApp: {
    icon: MessageCircle,
    label: 'WhatsApp',
    bubbleClass: 'message-bubble-whatsapp',
    iconBg: 'bg-emerald-500',
  },
};

export const MessageCard = ({ type, sender, message }: MessageCardProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="game-card animate-fade-scale">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
        <div className={`w-10 h-10 rounded-full ${config.iconBg} flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="font-bold text-foreground">{sender}</div>
          <div className="text-xs text-muted-foreground">{config.label}</div>
        </div>
        <span className="text-xs text-muted-foreground/60">Just now</span>
      </div>

      {/* Message Bubble */}
      <div className={`${config.bubbleClass} p-4`}>
        <p className="text-sm md:text-base text-foreground leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
};
