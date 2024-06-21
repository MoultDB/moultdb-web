import React from "react";
import {Link} from "react-router-dom";
import {getSpeciesLink} from "../../common/link-utils";

export const GeneData = ({ genes }) => {


    const renderGeneDetails = (gene) => {
        const geneAcc = gene.name ?? gene.id ?? gene.locusTag;
        return (
            <div key={`${geneAcc}`}>
                <Link to={"/gene/" +  (gene.id ? "id/" + gene.id : "locus-tag/" + gene.locusTag)}>{geneAcc}</Link>
            </div>
        );
    };

    const renderTable = (pathway) => {
        const taxa = Object.keys(genes[pathway]);
        const taxonCount = taxa.length;
        taxa.sort((a, b) => {
            const taxonA = JSON.parse(a);
            const taxonB = JSON.parse(b);
            return taxonA.scientificName.localeCompare(taxonB.scientificName)
            // return taxonA.path.localeCompare(taxonB.path)
        })

        const orthogroups = new Set();

        if (pathway !== "null") {
            taxa.forEach(taxon => {
                Object.keys(genes[pathway][taxon]).forEach(og => orthogroups.add(og));
            });
        }
        
        const sortedOrthogroups = Array.from(orthogroups).sort();

        return (
            <table key={pathway} className="simple-table">
                <thead>
                <tr>
                    <th>Species / Orthogroups</th>
                    {sortedOrthogroups.length > 0 ?
                        (sortedOrthogroups.map(ogKey => {
                            const og = JSON.parse(ogKey);
                            return (<th key={og.id}>
                                <Link to={"/orthogroup/" + og.id}>{og.name}</Link>
                            </th>);
                        }))
                        :
                        <th key={"og-null"}></th>
                    }
                </tr>
                </thead>
                <tbody>
                {taxa.map(taxonKey => {
                    const taxon = JSON.parse(taxonKey);
                    return (
                        <tr key={taxon.id}>
                            <td>{getSpeciesLink(taxon)}</td>
                            {sortedOrthogroups.length > 0 ?
                                (sortedOrthogroups.map(og =>
                                    <td key={pathway + ""+og}>
                                        {taxonCount > 1 && (genes[pathway][taxonKey][og] ? genes[pathway][taxonKey][og].length : 0)}
                                        {taxonCount === 1 && (genes[pathway][taxonKey][og]?.map(gene => renderGeneDetails(gene)) || '-')}
                                    </td>
                                ))
                                :
                                <td key={"og-null"}>{Object.values(genes[pathway][taxonKey]).map(t => t.map(gene => renderGeneDetails(gene)))}
                                </td>
                            }
                        </tr>
                    );
                })}
                </tbody>
            </table>
        );
    };

    return (
        <div>
            {genes && Object.keys(genes).map(pathwayKey => {
                const pathway = JSON.parse(pathwayKey);
                if (pathway) {
                    return (
                        <div key={pathway.id}>
                            <h3>Pathway&nbsp;
                                <Link to={"/pathway/" + pathway.id}>{pathway.name} ({pathway.id})</Link>
                            </h3>
                            {renderTable(pathwayKey)}
                        </div>)
                } 
                return (
                    <div key={"none"}>
                        <h3>Not involved in moulting pathway</h3>
                        {renderTable(pathwayKey)}
                    </div>
                );
            })}
        </div>
    );
}

export default GeneData;
