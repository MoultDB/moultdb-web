import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./taxonomy.css";
import ChangePageTitle from "../../common/change-page-title";

// Function to simulate the API call (replace with a real API call)
const fetchChildren = (nodeId) => {
    // Example: call to an API, here we simulate a response
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = {
                "beverages": [
                    { id: "water", label: "Water" },
                    { id: "coffee", label: "Coffee" },
                    { id: "tea", label: "Tea" },
                ],
                "tea": [
                    { id: "black_tea", label: "Black Tea" },
                    { id: "white_tea", label: "White Tea" },
                    { id: "green_tea", label: "Green Tea" },
                ],
                "green_tea": [
                    { id: "sencha", label: "Sencha" },
                    { id: "gyokuro", label: "Gyokuro" },
                    { id: "matcha", label: "Matcha" },
                    { id: "pi_lo_chun", label: "Pi Lo Chun" },
                ]
            };
            resolve(data[nodeId] || []);
        }, 500); // Simulated response time
    });
};

const TreeNode = ({ nodeId, label }) => {
    const [expanded, setExpanded] = useState(false);
    const [children, setChildren] = useState([]);

    const toggle = async () => {
        if (!expanded && children.length === 0) {
            // If the node is not yet extended, the children are retrieved via the API
            const fetchedChildren = await fetchChildren(nodeId);
            setChildren(fetchedChildren);
        }
        setExpanded(!expanded);
    };

    return (
        <li>
            <span className={`caret ${expanded ? "caret-down" : ""}`} onClick={toggle}>
                {label}
            </span>
            {children.length > 0 && (
                <ul className={`nested ${expanded ? "active" : ""}`}>
                    {children.map((child) => (
                        <TreeNode key={child.id} nodeId={child.id} label={child.label} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const Taxonomy = () => {
    return (
        <main id={"taxonomy-page"} className={"container"}>
            <ChangePageTitle pageTitle={`Taxonomy`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Taxonomy</h1>
                </div>
                <div className="col-2 pt-2 text-end"><Link to="/species/search">Taxon search</Link></div>
            </div>

            <ul id="myUL">
                <TreeNode nodeId="beverages" label="Beverages" />
            </ul>
        </main>
    );
};

export default Taxonomy;
