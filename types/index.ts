import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Enums
export enum Type {
  PROFESSIONAL = "PROFESSIONAL",
  CASUAL = "CASUAL",
}

export enum ProjectStatus {
  PLANNED = "PLANNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  ARCHIVED = "ARCHIVED",
}

export enum SkillCategory {
  TECHNOLOGY = "TECHNOLOGY",
  SOFT_SKILLS = "SOFT_SKILLS",
  OTHERS = "OTHERS",
}

export enum ProficiencyLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
  EXPERT = "EXPERT",
  MASTER = "MASTER",
}

export enum InterestType {
  BOOK = "BOOK",
  MUSIC = "MUSIC",
  HOBBY = "HOBBY",
  SPORT = "SPORT",
  GAMES = "GAMES",
  TECHNOLOGY = "TECHNOLOGY",
  LEARNING = "LEARNING",
  OTHER = "OTHER",
  PROFESSIONAL = "PROFESSIONAL",
}

export enum InterestStatus {
  CURRENT = "CURRENT",
  COMPLETED = "COMPLETED",
  PLANNED = "PLANNED",
  ONGOING = "ONGOING",
}

// Common properties for all models
interface BaseModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Main models
export interface Admin extends BaseModel {
  email: string;
  password: string;
}

export interface Bio extends BaseModel {
  name: string;
  title: string;
  bio: string;
  avatar?: string | null;
  location?: string | null;
  birthday?: Date | null;
  profile?: Profile;
}

export interface Contact extends BaseModel {
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  resumeUrl?: string | null;
  profile?: Profile;
}

export interface Socials extends BaseModel {
  github?: string | null;
  linkedin?: string | null;
  website?: string | null;
  discord?: string | null;
  telegram?: string | null;
  profile?: Profile;
}

export interface Profile extends BaseModel {
  type: Type;
  bio?: Bio | null;
  bioId?: string | null;
  contact?: Contact | null;
  contactId?: string | null;
  socials?: Socials | null;
  socialsId?: string | null;
}

export interface Post extends BaseModel {
  title: string;
  slug: string;
  type: Type;
  thumbnail?: string | null;
  content: string;
  published: boolean;
  tags: string[];
}

export interface ProjectLinks extends BaseModel {
  githubUrl?: string | null;
  liveUrl?: string | null;
  project?: Project;
}

export interface DateRange extends BaseModel {
  startDate: Date;
  endDate?: Date | null;
  current: boolean;
  project?: Project;
  experience?: Experience;
}

export interface Project extends BaseModel {
  title: string;
  description: string;
  image?: string | null;
  links?: ProjectLinks | null;
  linksId?: string | null;
  technologies: string[];
  projectType: Type;
  featured: boolean;
  status: ProjectStatus;
  dates?: DateRange | null;
  datesId?: string | null;
}

export interface Sender extends BaseModel {
  name: string;
  email?: string | null;
  message?: Message;
}

export interface Message extends BaseModel {
  sender?: Sender | null;
  senderId?: string | null;
  subject: string;
  isCasual: boolean;
  content: string;
  read: boolean;
  featured: boolean;
}

export interface Experience extends BaseModel {
  company: string;
  position: string;
  location?: string | null;
  dates?: DateRange | null;
  datesId?: string | null;
  description: string;
  portfolio?: Portfolio | null;
  portfolioId?: string | null;
}

export interface Interest extends BaseModel {
  type: InterestType;
  title: string;
  description: string;
  status: InterestStatus;
  link?: string | null;
  portfolio?: Portfolio | null;
  portfolioId?: string | null;
}

export interface Certification extends BaseModel {
  name: string;
  issuer: string;
  issueDate?: Date | null;
  expiryDate?: Date | null;
  credentialUrl?: string | null;
  description?: string | null;
  featured: boolean;
  portfolio?: Portfolio | null;
  portfolioId?: string | null;
  skills: Skill[];
}

export interface Skill extends BaseModel {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  portfolio?: Portfolio | null;
  portfolioId?: string | null;
  certification?: Certification | null;
  certificationId?: string | null;
}

export interface Portfolio extends BaseModel {
  type: Type;
  skills: Skill[];
  certifications: Certification[];
  interests: Interest[];
  experiences: Experience[];
}

// Form input types for creating/updating records
export interface ProfileFormInput {
  type: Type;
}

export interface BioFormInput {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  location?: string;
  birthday?: Date;
}

export interface ContactFormInput {
  email: string;
  phoneNumber?: string;
  address?: string;
  resumeUrl?: string;
}

export interface SocialsFormInput {
  github?: string;
  linkedin?: string;
  website?: string;
  discord?: string;
  telegram?: string;
}

export interface PostFormInput {
  title: string;
  slug: string;
  type: Type;
  thumbnail?: string;
  content: string;
  published: boolean;
  tags: string[];
}

export interface ProjectFormInput {
  title: string;
  description: string;
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  technologies: string[];
  projectType: Type;
  featured: boolean;
  status: ProjectStatus;
  startDate?: Date;
  endDate?: Date;
  current: boolean;
}

export interface MessageFormInput {
  name: string;
  email?: string;
  subject: string;
  content: string;
}

export interface SkillFormInput {
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
}

export interface CertificationFormInput {
  name: string;
  issuer: string;
  issueDate?: Date;
  expiryDate?: Date;
  credentialUrl?: string;
  description?: string;
  featured: boolean;
}

export interface ExperienceFormInput {
  company: string;
  position: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description: string;
}

export interface InterestFormInput {
  type: InterestType;
  title: string;
  description: string;
  status: InterestStatus;
  link?: string;
}
