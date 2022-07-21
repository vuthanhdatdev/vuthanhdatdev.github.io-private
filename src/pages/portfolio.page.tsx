import {FC, Fragment} from 'react';
import '../App.css';
import NavbarComponent from "../components/navbar.component";
import AboutComponent from "../components/about.component";
import {ExperienceComponent} from "../components/experience.component";
import {workData} from "../data/work.data";
import {EducationComponent} from "../components/education.component";
import {educationData} from "../data/education.data";
import {SkillComponent} from "../components/skill.component";
import {AwardComponent} from "../components/award.component";

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
    Apart from being a web developer,
     I enjoy most of my time being outdoors.
      In the winter, I am an avid skier and novice ice climber.
       During the free time in my life, I enjoy mechanical keyboard building.`;
    const shortBriefLife2 = `When forced indoors,
     I follow a number of sci-fi and fantasy genre movies and television shows,
      I am an aspiring chef,
       and I spend a large amount of my free time exploring the latest technology advancements in the front-end web development world.`;
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
            <EducationComponent data={educationData}/>
            <hr className="m-0" />
            <SkillComponent workFlows={[]}/>
            <hr className="m-0" />
            <section className="resume-section" id="interests">
                <div className="resume-section-content">
                    <h2 className="mb-5">Interests</h2>
                    {/*<p>{shortBriefLife}</p>*/}
                    {/*<p className="mb-0">{shortBriefLife2}</p>*/}
                </div>
            </section>
            <hr className="m-0" />
            <AwardComponent awards={[]} />
        </div>
    </Fragment>
}

export default PortfolioPage;