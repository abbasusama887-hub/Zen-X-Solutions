export type ServiceCategory = 'all' | 'engineering' | 'design' | 'marketing' | 'operations';

export interface ServiceItem {
  id: number;
  number: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  technologies: string[];
  iconName: string;
  impactMetric: string;
  videoUrl?: string;
  videoTitle?: string;
  videoBadge?: string;
  videoDuration?: string;
  videoKey?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  summary: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  techStack: string[];
  liveUrl?: string;
}

export interface ProcessStepItem {
  step: number;
  number: string;
  title: string;
  tagline: string;
  description: string;
  duration: string;
  deliverables: string[];
  iconName: string;
}

export interface WhyChooseUsItem {
  id: string;
  number: string;
  title: string;
  highlight: string;
  description: string;
  metric: string;
  metricLabel: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  impactMetric: string;
  impactLabel: string;
  rating: number;
}

export interface TechItem {
  name: string;
  category: string;
  proficiency: number;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  selectedServices: string[];
  timeline: string;
  budgetRange: string;
}
