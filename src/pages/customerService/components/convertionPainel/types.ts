type MessageType = "sent" | "received" | "system" | "start" | "service" | "end";

export type Message = {
  id: number;
  type: MessageType;
  author?: string;
  text: string;
  time: string;
  date?: string;
};