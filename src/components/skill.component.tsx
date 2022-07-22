import {FC} from 'react';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faJava, faLinux, faHtml5, faCss3Alt, faNodeJs, faReact, faAngular, faAmazon } from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface SkillComponentProps {
    workFlows: string[];

}

export const SkillComponent: FC<SkillComponentProps> = (props: SkillComponentProps) => {
    return <section className="resume-section" id="skills">
        <div className="resume-section-content">
            <h2 className="mb-5">Skills</h2>
            <div className="subheading mb-3">Programming Languages & Tools</div>
            <ul className="list-inline dev-icons">
                <li className="list-inline-item"><FontAwesomeIcon icon={faJava}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faNodeJs}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faHtml5}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faCss3Alt}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faReact}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faAngular}/></li>
                <li className="list-inline-item"><FontAwesomeIcon icon={faLinux}/></li>
                <li className="list-inline-item"><FontAwesomeIcon textAnchor={'Amazon'} icon={faAmazon}/></li>
            </ul>
            <div className="subheading mb-3">Workflow</div>
            <ul className="fa-ul mb-0">
                <li>
                    <span className="fa-li"><FontAwesomeIcon icon={faCheck}/></span>
                    Database Design
                </li>
                <li>
                    <span className="fa-li"><FontAwesomeIcon icon={faCheck}/></span>
                    Software Architecture Design
                </li>
                <li>
                    <span className="fa-li"><FontAwesomeIcon icon={faCheck}/></span>
                    Cross Functional Teams
                </li>
                <li>
                    <span className="fa-li"><FontAwesomeIcon icon={faCheck}/></span>
                    Agile Development & Scrum
                </li>
            </ul>
        </div>
    </section>
};
