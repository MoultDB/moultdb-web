import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { Tree } from "react-arborist";
import MoultdbService from "../../services/moultdb.service";
import { getSpeciesLink, getSpeciesUrlFromAccession } from "../../common/link-utils";

const dataSource =
    {
        "data": [
            {
                "id": "01",
                "name": "Arthropoda",
                "speciesCount": "As",
                "genomeCount": "Ag",
                "mcCount": "Amc",
                "children": [
                    {
                        "id": "01-01",
                        "name": "Chelicerata",
                        "speciesCount": "Cs",
                        "genomeCount": "38",
                        "mcCount": "17",
                        "children": [
                            {
                                "id": "01-01-01",
                                "name": "Arachnida",
                                "speciesCount": "Ars",
                                "genomeCount": "36",
                                "mcCount": "11",
                                "children": [
                                    {
                                        "id": "02-02-01",
                                        "name": "Arachnida 1",
                                        "genomeCount": "1",
                                        "mcCount": "11",
                                    },
                                    {
                                        "id": "02-02-02",
                                        "name": "Arachnida 2",
                                        "genomeCount": "1",
                                        "mcCount": "0",
                                    }
                                ]
                            },
                            {
                                "id": "01-01-02",
                                "name": "Merostomata ",
                                "genomeCount": "Mg",
                                "mcCount": "Mmc",
                            }
                        ]
                    },
                    {
                        "id": "01-02",
                        "name": "Mandibulata",
                        "speciesCount": "Mas",
                        "genomeCount": "4",
                        "mcCount": "8",
                        "children": [
                            {
                                "id": "01-02-01",
                                "name": "Mandibulata 1",
                                "genomeCount": "1",
                                "mcCount": "3",
                            },
                            {
                                "id": "01-02-02",
                                "name": "Mandibulata 2",
                                "genomeCount": "0",
                                "mcCount": "5",
                            }
                        ]
                    }
                ]
            }
        ]
    };

const Node = ({ node, style }) => {
    return (
        <div className="node-container" style={style} >
            <div className="node-content" onClick={() => node.isInternal && node.toggle()} >
                {!node.isLeaf &&
                    <span >{node.isOpen ? "v" : ">"}</span>
                }
                <span className="node-text"> {node.data.name}</span>
                <span className="node-counts" style={{color: 'gray', fontSize: '10px', marginLeft: '10px'}}>
                    (
                    {!node.isLeaf &&
                        <>{node.data.speciesCount} species, </>
                    }
                    {node.data.genomeCount} genomes, {node.data.mcCount} moult. charac.)
                </span>
                <Link to={getSpeciesUrlFromAccession(node.data.id)} className="node-link"
                      style={{fontSize: '10px', marginLeft: '5px'}}>
                    see details
                </Link>
            </div>
        </div>
    );
};

export default function TreeComponent() {
    const [treeData, setTreeData] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         // const response = await MoultdbService.getTaxonDirectChildren('1');
    //         // const root = response?.data?.data;
    //         // if (root) {
    //         //     setTreeData([root]);
    //         // }
    //         setTreeData(dataSource?.data);
    //     }
    //     fetchData()
    // }, []);

    return (
        <main id={"taxonomy-page"} className={"container"}>
            <Tree
                data={dataSource.data}
                // // loadChildren={async (node) => {
                // //     const response = await MoultdbService.getTaxonDirectChildren(node.id);
                // //     return response?.data?.data?.children;
                // // }}
                width={'100%'}
                openByDefault={true}
                disableDrag
            >
                {Node}

            </Tree>
        </main>
    );
}

