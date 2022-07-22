import React, {useRef} from 'react';
import './App.css';
import PortfolioPage from "./pages/portfolio.page";
import { Scrollspy } from '@makotot/ghostui'

const App = () => {
  const sectionRefs = [
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
  ];
  return (
      <Scrollspy sectionRefs={sectionRefs}>
        {({ currentElementIndexInViewport }) => (
            <PortfolioPage
                currentElementIndexInViewport={currentElementIndexInViewport}
                sectionRefs={sectionRefs}
            />
        )}
      </Scrollspy>
  );
}

export default App;
