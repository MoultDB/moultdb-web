import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import MoultdbService from "../../services/moultdb.service";
import {getMainLink} from "../../common/taxon-utils";

export const GeneData = (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            MoultdbService.getMoultingGenesByTaxonPath(props.taxonPath)
                .then(response => {
                    if (response.data) {
                        const newData = response.data.data.reduce((acc, obj) => {
                            const value = obj.taxon.path;
                            if (!acc[value]) {
                                acc[value] = [];
                            }
                            acc[value].push(obj);
                            return acc;
                        }, {})
                        
                        setData((prevData) => ({
                            ...prevData,
                            content: newData
                        }));
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during genes upload :', error);
                    setError('An error has occurred during genes upload.');
                    setData(null);
                });
        }
        fetchData();
    }, [props.taxonPath]);

    return (<div>
            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { data && data.content && Object.keys(data.content).length > 0 &&
                <>
                    {Object.entries(data.content).map(([taxonPath, genes]) => (
                        <div key={taxonPath}>
                            <strong>{getMainLink(genes[0].taxon)}</strong>:
                            <ul class="xref">
                                {genes.map((gene) => (
                                    <li key={gene.id}>
                                        <Link to="/gene/">
                                            {gene.annotatedName? gene.annotatedName: gene.name? gene.name : gene.locusTag}
                                        </Link>
                                    </li>
                                    ))}
                            </ul>
                        </div>
                    ))}
                </>
            }
            {data && data.content && Object.keys(data.content).length === 0 && <div>No data</div>}
        </div>
    )
}

export default GeneData;
