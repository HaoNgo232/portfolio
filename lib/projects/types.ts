// Value Objects
export interface TechStack {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'other';
}

export interface Feature {
  title: string;
  description: string;
}

export interface Screenshot {
  url: string;
  alt: string;
  caption?: string;
}

export interface Video {
  url: string;
  title: string;
  description?: string;
}

export interface Environment {
  frontend?: string;
  backend?: string;
  database?: string;
}

// Entity
export interface Project {
  // Core fields (dùng cho cả list và detail)
  slug: string;              // unique identifier
  title: string;
  desc: string;              // short description cho card
  image: string;             // thumbnail
  tags: string[];
  github?: string | null;
  demo?: string | null;

  // Detail-only fields (optional, chỉ dùng ở detail page)
  longDescription?: string;
  features?: Feature[];
  techStack?: TechStack[];
  screenshots?: Screenshot[];
  videos?: Video[];
  environment?: Environment;
}
