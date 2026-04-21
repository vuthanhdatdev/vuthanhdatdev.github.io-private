import { FC, Fragment, RefObject } from 'react'
import '../App.css'
import NavbarComponent from '../components/navbar.component'
import AboutComponent from '../components/about.component'
import { ExperienceComponent } from '../components/experience.component'
import { EducationComponent } from '../components/education.component'
import { SkillComponent } from '../components/skill.component'
import { AwardComponent } from '../components/award.component'
import { InterestsComponent } from '../components/interests.component'
import { PortfolioData } from '../data/portfolio.data'

export interface PortfolioPageProps {
  currentElementIndexInViewport: number
  sectionRefs: RefObject<HTMLElement>[]
  data: PortfolioData
}

const PortfolioPage: FC<PortfolioPageProps> = ({
  currentElementIndexInViewport,
  sectionRefs,
  data
}) => {
  const { information, workHistories = [], educations = [], certifications } = data
  const {
    firstName,
    lastName,
    city,
    country,
    phoneNumber,
    email,
    shortIntroduction,
    githubUrl,
    linkedInUrl,
    twitterUrl,
    facebookUrl,
    shortBriefLife,
    profileImageUrl,
    pdfUrl
  } = information

  const displayFirstName = `${firstName} `
  const address = [city, country, phoneNumber].filter(Boolean).join(' · ')

  return (
    <Fragment>
      <NavbarComponent
        currentElementIndexInViewport={currentElementIndexInViewport}
        firstName={displayFirstName}
        lastName={lastName}
        profileImageUrl={profileImageUrl}
      />
      <div className="container-fluid p-0 page-content-offset">
        <AboutComponent
          sectionRef={sectionRefs[0]}
          firstName={displayFirstName}
          lastName={lastName}
          email={email}
          shortIntroduction={shortIntroduction}
          address={address}
          linkedInUrl={linkedInUrl}
          githubUrl={githubUrl}
          twitterUrl={twitterUrl}
          facebookUrl={facebookUrl}
          pdfUrl={pdfUrl}
        />
        <hr className="m-0" />
        <ExperienceComponent sectionRef={sectionRefs[1]} data={workHistories} />
        <hr className="m-0" />
        <EducationComponent sectionRef={sectionRefs[2]} educations={educations} />
        <hr className="m-0" />
        <SkillComponent sectionRef={sectionRefs[3]} workFlows={[]} />
        <hr className="m-0" />
        <InterestsComponent
          sectionRef={sectionRefs[4]}
          {...(shortBriefLife !== undefined && { shortBriefLife })}
        />
        <hr className="m-0" />
        <AwardComponent sectionRef={sectionRefs[5]} certifications={certifications} />
      </div>
    </Fragment>
  )
}

export default PortfolioPage
