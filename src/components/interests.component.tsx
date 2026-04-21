import { FC, RefObject } from 'react'

export interface InterestsComponentProps {
  shortBriefLife?: string[]
  sectionRef: RefObject<HTMLElement>
}

export const InterestsComponent: FC<InterestsComponentProps> = ({ shortBriefLife, sectionRef }) => {
  return (
    <section ref={sectionRef} className="resume-section" id="interests">
      <div className="resume-section-content">
        <h2 className="mb-5">Interests</h2>
        {shortBriefLife?.map((value, index) => (
          <p key={index} className={index === shortBriefLife.length - 1 ? 'mb-0' : undefined}>
            {value}
          </p>
        ))}
      </div>
    </section>
  )
}
