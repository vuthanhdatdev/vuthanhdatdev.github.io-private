import {FC} from 'react';
import {CertificationDataProps} from "../data/education.data";


export interface AwardComponentProps {
    awards: string[];
    certifications: CertificationDataProps[];

}

export const AwardComponent: FC<AwardComponentProps> = (props: AwardComponentProps) => {
    const { certifications } = props;
    return <section className="resume-section" id="awards">
        <div className="resume-section-content">
            <h2 className="mb-5">Awards & Certifications</h2>
            {/*<ul className="fa-ul mb-0">*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        TBD*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        Mobile Web Specialist - Google Certification*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        1*/}
            {/*        <sup>st</sup>*/}
            {/*        Place - University of Colorado Boulder - Emerging Tech Competition 2009*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        1*/}
            {/*        <sup>st</sup>*/}
            {/*        Place - University of Colorado Boulder - Adobe Creative Jam 2008 (UI Design Category)*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        2*/}
            {/*        <sup>nd</sup>*/}
            {/*        Place - University of Colorado Boulder - Emerging Tech Competition 2008*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        1*/}
            {/*        <sup>st</sup>*/}
            {/*        Place - James Buchanan High School - Hackathon 2006*/}
            {/*    </li>*/}
            {/*    <li>*/}
            {/*        <span className="fa-li"><i className="fas fa-trophy text-warning"></i></span>*/}
            {/*        3*/}
            {/*        <sup>rd</sup>*/}
            {/*        Place - James Buchanan High School - Hackathon 2005*/}
            {/*    </li>*/}
            {/*</ul>*/}

            {certifications.map((value, idx) => {
                return <CertificationRowComponent key={idx} {...value} />
            })}
        </div>
    </section>
};

export const CertificationRowComponent: FC<any> = (props: CertificationDataProps) => {
    const {startFrom, endFrom, name, score, providedBy} = props;
    return <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="flex-grow-1">
            <h3 className="mb-0">{name}</h3>
            <div className="subheading mb-3">{providedBy}</div>
            <p hidden={!score}>Score: {score}</p>
        </div>
        <div hidden={!startFrom && !endFrom} className="flex-shrink-0"><span
            className="text-primary">{startFrom} - {endFrom}</span></div>
    </div>
};
