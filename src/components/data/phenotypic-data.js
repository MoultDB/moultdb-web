import React, {useEffect, useState}  from "react";
import MoultingCharacters from "./moulting-characters";
import MoultdbService from "../../services/moultdb.service";

export const PhenotypicData = (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            MoultdbService.getTaxAnnotationsByTaxonPath(props.taxonPath)
                .then(response => {
                    if (response.data) {
                        setData((prevData) => ({
                            ...prevData,
                            content: response.data.data
                        }));
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during moulting characters upload :', error);
                    setError('An error has occurred during moulting characters upload.');
                    setData(null);
                });
        }

        fetchData();
    }, [props.taxonPath]);

    return (<div>
            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { data && data.content && data.content.length > 0 ?
                <MoultingCharacters mcData={data.content}/>
                : <div>No data</div> }
        </div>
    )
}

export default PhenotypicData;
