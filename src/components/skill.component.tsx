import { FC, RefObject } from 'react'
import {
  faDatabase,
  faPencilRuler,
  faPeopleGroup,
  faRotate
} from '@fortawesome/free-solid-svg-icons'
import {
  faJava,
  faLinux,
  faHtml5,
  faCss3Alt,
  faNodeJs,
  faReact,
  faAngular,
  faAmazon,
  faPython
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Skill, Workflow } from '../data/portfolio.data'

type ProficiencyLevel = 'Expert' | 'Proficient' | 'Familiar'

const PROFICIENCY_CONFIG: Record<ProficiencyLevel, { color: string; width: string }> = {
  Expert: { color: '#bd5d38', width: '90%' },
  Proficient: { color: '#e07b50', width: '70%' },
  Familiar: { color: '#dee2e6', width: '45%' }
}

const SKILL_ICON_MAP: Record<string, IconDefinition> = {
  Java: faJava,
  'Node.js': faNodeJs,
  React: faReact,
  Angular: faAngular,
  HTML5: faHtml5,
  CSS3: faCss3Alt,
  AWS: faAmazon,
  Linux: faLinux,
  Python: faPython
}

const WORKFLOW_ICON_MAP: Record<string, IconDefinition> = {
  'Database Design': faDatabase,
  'Software Architecture': faPencilRuler,
  'Cross Functional Teams': faPeopleGroup,
  'Agile Development & Scrum': faRotate
}

const DEFAULT_SKILLS: Skill[] = [
  { name: 'Java', level: 'Expert' },
  { name: 'Node.js', level: 'Expert' },
  { name: 'React', level: 'Expert' },
  { name: 'Angular', level: 'Proficient' },
  { name: 'HTML5', level: 'Expert' },
  { name: 'CSS3', level: 'Proficient' },
  { name: 'AWS', level: 'Proficient' },
  { name: 'Linux', level: 'Familiar' }
]

const DEFAULT_WORKFLOWS: Workflow[] = [
  { label: 'Database Design', description: 'Schema design, normalization, query optimization' },
  {
    label: 'Software Architecture',
    description: 'Microservices, event-driven, layered architecture'
  },
  {
    label: 'Cross Functional Teams',
    description: 'Collaboration across design, product & engineering'
  },
  {
    label: 'Agile Development & Scrum',
    description: 'Sprint planning, retrospectives, daily standups'
  }
]

export interface SkillComponentProps {
  skills?: Skill[] | undefined
  workflows?: Workflow[] | undefined
  sectionRef: RefObject<HTMLElement>
}

export const SkillComponent: FC<SkillComponentProps> = ({ sectionRef, skills, workflows }) => {
  const displaySkills = skills && skills.length > 0 ? skills : DEFAULT_SKILLS
  const displayWorkflows = workflows && workflows.length > 0 ? workflows : DEFAULT_WORKFLOWS

  return (
    <section ref={sectionRef} className="resume-section" id="skills">
      <div className="resume-section-content">
        <h2 className="mb-5">Skills</h2>

        <div className="subheading mb-3">Programming Languages & Tools</div>
        <div className="skill-icons-grid mb-5">
          {displaySkills.map(({ name, level }) => {
            const { color, width } = PROFICIENCY_CONFIG[level]
            const icon = SKILL_ICON_MAP[name]
            if (!icon) return null
            return (
              <div key={name} className="skill-icon-item">
                <FontAwesomeIcon icon={icon} className="skill-icon-fa" />
                <span className="skill-icon-label">{name}</span>
                <div className="skill-level-bar-track">
                  <div className="skill-level-bar-fill" style={{ width, backgroundColor: color }} />
                </div>
                <span className="skill-level-text" style={{ color }}>
                  {level}
                </span>
              </div>
            )
          })}
        </div>

        <div className="subheading mb-3">Workflow</div>
        <ul className="skill-workflow-list mb-0">
          {displayWorkflows.map(({ label, description }) => {
            const icon = WORKFLOW_ICON_MAP[label] ?? faDatabase
            return (
              <li key={label} className="skill-workflow-item">
                <div className="skill-workflow-icon">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div>
                  <div className="skill-workflow-label">{label}</div>
                  <div className="skill-workflow-desc">{description}</div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
