import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ReactCountryFlag from 'react-country-flag';
import { countries } from 'countries-list';

const CountryDropdown = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  useEffect(() => {
    const countryOptionsArray = Object.keys(countries).map((countryCode) => {
      const countryData = countries[countryCode];
      return {
        value: countryCode,
        label: `${countryData.name} (${countryCode}) +${countryData.phone}`,
      };
    });
    setCountryOptions(countryOptionsArray);
  }, []);

  const handleChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
      padding: 5,
    }),
    singleValue: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <div>
      <h2>Country Dropdown</h2>
      <Select
        value={selectedCountry}
        onChange={handleChange}
        options={countryOptions}
        styles={customStyles}
        isSearchable
        placeholder="Select a country"
        formatOptionLabel={({ value, label }) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReactCountryFlag countryCode={value} svg />
            {label}
          </div>
        )}
      />
      {selectedCountry && (
        <div>
          <h3>Selected Country:</h3>
          <div>
            <ReactCountryFlag countryCode={selectedCountry.value} svg />
            {selectedCountry.label}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
