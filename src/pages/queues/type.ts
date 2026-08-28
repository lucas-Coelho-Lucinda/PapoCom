export type Queue = {
  id: number;
  name: string;
  waiting: number;
  agents: number;
  status: "active" | "paused";
};