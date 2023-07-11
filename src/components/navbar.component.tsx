import {FC, useState, MouseEvent} from 'react';
import avatar from '../assets/profile.jpg';
import classNames from 'classnames';

export interface NavbarComponentProps {
    firstName: string;
    lastName: string;
    currentElementIndexInViewport?: number;
}
const NavbarComponent: FC<NavbarComponentProps> = (props: NavbarComponentProps) => {
    const { firstName, lastName, currentElementIndexInViewport } = props;
    const [open, setOpen] = useState(false);
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
    const onNavClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setOpen(!open);
    };
    const navBarClasses: string = classNames(
        'collapse',
        'navbar-collapse',
        {'show': open}
    );
    const navBtnClasses: string = classNames(
        'navbar-toggler',
        {'collapsed': !open}
    );
    const pdfUrl = process.env.PUBLIC_URL + '/pdfs/TaVuThanhDat_CV.pdf';
    const currentScrollPos = !!currentElementIndexInViewport && currentElementIndexInViewport > -1 ? currentElementIndexInViewport : 0;
    const currentSection = hrefs[currentScrollPos];
    return <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
            <a className="navbar-brand js-scroll-trigger" href="#page-top">
                <span className="d-block d-lg-none">{name}</span>
                <span className="d-none d-lg-block"><img className="img-fluid img-profile rounded-circle mx-auto mb-2" src={avatar} alt={name} /></span>
            </a>
            <button className={navBtnClasses}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded={open}
                    onClick={event => onNavClick(event)}
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={navBarClasses} id="navbarResponsive">
                <ul className="navbar-nav">
                    {hrefs.map(value => {
                        const {href, text} = value;
                        const active = (currentSection.href === href)
                        const navItemClasses: string = classNames(
                            'nav-link',
                            'js-scroll-trigger',
                            {'active': active}
                        );
                        return <li key={href} value={href} className="nav-item">
                            <a key={href} className={navItemClasses} href={href}>{text}</a>
                        </li>;
                    })}

                    <li className="nav-item">
                        <a
                            className={classNames(
                                'nav-link',
                                'js-scroll-trigger')}
                            href={pdfUrl}
                            download="TaVuThanhDat.pdf"
                        >
                            Download My Portfolio
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
}

export default NavbarComponent;