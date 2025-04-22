import React, {useState} from "react";
import {Link} from "react-router-dom";
import {getSpeciesUrl} from "../../common/link-utils";

const GenesCell = ({ genes, isExpanded }) => {

    const expandContent = genes?.reduce((r, g, pos) => {
        r.push(
            <span className="display-8" key={g.id ?? g.locusTag}>
                <Link to={"/gene/" +  (g.id ? "id/" + g.id : "locus-tag/" + g.locusTag)}>{g.name ?? g.id ?? g.locusTag}</Link>
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

const GenesRow = ({ taxon, sortedOrthogroups, genes, pathway, startExpanded }) => {

    const [isExpanded, setIsExpanded] = useState(startExpanded);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };
    
    const keyPrefix = (pathway? pathway.id : "pnull-") + taxon.id;
    
    return (
        <tr  className={"align-top"}>
            <th>
                <button onClick={toggleExpansion}>
                    {isExpanded ? <span className="close-row"></span> : <span className="open-row"></span>}
                </button>
            </th>
            <td>
                <a href={getSpeciesUrl(taxon)}>{taxon.scientificName}</a>
            </td>
            {sortedOrthogroups.length > 0 ?
                (sortedOrthogroups.map(og =>
                    <td key={keyPrefix + "-" + og}>
                        <GenesCell genes={genes[og]} isExpanded={isExpanded}/>
                    </td>
                ))
                :
                <td>
                     <GenesCell genes={Object.values(genes).flatMap(list => list)} isExpanded={isExpanded}/> 
                </td>
            }
        </tr>
    );
};

const GeneTable = ({ genes, pathway, startExpanded }) => {
    const taxa = Object.keys(genes);
    taxa.sort((a, b) => {
        const taxonA = JSON.parse(a);
        const taxonB = JSON.parse(b);
        return taxonA.scientificName.localeCompare(taxonB.scientificName)
    })

    const orthogroups = new Set();
    let tableKey = "pnull";
    if (pathway) {
        taxa.forEach(taxon => {
            Object.keys(genes[taxon]).forEach(og => orthogroups.add(og));
        });
        tableKey = pathway.id;
    }

    const sortedOrthogroups = Array.from(orthogroups).sort();

    return (
        <table key={tableKey} className="simple-table">
            <thead>
            <tr>
                <th></th>
                <th>Species / Orthogroups</th>
                {sortedOrthogroups.length > 0 ?
                    (sortedOrthogroups.map(ogKey => {
                        const og = JSON.parse(ogKey);
                        return (<th key={tableKey +"-" + og.id}><Link to={"/orthogroup/" + og.id}>{og.name}</Link></th>);
                    }))
                    :
                    <th></th>
                }
            </tr>
            </thead>
            <tbody>
            {taxa.map(taxonKey => {
                const taxon = JSON.parse(taxonKey);
                return (<GenesRow key={(pathway? pathway.id : "pnull-") + taxon.id} 
                                  taxon={taxon} sortedOrthogroups={sortedOrthogroups} genes={genes[taxonKey]}
                                  pathway={pathway} startExpanded={startExpanded} />
                );
            })}
            </tbody>
        </table>
    );
}

export const Genes = ({ genes, startExpanded}) => {

    return (
        <div>
            {genes && Object.keys(genes).map(pathwayKey => {
                const pathway = JSON.parse(pathwayKey);
                if (pathway) {
                    return (
                        <div key={pathway.id}>
                            <h3>Pathway <Link to={"/pathway/" + pathway.id}>{pathway.name} ({pathway.id})</Link></h3>
                            <GeneTable genes={genes[pathwayKey]} pathway={pathway} startExpanded={startExpanded} />
                        </div>)
                } 
                return (
                    <div key={"none"}>
                        <h3>Not involved in moulting pathway</h3>
                        <GeneTable genes={genes[pathwayKey]} startExpanded={startExpanded} />
                    </div>
                );
            })}
        </div>
    );
}

export default Genes;
