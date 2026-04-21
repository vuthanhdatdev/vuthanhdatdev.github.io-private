import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faCode,
  faBookOpen,
  faGamepad,
  faMountainSun,
  faUtensils,
  faFilm,
  faMotorcycle,
  faKeyboard,
  faGuitar
} from '@fortawesome/free-solid-svg-icons'
import { Interest } from '../data/portfolio.data'

const ICON_MAP: Record<string, IconDefinition> = {
  faCode,
  faBookOpen,
  faGamepad,
  faMountainSun,
  faUtensils,
  faFilm,
  faMotorcycle,
  faKeyboard,
  faGuitar
}

const DEFAULT_INTERESTS: Interest[] = [
  {
    icon: 'faCode',
    label: 'Open Source',
    description: 'Contributing to open source projects and exploring new technologies.'
  },
  {
    icon: 'faBookOpen',
    label: 'Reading',
    description: 'Tech blogs, software engineering books and self-development literature.'
  },
  {
    icon: 'faGamepad',
    label: 'Gaming',
    description: 'Strategy and simulation games that challenge problem-solving skills.'
  },
  {
    icon: 'faMountainSun',
    label: 'Outdoors',
    description: 'Hiking and exploring nature to recharge and stay balanced.'
  },
  {
    icon: 'faUtensils',
    label: 'Cooking',
    description: 'Experimenting with new recipes and cuisines from around the world.'
  },
  {
    icon: 'faFilm',
    label: 'Films',
    description: 'Science fiction and documentary films that spark curiosity.'
  }
]

export interface InterestsComponentProps {
  shortBriefLife?: string[] | undefined
  interests?: Interest[] | undefined
  sectionRef: RefObject<HTMLElement>
}

export const InterestsComponent: FC<InterestsComponentProps> = ({
  shortBriefLife,
  interests,
  sectionRef
}) => {
  const displayInterests = interests && interests.length > 0 ? interests : DEFAULT_INTERESTS

  return (
    <section ref={sectionRef} className="resume-section" id="interests">
      <div className="resume-section-content">
        <h2 className="mb-4">Interests</h2>

        {shortBriefLife && shortBriefLife.length > 0 && (
          <div className="interests-bio mb-5">
            {shortBriefLife.map((value, index) => (
              <p key={index} className={index === shortBriefLife.length - 1 ? 'mb-0' : undefined}>
                {value}
              </p>
            ))}
          </div>
        )}

        <div className="interests-grid">
          {displayInterests.map(({ icon, label, description }) => (
            <div key={label} className="interest-card">
              <div className="interest-card-icon">
                <FontAwesomeIcon icon={ICON_MAP[icon] ?? faCode} />
              </div>
              <div className="interest-card-body">
                <div className="interest-card-label">{label}</div>
                <div className="interest-card-desc">{description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
