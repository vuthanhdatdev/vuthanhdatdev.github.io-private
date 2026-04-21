export interface Education {
  startFrom: string
  endFrom: string
  school: string
  gpa: string
  degreeType: string
  major: string
}

export interface WorkHistory {
  companyName: string
  detail: string
  startFrom: string
  endFrom: string
  position: string
  techStack?: string[]
}

export interface Certification {
  name: string
  startFrom?: string
  endFrom?: string
  score?: string
  providedBy: string
}

export interface Skill {
  name: string
  level: 'Expert' | 'Proficient' | 'Familiar'
}

export interface Interest {
  icon: string
  label: string
  description: string
}

export interface Workflow {
  label: string
  description: string
}

export interface PortfolioInformation {
  firstName: string
  lastName: string
  profileImageUrl?: string | undefined
  indicator: string
  country: string
  city: string
  phoneNumber: string
  email: string
  pdfUrl: string
  githubUrl: string
  shortIntroduction: string
  linkedInUrl: string
  twitterUrl: string
  facebookUrl: string
  shortBriefLife?: string[]
}

export interface PortfolioData {
  information: PortfolioInformation
  educations: Education[]
  workHistories: WorkHistory[]
  certifications: Certification[]
  skills?: Skill[]
  interests?: Interest[]
  workflows?: Workflow[]
}
