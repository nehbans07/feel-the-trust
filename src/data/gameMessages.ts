export type EmotionType = 'Fear' | 'Urgency' | 'Greed' | 'Authority' | 'Manipulation' | 'Safe';
export type VerdictType = 'TRUST' | 'TRAP';
export type MessageType = 'SMS' | 'Email' | 'WhatsApp';

export interface GameMessage {
  id: number;
  type: MessageType;
  sender: string;
  message: string;
  correctEmotions: EmotionType[];
  correctVerdict: VerdictType;
  explanation: string;
  advice: string;
}

export const emotions: { type: EmotionType; emoji: string; description: string; examples: string[] }[] = [
  {
    type: 'Fear',
    emoji: '😰',
    description: 'Makes you worry about loss, punishment, or danger',
    examples: ['Blocked account', 'Arrest', 'Penalty', 'Hacked'],
  },
  {
    type: 'Urgency',
    emoji: '⏰',
    description: 'Pushes you to act quickly without thinking',
    examples: ['Now', 'Today only', 'Last chance', '10 minutes left'],
  },
  {
    type: 'Greed',
    emoji: '💰',
    description: 'Promises money, rewards, or benefits',
    examples: ['Cashback', 'Prize', 'Free money', 'High returns'],
  },
  {
    type: 'Authority',
    emoji: '🏛️',
    description: 'Uses names of banks, government, or companies',
    examples: ['PNB', 'RBI', 'Police', 'Amazon', 'HR'],
  },
  {
    type: 'Manipulation',
    emoji: '🎭',
    description: 'Pretends to care, flatter, or build emotional connection',
    examples: ['Valued customer', 'Helping you', 'Brother', 'Friend'],
  },
  {
    type: 'Safe',
    emoji: '✅',
    description: 'Informational messages with no pressure or forced action',
    examples: ['No links', 'No urgency', 'Just info', 'Verify yourself'],
  },
];

