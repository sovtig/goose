export interface PluginOptions {
  // Add any plugin options here
}

export interface Extension {
  id: string;
  name: string;
  description: string;
  command?: string;
  is_builtin: boolean;
  link: string;
  githubStars: number;
}