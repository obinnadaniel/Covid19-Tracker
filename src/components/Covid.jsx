import React, { Component } from "react";
import Loading from "./Loading";
import axios from "axios";
import CountryTable from "./CountryTable";
import Chart from "./Chart";

class Covid extends Component {
    state = {
        countries:[],
        allCountryTotal: 0,
        selectedCountries: [],
    };

url=
"";

async componentDidMount() {
const response = await axios.get(this.url);
const rows = response.data.split("\n");

const countries = [];
let allCountryTotal = 0;

for (let i = 1; i < rows.length; i++) {
    const row = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/); 
    const countryName = row[0].replace(/"/g, "");
    const total = Number(row[4]);
    if (countryName !== "") {
    countries.push({
       name: countryName,
       total: total, 
    });
    allCountryTotal += total;
    }
}
await new Promise((x)=>setTimeout(x, 500));
this.setState({ countries, allCountryTotal });
}
handleOnRowSelected = (countryToUpdate) => {
const countries = [...this.state.countries];

const countryIndex = countries.findIndex(
  (c)=>c.name === countryToUpdate.name  
);

const country = {
    name: countryToUpdate.name,
    total: countryToUpdate.total,
    selected: !countryToUpdate.selected,
};

countries[countryIndex] = country;

this.setState({ countries, selectedCountries: countries.filter((c)=>c.selected),
});
};

sortByTotal = (countryA, countryB) => {
    if (countryB.total > countryA.total) return 1;
    else if (countryB.total < countryA.total) return -1;
    else return 0;

};

handleOnSortByTotal = (event) => {
    this.handleOnSortBy(event, this.sortByTotal);
};

sortByCountryName = (countryA, countryB) => {
    if (countryA.name > countryB.name) return 1;
    else if (countryA.name < countryB.name) return -1;
    else return 0;

};
handleOnSortByCountryName = (event) => {
this.handleOnSortBy(event, this.sortByCountryName);

};

handleOnSortBy = (event, sortOperation ) => {
    event.preventDefault();
    const countries = [...this.state.countries];
    countries.sort(sortOperation);
    this.setState({ countries });
};

numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

    render() {
        const { countries, allCountryTotal, selectedCountries } = this.state;
        return ( 
            <div>
                <h1 style={{ textAlign: "center" }}>
                    All Country Total: {this.numberWithCommas(allCountryTotal)}
                </h1>
                {allCountryTotal === 0 ? (
                <Loading />
                 ) : (
                     <div>
                     <Chart countries={selectedCountries} />
                     <CountryTable
                 countries={countries} 
                 onSortByTotal={this.handleOnSortByTotal} 
                 onSortByCountryName={this.handleOnSortByCountryName}
                 onRowSelected={this.handleOnRowSelected}
                 />
                 </div>
                 )}
            </div>
        );
    }
}

export default Covid;
