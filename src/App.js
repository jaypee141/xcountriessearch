import React, { useEffect, useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [textSearch, setText] =useState("");
  const [country, setCountry] = useState([]);

  useEffect(()=>{
    const getCountries= async(textSearch)=>{
      try{
      let response=await axios("https://restcountries.com/v3.1/all");
      //  if(textSearch === ""){
        let filteredCountries = response.data.filter((item) => {
          return item.name.common.includes(textSearch);
        });
        setCountry(filteredCountries);   

      console.log(response.data)
      }catch(e){
        console.error("Something went wrong", e)
      }
    }
    getCountries(textSearch);
  }, [textSearch]);



  return (
    <div>
    <input className="input" type="text" placeholder="Enter country" onChange={(e) => setText(e.target.value)} />
 {/* </div> */}
    <div className="container" style={{gridColumn: "sm/12 lg/3 md/6"}}>
        {/* <div> */}
      {country.map((item, index) =>
      <div className='countryCard' key={index}>
        <img src={item.flags.png} alt={item.flags.alt} />
        <p>{item.name.common}</p>
      </div>
      )}
      </div>
    
    </div>
  );
}

export default App;
