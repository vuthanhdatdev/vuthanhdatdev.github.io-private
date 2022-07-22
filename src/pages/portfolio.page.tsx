import {FC, Fragment} from 'react';
import '../App.css';
import NavbarComponent from "../components/navbar.component";
import AboutComponent from "../components/about.component";
import {ExperienceComponent} from "../components/experience.component";
import {workData} from "../data/work.data";
import {EducationComponent} from "../components/education.component";
import {certificationData, educationData} from "../data/education.data";
import {SkillComponent} from "../components/skill.component";
import {AwardComponent} from "../components/award.component";
import {InterestsComponent} from "../components/interests.component";

const PortfolioPage: FC<any> = () => {
    const firstName = 'Dat '
    const lastName = 'Vu Thanh'
    const address = `Saigon · Vietnam · (+84) 94-347-6316 ·`
    const email = `dev.thanhdat@gmail.com`
    const shortIntroduction = `I am passionate software wizard with 6 years experience of Java, AWS, NodeJS`
    const githubUrl = 'https://github.com/vuthanhdatdev';
    const linkedInUrl = 'https://www.linkedin.com/in/vuthanhdat';
    const twitterUrl = 'https://twitter.com/vuthanhdat_dev';
    const facebookUrl = 'https://www.facebook.com/vuthanhdat.developer';
    const shortBriefLife = `
    Apart from being a developer,
     I enjoy most of my time being outdoors.
      In the vacations, I am an motor rider to explore the worlds(and all the states of Vietnam).
       During the free time in my life, I enjoy mechanical keyboard building.`;
    const shortBriefLife2 = `When forced indoors,
     I do practice with some kind of music instruments,
      I am an part-time guitarist,
       and I spend a large amount of my free time exploring the latest technology advancements in the full-stack development world.`;
    return <Fragment>
        <NavbarComponent
            firstName={firstName}
            lastName={lastName}
        />
        <div className="container-fluid p-0">
            <AboutComponent
                firstName={firstName}
                lastName={lastName}
                email={email}
                shortIntroduction={shortIntroduction}
                address={address}
                linkedInUrl={linkedInUrl}
                githubUrl={githubUrl}
                twitterUrl={twitterUrl}
                facebookUrl={facebookUrl}
            />
            <hr className="m-0" />
            <ExperienceComponent data={workData} />
            <hr className="m-0" />
            <EducationComponent
                educations={educationData}
            />
            <hr className="m-0" />
            <SkillComponent workFlows={[]}/>
            <hr className="m-0" />
            <InterestsComponent line1={shortBriefLife} line2={shortBriefLife2} />
            <hr className="m-0" />
            <AwardComponent certifications={certificationData} awards={[]} />
        </div>
    </Fragment>
}

export default PortfolioPage;