import React, {useEffect, useState}  from "react";
import MoultdbService from "../../services/moultdb.service";
import Genomes from "./genomes";


export const GenomeData = (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            MoultdbService.getGenomesByTaxonPath(props.taxonPath)
                .then(response => {
                    if (response.data) {
                        setData((prevData) => ({
                            ...prevData,
                            content: response.data.data
                        }));
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during genome upload :', error);
                    setError('An error has occurred during genome upload.');
                    setData(null);
                });
        }

        fetchData();
    }, [props.taxonPath]);

    return (<div>
            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { data && data.content?.length > 0 ?
                <Genomes genomeData={data.content}/>
                : <div>No data</div> }
        </div>
    )
}

export default GenomeData;
