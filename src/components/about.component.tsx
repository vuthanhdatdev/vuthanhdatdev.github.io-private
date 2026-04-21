import { FC, RefObject } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGithub, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons'

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

const AboutComponent: FC<AboutComponentProps> = ({
  sectionRef,
  firstName,
  lastName,
  facebookUrl,
  githubUrl,
  linkedInUrl,
  twitterUrl,
  address,
  email,
  shortIntroduction,
  pdfUrl
}) => {
  return (
    <section ref={sectionRef} className="resume-section" id="about">
      <div className="resume-section-content">
        <h1 className="mb-0">
          {firstName}
          <span className="text-primary">{lastName}</span>
        </h1>
        <div className="subheading mb-5">
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
        <p className="lead mb-5">{shortIntroduction}</p>
        <p className="subheading lead mb-5 align-content-center align-items-center">
          <a className="btn btn-primary" href={pdfUrl} target="_blank" rel="noopener noreferrer">
            Download My CV
          </a>
        </p>
        <div className="social-icons">
          <a className="social-icon" href={linkedInUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a className="social-icon" href={githubUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="social-icon" href={twitterUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a className="social-icon" href={facebookUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
    </section>
  )
}

export default AboutComponent
