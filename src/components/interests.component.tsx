import {FC, RefObject} from "react";

export interface InterestsComponentProps {
    line1?: string;
    line2?: string;
    sectionRef: RefObject<HTMLTableSectionElement>;
}

export const InterestsComponent: FC<InterestsComponentProps> = (props: InterestsComponentProps) => {
    const { line1, line2, sectionRef } = props;
    return <section ref={sectionRef} className="resume-section" id="interests">
        <div className="resume-section-content">
            <h2 className="mb-5">Interests</h2>
            <p hidden={!line1}>{line1}</p>
            <p hidden={!line2} className="mb-0">{line2}</p>
        </div>
    </section>

}