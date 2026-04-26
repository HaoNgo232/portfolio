// Icon keys for feature icons (type-safe lookup)
export type IconKey =
  | "Deployment"
  | "Build"
  | "Scaffold"
  | "Cluster"
  | "LoadBalancer"
  | "Queue"
  | "FastLoad"
  | "Sync"
  | "SEO"
  | "VisualSearch"
  | "SemanticSearch"
  | "Personalized"
  | "ModuleGraph"
  | "RouteAnalyzer"
  | "ProviderRegistry"
  | "UniversalBridge"
  | "ContextSynapse"
  | "SmartRouting";

// Value Objects
export interface TechStack {
  name: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
}

export interface Feature {
  title: string;
  description: string;
  icon: IconKey;
}

export interface Screenshot {
  url: string;
  alt: string;
}

export interface Video {
  url: string;
  title: string;
  description?: string;
}

export interface EnvironmentMachine {
  name: string;
  ip: string;
  role: string;
}

// Entity
export interface Project {
  // Core fields
  slug: string;
  title: string;
  desc: string;
  image: string;
  github?: string | null;
  demo?: string | null;

  // Display fields (from PROJECT_DISPLAY_DATA)
  displayNumber: string;
  displaySubtitle: string;

  // Detail fields (from PROJECT_METADATA)
  subtitle: string;
  vision: string[];
  terminalLines: string[];

  // Optional detail fields
  features?: Feature[];
  techStack?: TechStack[];
  screenshots?: Screenshot[];
  videos?: Video[];
  environment?: EnvironmentMachine[];
}
