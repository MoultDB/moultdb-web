import React from 'react';
import './timeline.css';
import {Link} from "react-router-dom";

const items = [
    { title: "New web site", date: "September X, 2021", text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula..." },
    { title: "Start of SNF Sinergia grant on arthropod moulting", date: "March 4th, 2021", text:"Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin..." },
    { title: "Start of SNF Sinergia grant on arthropod moulting", date: "March 3rd, 2021", text:"Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin..." },
    { title: "Start of SNF Sinergia grant on arthropod moulting", date: "March 2nd, 2021", text:"Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin..." },
    { title: "Start of SNF Sinergia grant on arthropod moulting", date: "March 1st, 2021", text:"Curabitur purus sem, malesuada eu luctus eget, suscipit sed turpis. Nam pellentesque felis vitae justo accumsan, sed semper nisi sollicitudin..." }
];

export default function Timeline(props) {
    let formattedItems = [];
    let max = props.count ? props.count : items.length;
    for (let i = 0; i < max; i++) {
        formattedItems.push(
            <li key={i}>
                <span className="item-title">{items[i].title}</span> <span className="item-date">{items[i].date}</span>
                <p>{items[i].text}</p>
            </li>
        )
    }

    if (props.count < items.length) {
        formattedItems.push(
            <li key={props.count}>
                <Link to="/about/news">see more news</Link>
            </li>);
    }

    return (
        <ul className="timeline">
            {formattedItems}
        </ul>
    );
}