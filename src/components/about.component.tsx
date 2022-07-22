import {FC, RefObject} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGithub, faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

export interface AboutComponentProps {
    sectionRef: RefObject<HTMLTableSectionElement>;
    firstName: string;
    lastName: string;
    email: string;
    shortIntroduction: string;
    address: string;
    linkedInUrl: string;
    githubUrl: string;
    twitterUrl: string;
    facebookUrl: string;
}

const AboutComponent: FC<AboutComponentProps> = (props: AboutComponentProps) => {
    const { sectionRef, firstName, lastName, facebookUrl, githubUrl, linkedInUrl, twitterUrl, address, email, shortIntroduction } = props;

    return <section ref={sectionRef} className="resume-section" id="about">
        <div className="resume-section-content">
            <h1 className="mb-0">
                {firstName}
                <span className="text-primary">{lastName}</span>
            </h1>
            <div className="subheading mb-5">
                {address}
                <a href={`mailto:${email}`}>{email}</a>
            </div>
            <p className="lead mb-5">
                {shortIntroduction}
            </p>
            <div className="social-icons">
                <a className="social-icon" href={linkedInUrl}><FontAwesomeIcon icon={faLinkedin} /></a>
                <a className="social-icon" href={githubUrl}><FontAwesomeIcon icon={faGithub} /></a>
                <a className="social-icon" href={twitterUrl}><FontAwesomeIcon icon={faTwitter} /></a>
                <a className="social-icon" href={facebookUrl}><FontAwesomeIcon icon={faFacebook} /></a>
            </div>
        </div>
    </section>

}

export default AboutComponent;