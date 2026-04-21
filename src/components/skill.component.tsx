import { FC, RefObject } from 'react'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import {
  faJava,
  faLinux,
  faHtml5,
  faCss3Alt,
  faNodeJs,
  faReact,
  faAngular,
  faAmazon
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Skill } from '../data/portfolio.data'

const DEFAULT_ICONS = [faJava, faNodeJs, faHtml5, faCss3Alt, faReact, faAngular, faLinux, faAmazon]

const WORKFLOWS = [
  'Database Design',
  'Software Architecture Design',
  'Cross Functional Teams',
  'Agile Development & Scrum'
]

export interface SkillComponentProps {
  skills?: Skill[]
  workFlows?: string[]
  sectionRef: RefObject<HTMLElement>
}

export const SkillComponent: FC<SkillComponentProps> = ({ sectionRef, workFlows }) => {
  const displayWorkflows = workFlows && workFlows.length > 0 ? workFlows : WORKFLOWS

  return (
    <section ref={sectionRef} className="resume-section" id="skills">
      <div className="resume-section-content">
        <h2 className="mb-5">Skills</h2>
        <div className="subheading mb-3">Programming Languages & Tools</div>
        <ul className="list-inline dev-icons">
          {DEFAULT_ICONS.map((icon, index) => (
            <li key={index} className="list-inline-item">
              <FontAwesomeIcon icon={icon} />
            </li>
          ))}
        </ul>
        <div className="subheading mb-3">Workflow</div>
        <ul className="fa-ul mb-0">
          {displayWorkflows.map((item, index) => (
            <li key={index}>
              <span className="fa-li">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
