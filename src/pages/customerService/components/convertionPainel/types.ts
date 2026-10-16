type MessageType = "sent" | "received" | "system" | "start" | "service" | "end";

export type Message = {
  id: number;
  type: MessageType;
  author?: string;
  text: string;
  time: string;
  date?: string;
};

export interface TreatmentList {
  id: number
  mensagens: Message[]
}

export type CallSelected = {
  id: number;
  name: string;
  user: string;
  fone: string;
} | null

export interface ConversationPanelProps {
  callSelected: CallSelected;
  onToggleContact: () => void;
  onBack?: () => void;
}