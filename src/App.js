import { useState, useEffect } from 'react';
import './App.css';
import Autocomplete from './Autocomplete';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchCountriesData(){
      const res = await fetch(`https://restcountries.eu/rest/v2/all`);
      const data = await res.json();
      setData(data);
    }
    fetchCountriesData();
  }, [])
  return (
    <div className="App">
      <Autocomplete 
        countries={data}
      />
    </div>
  );
}

export default App;
