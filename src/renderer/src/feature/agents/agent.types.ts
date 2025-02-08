export interface AgentConfiguration {
  name: string;
  description: string;
  systemMessage: string;
}

export interface AgentDeployment {
  discord: {
    botToken: string;
  };
}
