import {FC} from 'react';
import {WorkDataProps} from "../data/work.data";

export interface ExperienceComponentProps {
    data: WorkDataProps[];
}



export const ExperienceRowComponent: FC<WorkDataProps> = (props: WorkDataProps) => {
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
    const {data} = props;
    return <section className="resume-section" id="experience">
        <div className="resume-section-content">
            <h2 className="mb-5">Experience</h2>
            {data?.map(value =>
                <ExperienceRowComponent
                    {...value}
                />
            )}
        </div>
    </section>
};
