import {FC, Fragment, RefObject, useEffect, useState} from 'react';
import '../App.css';
import NavbarComponent from "../components/navbar.component";
import AboutComponent from "../components/about.component";
import {ExperienceComponent} from "../components/experience.component";
import {EducationComponent} from "../components/education.component";
import {SkillComponent} from "../components/skill.component";
import {AwardComponent} from "../components/award.component";
import {InterestsComponent} from "../components/interests.component";
import axios, {AxiosResponse} from 'axios';
import {PortfolioData} from "../data/portfolio.data";

export interface PortfolioPageProps {
    currentElementIndexInViewport: number;
    sectionRefs: RefObject<HTMLTableSectionElement>[];
    data: PortfolioData;
}

const PortfolioPage: FC<PortfolioPageProps> = (props) => {
    const {data} = props;
    const information = data.information;
    const workData = data?.workHistories || [];
    const educationData = data?.educations || [];
    const certificationData = data?.certifications;
    let {
        firstName, lastName, city, country, phoneNumber, email, shortIntroduction,
        githubUrl,
        linkedInUrl,
        twitterUrl,
        facebookUrl,
        shortBriefLife,
        profileImageUrl,
        pdfUrl,
    } = information;
    firstName = `${firstName} `;
    const {currentElementIndexInViewport, sectionRefs} = props;
    const address = `${city} · ${country} · ${phoneNumber} ·`
    return <Fragment>
        <NavbarComponent
            currentElementIndexInViewport={currentElementIndexInViewport}
            firstName={firstName}
            lastName={lastName}
            profileImageUrl={profileImageUrl}
        />
        <div className="container-fluid p-0">
            <AboutComponent
                sectionRef={sectionRefs[0]}
                firstName={firstName}
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
            <hr className="m-0"/>
            <ExperienceComponent sectionRef={sectionRefs[1]} data={workData}/>
            <hr className="m-0"/>
            <EducationComponent
                sectionRef={sectionRefs[2]}
                educations={educationData}
            />
            <hr className="m-0"/>
            <SkillComponent
                sectionRef={sectionRefs[3]}
                workFlows={[]}
            />
            <hr className="m-0"/>
            <InterestsComponent
                sectionRef={sectionRefs[4]}
                shortBriefLife={shortBriefLife}
            />
            <hr className="m-0"/>
            <AwardComponent
                sectionRef={sectionRefs[5]}
                certifications={certificationData}
                awards={[]}
            />
        </div>
    </Fragment>
}

export default PortfolioPage;