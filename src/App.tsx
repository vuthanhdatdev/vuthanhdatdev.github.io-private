import React, {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import PortfolioPage from "./pages/portfolio.page";
import { Scrollspy } from '@makotot/ghostui'
import {PortfolioData} from "./data/portfolio.data";
import axios, {AxiosResponse} from "axios";

const App = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRefs = [
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
    useRef<HTMLTableSectionElement>(null),
  ];

  useEffect(() => {
    const fetchGitHubPortfolioData = async () => {
      try {
        const url = "https://raw.githubusercontent.com/vuthanhdatdev/vuthanhdatdev/main/data.json";
        const response: AxiosResponse<PortfolioData> = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGitHubPortfolioData();
  }, []);

  if (error) {
    console.log(error);
    return <div>Error: {JSON.stringify(error)}</div>;
  }
  if (loading || !data) {
    return <Fragment>Loading</Fragment>
  }
  return (
      <Scrollspy sectionRefs={sectionRefs}>
        {({ currentElementIndexInViewport }) => (
            <PortfolioPage
                currentElementIndexInViewport={currentElementIndexInViewport}
                sectionRefs={sectionRefs}
                data={data}
            />
        )}
      </Scrollspy>
  );
}

export default App;
