import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getMainLink} from "../../common/taxon-utils";

export const GeneData = ({ genes }) => {
    const [groupedGenes, setGroupedGenes] = useState(null);

    useEffect(() => {
        if (genes) {
            const newData = genes.reduce((acc, obj) => {
                const value = obj.taxon.path;
                if (!acc[value]) {
                    acc[value] = [];
                }
                obj.displayedName = obj.annotatedName ? obj.annotatedName : obj.name ? obj.name : obj.locusTag ;
                acc[value].push(obj);
                return acc;
            }, {})
            setGroupedGenes(newData);
        }
    }, [genes]);

    return (<div>
            { groupedGenes && Object.keys(groupedGenes).length > 0 &&
                <>
                    {Object.entries(groupedGenes).map(([taxonPath, genes]) => (
                        <div key={taxonPath}>
                            <strong>{getMainLink(genes[0].taxon)}</strong>:
                            <ul className="xref">
                                {genes.map((gene, index) => (
                                    <li key={gene.id}>
                                        {gene.displayedName} (<Link to="/gene/">{gene.id ? gene.id : gene.locusTag}</Link>)
                                        {index < genes.length - 1 && '; '}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </>
            }
            { groupedGenes && Object.keys(groupedGenes).length === 0 && <div>No genes</div>}
            { !groupedGenes && <div>No data</div>}
        </div>
    )
}

export default GeneData;
