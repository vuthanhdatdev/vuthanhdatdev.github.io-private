import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { WorkHistory } from '../data/portfolio.data'

export interface ExperienceComponentProps {
  data: WorkHistory[]
  sectionRef: RefObject<HTMLElement>
}

export const ExperienceRowComponent: FC<WorkHistory & { isLast: boolean }> = ({
  position,
  companyName,
  startFrom,
  endFrom,
  detail,
  techStack,
  isLast
}) => {
  const isCurrent = !endFrom

  return (
    <div className="experience-timeline-item">
      <div className="experience-timeline-marker">
        <div className="experience-timeline-dot" />
        {!isLast && <div className="experience-timeline-line" />}
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-5 experience-timeline-content">
        <div className="flex-grow-1">
          <h3 className="mb-0 text-primary">{position}</h3>
          <div className="subheading mb-2">{companyName}</div>
          <div className="education-meta mb-3">
            <span className="education-badge education-badge-major">
              <FontAwesomeIcon icon={faBuilding} className="me-1" />
              {companyName}
            </span>
            {isCurrent && (
              <span className="education-badge education-badge-current">
                <FontAwesomeIcon icon={faCircleCheck} className="me-1" />
                Current
              </span>
            )}
          </div>
          <p className="mb-2">{detail}</p>
          {techStack && techStack.length > 0 && (
            <div className="experience-tech-stack">
              {techStack.map((tech) => (
                <span key={tech} className="experience-tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex-shrink-0 mt-2 mt-md-0">
          <span className="text-primary">
            {startFrom} - {endFrom || 'Present'}
          </span>
        </div>
      </div>
    </div>
  )
}

export const ExperienceComponent: FC<ExperienceComponentProps> = ({ data, sectionRef }) => {
  return (
    <section ref={sectionRef} className="resume-section" id="experience">
      <div className="resume-section-content">
        <h2 className="mb-5">Experience</h2>
        <div className="experience-timeline">
          {data?.map((value, index) => (
            <ExperienceRowComponent
              key={`${value.companyName}-${value.startFrom}`}
              {...value}
              isLast={index === data.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
