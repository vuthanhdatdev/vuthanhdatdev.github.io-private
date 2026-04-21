import { FC, RefObject } from 'react'
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
          <h3 className="mb-0 text-primary">{position}</h3>
          <div className="subheading mb-3">{companyName}</div>
          <p>{detail}</p>
        </div>
        <div className="flex-shrink-0">
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
