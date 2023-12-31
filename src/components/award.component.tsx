import {FC, RefObject} from 'react';
import {Certification} from "../data/portfolio.data";

export interface AwardComponentProps {
    awards: string[];
    certifications?: Certification[];
    sectionRef: RefObject<HTMLTableSectionElement>;

}

export const AwardComponent: FC<AwardComponentProps> = (props: AwardComponentProps) => {
    const { certifications, sectionRef } = props;
    return <section ref={sectionRef} className="resume-section" id="awards">
        <div className="resume-section-content">
            <h2 className="mb-5">Awards & Certifications</h2>
            {certifications?.map((value, idx) => {
                return <CertificationRowComponent key={idx} {...value} />
            })}
        </div>
    </section>
};

export const CertificationRowComponent: FC<any> = (props: Certification) => {
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
