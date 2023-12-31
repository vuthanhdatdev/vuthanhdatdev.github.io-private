import {FC, RefObject} from "react";
import {Education} from "../data/portfolio.data";

export interface EducationComponentProps {
    educations: Education[];
    sectionRef: RefObject<HTMLTableSectionElement>;
}

export const EducationComponent: FC<EducationComponentProps> = (props: EducationComponentProps) => {
    const { educations, sectionRef } = props;
    return <section ref={sectionRef} className="resume-section" id="education">
        <div className="resume-section-content">
            <h2 className="mb-5">Education</h2>
            {educations.map((value, idx) => {
                return <EducationRowComponent key={idx} {...value} />
            })}
        </div>

    </section>
}

export const EducationRowComponent: FC<any> = (props: Education) => {
    const { gpa, startFrom, endFrom, school, degreeType, major } = props;
    return <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="flex-grow-1">
            <h3 className="mb-0">{school}</h3>
            <div className="subheading mb-3">{degreeType}</div>
            <div>Major: {major}</div>
            <p>GPA: {gpa}</p>
        </div>
        <div className="flex-shrink-0"><span className="text-primary">{startFrom} - {!!endFrom ? endFrom : 'Present'}</span></div>
    </div>
}