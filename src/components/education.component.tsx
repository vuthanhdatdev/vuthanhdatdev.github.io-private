import {FC} from "react";
import {EducationDataProps} from "../data/education.data";

export interface EducationComponentProps {
    data: EducationDataProps[];
}

export const EducationComponent: FC<EducationComponentProps> = (props: EducationComponentProps) => {
    const { data } = props;
    return <section className="resume-section" id="education">
        <div className="resume-section-content">
            <h2 className="mb-5">Education</h2>
            {data.map(value => {
                return <EducationRowComponent {...value} />
            })}
        </div>

    </section>
}

export const EducationRowComponent: FC<any> = (props: EducationDataProps) => {
    const { gpa, startFrom, endFrom, school, degreeType, major } = props;
    return <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="flex-grow-1">
            <h3 className="mb-0">{school}</h3>
            <div className="subheading mb-3">{degreeType}</div>
            <div>{major}</div>
            <p>{gpa}</p>
        </div>
        <div className="flex-shrink-0"><span className="text-primary">{startFrom} - {!!endFrom ? endFrom : 'Present'}</span></div>
    </div>
}