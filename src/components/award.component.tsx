import { FC, RefObject } from 'react'
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
        {certifications?.map((value) => (
          <CertificationRowComponent key={`${value.name}-${value.providedBy}`} {...value} />
        ))}
      </div>
    </section>
  )
}

export const CertificationRowComponent: FC<Certification> = ({
  startFrom,
  endFrom,
  name,
  score,
  providedBy
}) => {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
      <div className="flex-grow-1">
        <h3 className="mb-0 text-primary">{name}</h3>
        <div className="subheading mb-3">{providedBy}</div>
        {score && <p>Score: {score}</p>}
      </div>
      {(startFrom || endFrom) && (
        <div className="flex-shrink-0">
          <span className="text-primary">
            {startFrom} - {endFrom}
          </span>
        </div>
      )}
    </div>
  )
}
