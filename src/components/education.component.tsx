import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faMedal } from '@fortawesome/free-solid-svg-icons'
import { Education } from '../data/portfolio.data'

export interface EducationComponentProps {
  educations: Education[]
  sectionRef: RefObject<HTMLElement>
}

export const EducationComponent: FC<EducationComponentProps> = ({ educations, sectionRef }) => {
  return (
    <section ref={sectionRef} className="resume-section" id="education">
      <div className="resume-section-content">
        <h2 className="mb-5">Education</h2>
        <div className="experience-timeline">
          {educations.map((value, index) => (
            <EducationRowComponent
              key={`${value.school}-${value.startFrom}`}
              {...value}
              isLast={index === educations.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const EducationRowComponent: FC<Education & { isLast: boolean }> = ({
  gpa,
  startFrom,
  endFrom,
  school,
  degreeType,
  major,
  isLast
}) => {
  return (
    <div className="experience-timeline-item">
      <div className="experience-timeline-marker">
        <div className="experience-timeline-dot" />
        {!isLast && <div className="experience-timeline-line" />}
      </div>
      <div className="d-flex flex-column flex-md-row justify-content-between mb-5 experience-timeline-content">
        <div className="flex-grow-1">
          <h3 className="mb-0 text-primary">{school}</h3>
          <div className="subheading mb-2">{degreeType}</div>
          <div className="education-meta">
            <span className="education-badge education-badge-major">
              <FontAwesomeIcon icon={faGraduationCap} className="me-1" />
              {major}
            </span>
            {gpa && (
              <span className="education-badge education-badge-gpa">
                <FontAwesomeIcon icon={faMedal} className="me-1" />
                GPA: {gpa}
              </span>
            )}
          </div>
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