export const gameMessages: GameMessage[] = [
  {
    id: 1,
    type: 'SMS',
    sender: 'PNB',
    message: 'PNB Alert: Suspicious activity detected on your account. For your safety, access may be restricted. Check details: https://pnb-secure-login[.]info',
    correctEmotions: ['Fear', 'Authority'],
    correctVerdict: 'TRAP',
    explanation: 'Real banks never send login links via SMS. Fear + authority is used to push you to click before thinking.',
    advice: 'Never click links in banking SMS. Call your bank\'s official number or visit the branch.',
  },
  {
    id: 2,
    type: 'SMS',
    sender: 'Amazon',
    message: 'Dear valued customer, we tried to process your refund, but need confirmation. Please verify to avoid cancellation.',
    correctEmotions: ['Manipulation', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Manipulation ("valued customer") + urgency is used. Amazon never asks for verification via SMS.',
    advice: 'Always log in to the official app or call customer care to confirm.',
  },
  {
    id: 3,
    type: 'Email',
    sender: 'Income Tax Dept',
    message: 'Subject: Compliance Required. Failure to respond may result in account restrictions. Click to submit details.',
    correctEmotions: ['Fear', 'Authority'],
    correctVerdict: 'TRAP',
    explanation: 'Government departments do not threaten consequences or collect data via email links.',
    advice: 'Visit official government websites directly by typing the URL yourself.',
  },
  {
    id: 4,
    type: 'SMS',
    sender: 'Airtel',
    message: 'Your SIM will be deactivated due to KYC failure. Verify today to avoid service disruption. Click the link below to verify - https://airtel-customarecare.com/',
    correctEmotions: ['Fear', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Fear and urgency are used. Telecom companies do not deactivate SIMs via SMS links.',
    advice: 'Visit official stores or call customer care on the number printed on your bill.',
  },
  {
    id: 5,
    type: 'WhatsApp',
    sender: 'Unknown (+91 98XXX)',
    message: 'Hey, I\'m stuck in a meeting and urgently need ₹8,000. Will return tonight. Please help. - Ankit',
    correctEmotions: ['Manipulation', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Trust + urgency impersonation scam. Emotional pressure is used to bypass verification.',
    advice: 'Always call the person on their verified number and ask personal questions only you both would know.',
  },
  {
    id: 6,
    type: 'Email',
    sender: 'Google',
    message: 'Security notice: We detected a sign-in from a new device. If this wasn\'t you, you can ignore this message or visit your account.',
    correctEmotions: ['Safe'],
    correctVerdict: 'TRUST',
    explanation: 'No link pressure, no urgency, asks you to go to the official account yourself.',
    advice: 'This is how legitimate security alerts work - informational only.',
  },
  {
    id: 7,
    type: 'SMS',
    sender: 'BlueDart',
    message: 'Delivery attempt failed due to an address issue. Update details to reschedule.',
    correctEmotions: ['Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Looks routine, but delivery companies ask you to check their official app or tracking ID—not click random links.',
    advice: 'Open the delivery company\'s official app and check your tracking number there.',
  },
  {
    id: 8,
    type: 'WhatsApp',
    sender: 'Investment Group',
    message: 'Only today! Double your money with our verified investment plan. Limited slots available!',
    correctEmotions: ['Greed', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Guaranteed returns and deadlines are classic signs of financial scams.',
    advice: 'Real investments carry risk and are never "guaranteed" or time-limited offers.',
  },
  {
    id: 9,
    type: 'SMS',
    sender: 'PNB',
    message: 'PNB Alert: We will never ask for your OTP, PIN, or passwords. For any queries, please visit your nearest branch.',
    correctEmotions: ['Safe'],
    correctVerdict: 'TRUST',
    explanation: 'No action demanded, no link, clear safety reminder.',
    advice: 'This is how banks educate customers - through awareness messages.',
  },
  {
    id: 10,
    type: 'SMS',
    sender: 'IRCTC',
    message: 'IRCTC Update: System maintenance scheduled tonight from 12:00 AM to 2:00 AM. Booking services may be unavailable during this time.',
    correctEmotions: ['Safe'],
    correctVerdict: 'TRUST',
    explanation: 'Informational only, no action required.',
    advice: 'Legitimate service updates are informational and don\'t demand immediate action.',
  },
  {
    id: 11,
    type: 'WhatsApp',
    sender: 'Crypto Traders',
    message: 'Only today: double your money with our verified plan. Limited investors only. Act now!',
    correctEmotions: ['Greed', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Guaranteed returns + urgency is a classic financial scam. No real investment works this way.',
    advice: 'Block and report such messages. Real investments are never sold like limited-time offers.',
  },
  {
    id: 12,
    type: 'Email',
    sender: 'LinkedIn Recruiter',
    message: 'Your profile impressed our client. Share your documents like Aadhar, PAN card to proceed quickly.',
    correctEmotions: ['Manipulation', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Pressure to act quickly + document sharing without a formal process is unsafe.',
    advice: 'Legitimate recruiters use official company emails and formal interview processes.',
  },
  {
    id: 13,
    type: 'Email',
    sender: 'LinkedIn',
    message: 'You have 3 new profile views this week. Log in to LinkedIn to see who viewed your profile.',
    correctEmotions: ['Safe'],
    correctVerdict: 'TRUST',
    explanation: 'No external links demanding action, informational nudge only.',
    advice: 'This is how legitimate services notify you - they direct you to log in yourself.',
  },
  {
    id: 14,
    type: 'SMS',
    sender: 'Electricity Board',
    message: 'Final notice: Electricity will be disconnected today due to unpaid bill. Pay immediately to avoid disconnection.',
    correctEmotions: ['Fear', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Essential services are used to create fear. Always check bills only via official apps or physical bills.',
    advice: 'Check your official electricity board app or visit the office. They send physical notices first.',
  },
  {
    id: 15,
    type: 'Email',
    sender: 'HR Department',
    message: 'Congratulations! You\'ve been selected for a work-from-home position. Pay ₹5,000 registration fee to start immediately.',
    correctEmotions: ['Greed', 'Urgency'],
    correctVerdict: 'TRAP',
    explanation: 'Real jobs never ask for money upfront. This combines fake opportunity with immediate payment demand.',
    advice: 'Legitimate employers never charge fees. Report and block immediately.',
  },
];
