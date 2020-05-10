import React, { Component } from 'react';
import { Pie } from "react-chartjs-2";

class Chart extends Component {
    render() {
        const { countries } = this.props;

        if (countries.length === 0) return <div></div>;
        const data ={
        labels: countries.map((country) => country.name),
        datasets: [
            {
                data: countries.map((country) => country.total),
                backgroundColor: colors,
            },
        ],
        };

        return ( 
        <div>
            <Pie
             data={data}
             width={100} 
             height={200} 
             options={{ maintainAspectRatio: false }}
            ></Pie>
        </div>
        );
    }
}

export default Chart;

let colors = [
"#63b598",
"#ce7d78",
"#ea9e70",
"#a48a9e",
"#c6e1e8",
"#648177",
"#0d5ac1",
"#1a8011",
"#436a9f",
"#1a806a",
"#4cf09d",
"#c188a2",
"#67eb4b",
"#b308d3",
"#fc7e41",
"#af3101",
"#ff065",
"#71b1f4",
"#a2f8a5",
"#e23dd0",
"#d3486d",
"#00f7f9",
"#47486d",
"#3cec35",
"#1c65cb",
"#5d1d0c",
"#2d7d2a",
"#ff3420",
"#f205e6",
"#1c0365",
"#14a9ad",
"#4ca2f9",
"#a4e43f",
"#d298e2",
"#86e98f",
"#ae90e2",
"#1a806b",
"#436a9e",
"#0ec0ff",
"#f812b3",
"#b17fc9",
"#8d6c2f",
"#d3277a",
"#2ca1ae",
"#9685eb",
"#8a96c6",
"#dba2e6",
"#76fc1b",
"#608fa4",
"#20f6ba",
"#07d7f6",
"#dce77a",
"#77ecca",

];















