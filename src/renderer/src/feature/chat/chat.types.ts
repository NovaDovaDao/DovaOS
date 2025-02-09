export interface Message {
  content: string;
  timestamp: number;
  role: "user" | "agent" | "system";
}
