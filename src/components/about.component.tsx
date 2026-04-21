import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faDownload, faChevronDown } from '@fortawesome/free-solid-svg-icons'

export interface AboutComponentProps {
  sectionRef: RefObject<HTMLElement>
  firstName: string
  lastName: string
  email: string
  shortIntroduction: string
  address: string
  linkedInUrl: string
  githubUrl: string
  twitterUrl: string
  facebookUrl: string
  pdfUrl?: string
}

const SOCIAL_LINKS = (props: AboutComponentProps) => [
  { icon: faLinkedin, href: props.linkedInUrl, label: 'LinkedIn' },
  { icon: faGithub, href: props.githubUrl, label: 'GitHub' },
  { icon: faTwitter, href: props.twitterUrl, label: 'Twitter' },
  { icon: faFacebook, href: props.facebookUrl, label: 'Facebook' }
]

const AboutComponent: FC<AboutComponentProps> = (props) => {
  const { sectionRef, firstName, lastName, address, email, shortIntroduction, pdfUrl } = props

  return (
    <section ref={sectionRef} className="resume-section about-section" id="about">
      <div className="resume-section-content">
        <div className="about-header">
          <div className="about-header-text">
            <h1 className="mb-0">
              {firstName}
              <span className="text-primary">{lastName}</span>
            </h1>
            <div className="subheading mb-4">
              {address && (
                <>
                  <span className="d-block d-sm-inline">{address}</span>
                  <span className="d-none d-sm-inline"> · </span>
                </>
              )}
              <a className="d-block d-sm-inline" href={`mailto:${email}`}>
                {email}
              </a>
            </div>
            <p className="lead mb-4">{shortIntroduction}</p>
            <div className="mb-5">
              {pdfUrl && (
                <a
                  className="btn btn-primary me-3"
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Download CV
                </a>
              )}
            </div>
            <div className="social-icons">
              {SOCIAL_LINKS(props).map(({ icon, href, label }) => (
                <a
                  key={label}
                  className="social-icon"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <FontAwesomeIcon icon={icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="about-scroll-indicator d-none d-md-flex">
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </div>
    </section>
  )
}

export default AboutComponent
