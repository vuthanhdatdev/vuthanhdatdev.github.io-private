import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faBuilding, faStar } from '@fortawesome/free-solid-svg-icons'
import { Certification } from '../data/portfolio.data'

export interface AwardComponentProps {
  certifications?: Certification[]
  sectionRef: RefObject<HTMLElement>
}

export const AwardComponent: FC<AwardComponentProps> = ({ certifications, sectionRef }) => {
  return (
    <section ref={sectionRef} className="resume-section" id="awards">
      <div className="resume-section-content">
        <h2 className="mb-5">Awards & Certifications</h2>
        <div className="experience-timeline">
          {certifications?.map((value, index) => (
            <CertificationRowComponent
              key={`${value.name}-${value.providedBy}`}
              {...value}
              isLast={index === (certifications?.length ?? 1) - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export const CertificationRowComponent: FC<Certification & { isLast: boolean }> = ({
  startFrom,
  endFrom,
  name,
  score,
  providedBy,
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
          <h3 className="mb-0 text-primary">{name}</h3>
          <div className="subheading mb-2">{providedBy}</div>
          <div className="education-meta">
            <span className="education-badge education-badge-major">
              <FontAwesomeIcon icon={faBuilding} className="me-1" />
              {providedBy}
            </span>
            {score && (
              <span className="education-badge education-badge-gpa">
                <FontAwesomeIcon icon={faStar} className="me-1" />
                Score: {score}
              </span>
            )}
            <span className="education-badge education-badge-cert">
              <FontAwesomeIcon icon={faTrophy} className="me-1" />
              Certified
            </span>
          </div>
        </div>
        {(startFrom || endFrom) && (
          <div className="flex-shrink-0 mt-2 mt-md-0">
            <span className="text-primary">
              {startFrom}
              {endFrom ? ` - ${endFrom}` : ''}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
