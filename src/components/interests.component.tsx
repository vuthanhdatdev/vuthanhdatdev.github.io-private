import {FC} from "react";

export interface InterestsComponentProps {
    line1?: string;
    line2?: string;
}

export const InterestsComponent: FC<InterestsComponentProps> = (props: InterestsComponentProps) => {
    const { line1, line2 } = props;
    return <section className="resume-section" id="interests">
        <div className="resume-section-content">
            <h2 className="mb-5">Interests</h2>
            <p hidden={!line1}>{line1}</p>
            <p hidden={!line2} className="mb-0">{line2}</p>
        </div>
    </section>

}