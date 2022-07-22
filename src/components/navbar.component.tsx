import {FC, useState} from 'react';
import avatar from '../assets/profile.jpg';
import classNames from 'classnames';

export interface NavbarComponentProps {
    firstName: string;
    lastName: string;
    currentElementIndexInViewport?: number;
}
const NavbarComponent: FC<NavbarComponentProps> = (props: NavbarComponentProps) => {
    const { firstName, lastName, currentElementIndexInViewport } = props;
    const name = `${firstName} ${lastName}`;
    const hrefs = [
        {
            href: '#about',
            text: 'About',
        },
        {
            href: '#experience',
            text: 'Experience',
        },
        {
            href: '#education',
            text: 'Education',
        },
        {
            href: '#skills',
            text: 'Skills'
        },
        {
            href: '#interests',
            text: 'Interests'
        },
        {
            href: '#awards',
            text: 'Awards'
        }
        ];
    const [current, setCurrent] = useState<string | null>('#page-top');
    const currentScrollPos = !!currentElementIndexInViewport && currentElementIndexInViewport > -1 ? currentElementIndexInViewport : 0;
    const currentSection = hrefs[currentScrollPos];
    console.log(currentSection);
    const onClickNavUrl = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        const anchor: HTMLAnchorElement = e.currentTarget;
        setCurrent(anchor.getAttribute('href'));
    }
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top" onClick={event => onClickNavUrl(event)}>
                <span className="d-block d-lg-none">{name}</span>
                <span className="d-none d-lg-block"><img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={avatar} alt={name} /></span>
            </a>
            <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav">
                    {hrefs.map(value => {
                        const {href, text} = value;
                        const active = (current === href) || (currentSection.href === href)
                        const navItemClasses: any = classNames(
                            'nav-link',
                            'js-scroll-trigger',
                            {'active': active}
                        );
                        return <li key={href} value={href} className="nav-item">
                            <a key={href} className={navItemClasses} onClick={e => onClickNavUrl(e)} href={href}>{text}</a>
                        </li>;
                    })}
                </ul>
            </div>
        </nav>
}

export default NavbarComponent;