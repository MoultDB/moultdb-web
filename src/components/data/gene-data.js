import React from "react";
import {Link} from "react-router-dom";
import {getSpeciesLink} from "../../common/link-utils";
import './gene-data.css'

export const GeneData = ({ genes }) => {


    const renderGeneDetails = (gene) => {
        const geneAcc = gene.id ? gene.id : gene.locusTag;
        return (
            <div key={`${geneAcc}`}>
                <Link to={"/gene/" +  (gene.id ? "id/" + gene.id : "locus-tag/" + gene.locusTag)}>{geneAcc}</Link>
            </div>
        );
    };

    const renderTable = (pathway) => {
        const taxa = Object.keys(genes[pathway]);
        const orthogroups = new Set();

        taxa.forEach(taxon => {
            Object.keys(genes[pathway][taxon]).forEach(og => orthogroups.add(og));
        });

        const sortedOrthogroups = Array.from(orthogroups).sort();

        return (
            <table key={pathway} className="gene-data-table">
                <thead>
                <tr>
                    <th>Species / Orthogroups</th>
                    {sortedOrthogroups.map(og => <th key={og}><Link to={"/orthogroup/" + og}>{og}</Link></th>)}
                </tr>
                </thead>
                <tbody>
                {taxa.map(taxonKey => {
                    const taxon = JSON.parse(taxonKey);

                    return (
                        <tr key={taxon.id}>
                            <td>{getSpeciesLink(taxon)}</td>
                            {sortedOrthogroups?.map(og =>
                                <td key={pathway + ""+og}>
                                    {genes[pathway][taxonKey][og]?.map(gene => renderGeneDetails(gene)) || '-'}
                                </td>
                            )}
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
                            <h3>Pathway:
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
