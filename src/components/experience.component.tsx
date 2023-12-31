import {FC, RefObject} from 'react';
import {WorkHistory} from "../data/portfolio.data";

export interface ExperienceComponentProps {
    data: WorkHistory[];
    sectionRef: RefObject<HTMLTableSectionElement>;
}



export const ExperienceRowComponent: FC<WorkHistory> = (props: WorkHistory) => {
    const { position, companyName, startFrom, endFrom, detail } = props;
    return <div className="d-flex flex-column flex-md-row justify-content-between mb-5">
        <div className="flex-grow-1">
            <h3 className="mb-0">{position}</h3>
            <div className="subheading mb-3">{companyName}</div>
            <p>{detail}</p>
        </div>
        <div className="flex-shrink-0"><span className="text-primary">{startFrom} - {!!endFrom ? endFrom: 'Present'}</span></div>
    </div>
};

export const ExperienceComponent: FC<ExperienceComponentProps> = (props: ExperienceComponentProps) => {
    const {data, sectionRef} = props;
    return <section ref={sectionRef} className="resume-section" id="experience">
        <div className="resume-section-content">
            <h2 className="mb-5">Experience</h2>
            {data?.map((value, idx) =>
                <ExperienceRowComponent
                    key={idx}
                    {...value}
                />
            )}
        </div>
    </section>
};
