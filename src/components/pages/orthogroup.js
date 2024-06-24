import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Genes from "../data/genes";

const Orthogroup = () => {
    const [orthogroup, setOrthogroup] = useState(null);
    const [genes, setGenes] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            MoultdbService.getGenesByOrthogroup(params.orthogroupId)
                .then(response => {
                    setGenes(response.data?.data);
                    if (response.data) {
                        setOrthogroup(response.data.data);
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during orthogroup upload :', error);
                    setError('An error has occurred during orthogroup upload.');
                    setGenes(null);
                });
        }
        fetchData();
    }, [params.orthogroupId]);

    return (
        <main className={"container beta"}>
            <ChangePageTitle pageTitle={`Orthogroup: ${params.orthogroupId}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Orthogroup: {params.orthogroupId}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { orthogroup ?
                <div className="row">
                    <div className="col-md-12">
                        <h2>Genes included in this orthogroup</h2>
                        <Genes genes={genes}/>
                    </div>
                </div>
                : <div>Unknown orthogroup</div> }
        </main>
    );
};

export default Orthogroup;
