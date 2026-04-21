import { FC, RefObject } from 'react'
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
        {educations.map((value) => (
          <EducationRowComponent key={`${value.school}-${value.startFrom}`} {...value} />
        ))}
      </div>
    </section>
  )
}

export const EducationRowComponent: FC<Education> = ({
  gpa,
  startFrom,
  endFrom,
  school,
  degreeType,
  major
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0 text-primary">{school}</h3>
        <div className="subheading mb-3">{degreeType}</div>
        <div>Major: {major}</div>
        <p>GPA: {gpa}</p>
      </div>
      <div className="flex-shrink-0">
        <span className="text-primary">
          {startFrom} - {endFrom || 'Present'}
        </span>
      </div>
    </div>
  )
}
