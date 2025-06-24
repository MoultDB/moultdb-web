import React, {useEffect, useState}  from "react";
import MoultingCharacters from "./moulting-characters";
import MoultdbService from "../../services/moultdb.service";
import Loading from "./loading";

export const PhenotypicData = (props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);
            MoultdbService.getTaxAnnotationsByTaxonPath(props.taxonPath)
                .then(response => {
                    if (response.data) {
                        setData((prevData) => ({
                            ...prevData,
                            content: response.data.data
                        }));
                    }
                    setLoading(false)
                })
                .catch(error => {
                    console.error('An error has occurred during moulting characters upload :', error);
                    setError('An error has occurred during moulting characters upload.');
                    setData(null);
                    setLoading(false)
                });
        }
        fetchData();
    }, [props.taxonPath]);

    return (<div>
            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { data && data.content?.length > 0 ?
                <MoultingCharacters mcData={data.content}/>
                :
                <div>{ loading ? <Loading/> : <div>No data</div> } </div> }
        </div>
    )
}

export default PhenotypicData;
