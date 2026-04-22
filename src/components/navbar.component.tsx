import { FC, useState, MouseEvent } from 'react'
import { Link } from '@tanstack/react-router'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeather } from '@fortawesome/free-solid-svg-icons'

const NAV_ITEMS = [
  { href: '#about', text: 'About' },
  { href: '#experience', text: 'Experience' },
  { href: '#education', text: 'Education' },
  { href: '#skills', text: 'Skills' },
  { href: '#interests', text: 'Interests' },
  { href: '#awards', text: 'Awards' }
]

export interface NavbarComponentProps {
  firstName: string
  lastName: string
  profileImageUrl?: string | undefined
  currentElementIndexInViewport?: number
}

const NavbarComponent: FC<NavbarComponentProps> = ({
  firstName,
  lastName,
  currentElementIndexInViewport,
  profileImageUrl
}) => {
  const [open, setOpen] = useState(false)
  const name = `${firstName.trim()} ${lastName}`

  const onNavToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpen(!open)
  }
  const onNavItemClick = () => setOpen(false)

  const navBarClasses = classNames('collapse', 'navbar-collapse', { show: open })
  const navBtnClasses = classNames('navbar-toggler', { collapsed: !open })

  const currentScrollPos =
    currentElementIndexInViewport !== undefined && currentElementIndexInViewport >= 0
      ? currentElementIndexInViewport
      : 0
  const currentSection = NAV_ITEMS[currentScrollPos]

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top" id="sideNav">
      <a className="navbar-brand js-scroll-trigger" href="#page-top" onClick={onNavItemClick}>
        <div className="d-flex align-items-center">
          {/* Desktop: centered image in sidebar */}
          <div className="d-none d-lg-block w-100 text-center">
            <img
              className="img-fluid img-profile rounded-circle mx-auto mb-2"
              src={profileImageUrl}
              alt={name}
            />
          </div>
          {/* Mobile: small image + name inline */}
          <div className="d-flex d-lg-none align-items-center gap-2">
            <img
              style={{ width: '32px', height: '32px', objectFit: 'cover', flexShrink: 0 }}
              className="img-fluid img-profile rounded-circle"
              src={profileImageUrl}
              alt={name}
            />
            <span className="fw-bold">{name}</span>
          </div>
        </div>
      </a>

      <button
        className={navBtnClasses}
        type="button"
        aria-controls="navbarResponsive"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={onNavToggle}
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className={navBarClasses} id="navbarResponsive">
        <ul className="navbar-nav">
          {NAV_ITEMS.map(({ href, text }) => (
            <li key={href} className="nav-item">
              <a
                className={classNames('nav-link', 'js-scroll-trigger', {
                  active: currentSection.href === href
                })}
                href={href}
                onClick={onNavItemClick}
              >
                {text}
              </a>
            </li>
          ))}
          <li className="nav-item">
            <Link to="/blog" className="nav-link" onClick={onNavItemClick}>
              <FontAwesomeIcon icon={faFeather} className="me-1" />
              Blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavbarComponent
