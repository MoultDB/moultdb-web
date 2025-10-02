import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getTaxonUrl } from "../../common/link-utils";
import { DownloadJsonButton } from "./download-json-button";

const GenesCell = ({ genes, isExpanded }) => {

    const expandContent = genes?.sort((a, b) => {
        const labelA = a.name || a.id || a.locusTag;
        const labelB = b.name || b.id || b.locusTag;
        return labelA.localeCompare(labelB);
    })
        .reduce((r, g, pos) => {
            r.push(
                <span className="display-8" key={g.id ?? g.locusTag}>
                    <Link to={"/gene/" + (g.id ? "id/" + g.id : "locus-tag/" + g.locusTag)}>{g.name || g.id || g.locusTag}</Link>
                    {pos < genes.length && <br />}
                </span>
            );
            return r;
        }, []);

    if (!genes) {
        return (<>0 gene</>);
    }
    return (
        <div>
            <span>{genes.length} gene{genes.length > 1 && "s"}</span>
            {isExpanded && <div className="expand-content">{expandContent}</div>}
        </div>
    );
};

const GenesRow = ({ taxon, allOrthogroups, genesByOrthogroup, pathway, startExpanded }) => {

    const [isExpanded, setIsExpanded] = useState(startExpanded);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    
    const keyPrefix = (pathway? pathway.id : "pnull") + "-" + taxon.id;
    
    return (
        <tr  className={"align-top"}>
            <th>
                <button onClick={toggleExpansion}>
                    {isExpanded ? <span className="close-row"></span> : <span className="open-row"></span>}
                </button>
            </th>
            <td>
                <a href={getTaxonUrl(taxon)}>{taxon.scientificName}</a>
            </td>
            
            {allOrthogroups?.length > 0 ?
                allOrthogroups.map((ao) => {
                    const matchingOrthogroup = genesByOrthogroup.find(o => o.id === ao.id);
                    return (
                        <td key={keyPrefix + "-" + ao.id}>
                            <GenesCell genes={matchingOrthogroup?.genes} isExpanded={isExpanded}/>
                        </td>
                    );
                })
                :
                <td key={keyPrefix}>
                    <GenesCell genes={genesByOrthogroup.map(genes => genes.genes).flatMap(list => list)} isExpanded={isExpanded}/>
                </td>
            }
        </tr>
    );
};

const GeneTable = ({ genesByTaxonOrthogroup, pathway, startExpanded }) => {

    let tableKey = "pnull";
    let allOrthogroups = [];
    if (pathway) {
        tableKey = pathway.id;
        // Remove duplicates and order by name
        allOrthogroups = Array.from(
            new Map(genesByTaxonOrthogroup
                .flatMap(taxon => taxon.orthogroups)
                .map(({ id, name }) => [`${name}`, { id, name }])
            ).values()
        ).sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
    }

    return (
        <table key={tableKey} className="simple-table">
            <thead>
            <tr>
                <th></th>
                <th>Species {pathway ? "/ Orthogroups" : ""}</th>
                {allOrthogroups.length > 0 ?
                    (allOrthogroups.map(og => {
                        return (<th key={tableKey + "-" + og.id}><Link to={"/orthogroup/" + og.id}>{og.name}</Link></th>);
                    }))
                    :
                    <th>Genes</th>
                }
            </tr>
            </thead>
            <tbody>
            {genesByTaxonOrthogroup.map(taxon => {
                return (<GenesRow key={tableKey + "-" + taxon.id}
                                  taxon={taxon}
                                  allOrthogroups={allOrthogroups}
                                  genesByOrthogroup={taxon.orthogroups}
                                  pathway={pathway} startExpanded={startExpanded} />
                );
            })}
            </tbody>
        </table>
    );
}

export const Genes = ({ genesByPathwayTaxonOrthogroup, startExpanded, dataURL}) => {

    return (
        <div>
            {dataURL && <DownloadJsonButton apiUrl={dataURL} />}
            {genesByPathwayTaxonOrthogroup && genesByPathwayTaxonOrthogroup.map(pathway => {
                if (pathway.id !== "NOT_IN_MOULTING_PATHWAY") {
                    return (
                        <div key={pathway.id}>
                            <h3>Pathway <Link to={"/pathway/" + pathway.id}>{pathway.name} ({pathway.id})</Link></h3>
                            <GeneTable genesByTaxonOrthogroup={pathway.taxa} pathway={pathway} startExpanded={startExpanded} />
                        </div>)
                } 
                return (
                    <div key={"none"}>
                        <h3>Not involved in moulting pathway</h3>
                        <GeneTable genesByTaxonOrthogroup={pathway.taxa} startExpanded={startExpanded} />
                    </div>
                );
            })}
        </div>
    );
}

export default Genes;
