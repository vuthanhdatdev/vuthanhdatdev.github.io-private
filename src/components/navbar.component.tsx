import {FC, useState, MouseEvent} from 'react';
import classNames from 'classnames';

export interface NavbarComponentProps {
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  currentElementIndexInViewport?: number;
}

const NavbarComponent: FC<NavbarComponentProps> = (props: NavbarComponentProps) => {
  const {
    firstName,
    lastName,
    currentElementIndexInViewport,
    profileImageUrl
  } = props;
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
  const onNavItemClick = (e: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
  }
  const navBarClasses: string = classNames(
      'collapse',
      'navbar-collapse',
      {'show': open}
  );
  const navBtnClasses: string = classNames(
      'navbar-toggler',
      {'collapsed': !open}
  );
  const currentScrollPos = !!currentElementIndexInViewport && currentElementIndexInViewport > -1 ? currentElementIndexInViewport : 0;
  const currentSection = hrefs[currentScrollPos];
  return <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
    <a onClickCapture={onNavItemClick} className="navbar-brand js-scroll-trigger" href={"#page-top"}>
      <div className="d-flex align-items-center">
        <div className="d-none d-lg-block">
          <img className="img-fluid img-profile rounded-circle mx-auto mb-2"
               src={profileImageUrl} alt={name}/>
        </div>
        <div className="d-sm-inline-block d-lg-none">
          <img
              style={{width: '30px', height: '30px'}}
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src={profileImageUrl} alt={name}/>

          <span className="fw-bold d-lg-none">     {name}</span>
        </div>
      </div>
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
            <a key={href} className={navItemClasses} href={href} onClickCapture={onNavItemClick}>{text}</a>
          </li>;
        })}
      </ul>
    </div>
  </nav>
}

export default NavbarComponent;