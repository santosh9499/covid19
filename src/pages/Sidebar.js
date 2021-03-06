import React, { useContext, useEffect } from 'react'
import './Sidebar.css'
import Country from '../components/Country'
import { DataContext } from '../context/DataContext'
import { sortCountries } from '../utils';
import { useLocation } from 'react-router-dom'

function Sidebar({ fixedSidebar, onlySidebar }) {

  const {
    countriesState, worldwideState
  } = useContext(DataContext);
  const [apiCountriesData,] = countriesState;
  const [apiWorldwideData,] = worldwideState;

  //SCROLL
  const [scrollHeight, setScrollHeight] = React.useState();
  const tryScrolling = e => {
    let element = e.target;
    if (element.scrollTop > 50)
      setScrollHeight(true);
    else
      setScrollHeight(false);
  }

  return (
    <div className={`sidebar ${fixedSidebar && "sidebar--fixed"} ${onlySidebar && "sidebar--only"}`}>
      {/* --Heading */}
      {
        !scrollHeight ?
          <h1 className="sidebar__heading">Cases by <br />Countries ๐</h1>
          :
          <div className="dropDown sidebar__block">
            <h2 className="dropDown__heading"><span>Cases</span> by <span>Countries ๐</span></h2>
          </div>
      }

      {/* --Table */}

      <div
        className="countryList"
        onScroll={tryScrolling}
      >
        <Country
          listId={-1}
          value={'worldwide'}
          name="Worldwide"
          cases={apiWorldwideData.cases ? apiWorldwideData.cases : "--"} />
        {
          apiCountriesData.length > 0 ?
            sortCountries(apiCountriesData).map((cur, index) => (
              <Country
                key={index}
                listId={index}
                name={cur.country}
                cases={cur.cases} />
            ))
            : null
        }
        <div className="footNote">
          <p className="footNote__text" style={{ textAlign: "end" }}>
            Thanks to all the<span /><br /> Frontline Workers๐
            </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
