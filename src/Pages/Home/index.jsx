import React, { useEffect, useState } from 'react';
import '../../App.css';
import CustonButton from '../../Components/Button';

const HomePage = () => {
  const [classCounts, setClassCounts] = useState({});
  const apiUrl = process.env.REACT_APP_BASE_URL;

  

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/latest-entry`);
      if (!response.ok) throw new Error('API response not ok');
      const data = await response.json();
      setClassCounts(data.latest_entry.class_counts);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Set interval to fetch data every 1 minute
    const interval = setInterval(fetchData, 70000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const items = [
    { id: 'hardmade_bottle_zero', name: 'hardmade bottle zero', imgSrc: 'images/hardmade_bottle_zero.png' },
    { id: 'ksiazece_bottle_zero', name: 'ksiazece bottle zero', imgSrc: 'images/ksiazece_bottle_zero.png' },
    { id: 'lech_bottle_zero', name: 'lech bottle zero', imgSrc: 'images/lech_bottle_zero.png' },
    { id: 'lech_can_zero', name: 'lech can zero', imgSrc: 'images/lech_can_zero.png' },
    { id: 'ksiazeceipa_bottle_zero', name: 'ksiazeceipa bottle zero', imgSrc: 'images/ksiazeceipa_bottle_zero.png' },
    { id: 'tyskie_can_zero', name: 'tyskie can zero', imgSrc: 'images/tyskie_can_zero.png' },
    { id: 'tyskie_bottle_zero', name: 'tyskie bottle zero', imgSrc: 'images/tyskie_bottle_zero.png' },
    { id: 'peroninastroazzurro_bottle_zero', name: 'peroninastroazzurro bottle zero', imgSrc: 'images/peroninastroazzurro_bottle_zero.png' },
    { id: 'peroninastroazzurro_can_zero', name: 'peroninastroazzurro can zero', imgSrc: 'images/peroninastroazzurro_can_zero.png' },
    { id: 'lechfruit_bottle_zero', name: 'lechfruit bottle zero', imgSrc: 'images/lechfruit_bottle_zero.png' },
  ];

  return (
    <div className="app">
        <div className='btnWrapper'>
            <a
            href="/search-results">

            <CustonButton
            title="Search" 
            icon= {
                <svg
                viewBox="0 0 19.9 19.7"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="title desc"
                class="svg-icon search-icon"
                width={18}
                height={18}
                >
                    <title>Search Icon</title>
                    <desc id="desc">A magnifying glass icon.</desc>
                    <g stroke="white" fill="none" class="search-path">
                        <path d="M18.5 18.3l-5.4-5.4" stroke-linecap="square"></path>
                        <circle r="7" cy="8" cx="8"></circle>
                    </g>
                </svg>}
                onClick={()=>{}}
                />
            </a>
        </div>
        <div className="items-container">
            {items.map(item => (
                <div key={item.id} className="card">
                <img src={item.imgSrc} alt={item.name} />
                <h3>{item.name}</h3>
                <p id={item.id}>{classCounts[item.id] || 0}</p>
            </div>
            ))}
        </div>
    </div>
  );
};

export default HomePage;