
export interface TechItem {
  name: string;
  category: 'Web' | 'Backend' | 'Desktop' | 'Bots' | 'DevOps';
  description: string;
}

export interface ProcessNode {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
}

export interface Project {
  id: string;
  title: string;
  category: Record<string, string>;
  year: string;
  description: Record<string, string>;
  detailedDescription: Record<string, string>;
  stack: string[];
  link?: string;
}
