import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Genes from "../data/genes";
import Loading from "../data/loading";

const Orthogroup = () => {
    const [orthogroup, setOrthogroup] = useState(null);
    const [orthogroupLoading, setOrthogroupLoading] = useState(true);
    const [genes, setGenes] = useState(null);
    const [error, setError] = useState(false);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await MoultdbService.getOrthogroup(params.orthogroupId);
            const responseData = response?.data?.data;
            setOrthogroup(responseData);

            if (responseData) {
                setOrthogroupLoading(true);
                await MoultdbService.getGenesByOrthogroup(params.orthogroupId)
                    .then(response => {
                        setGenes(response?.data?.data);
                        setOrthogroupLoading(false);
                    })
                    .catch(error => {
                        console.error('An error has occurred during orthogroup genes upload :', error);
                        setError('An error has occurred during orthogroup genes upload.');
                        setGenes(null);
                        setOrthogroupLoading(false);
                    });
            }
        }
        fetchData();
    }, [params.orthogroupId]);

    return (
        <main className={"container"}>
            <ChangePageTitle pageTitle={`Orthogroup: ${params.orthogroupId}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Orthogroup: {orthogroup?.name ? orthogroup.name : params.orthogroupId}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }

            <div className="row">
                <div className="col-md-12">
                    {!orthogroup && <div className={"container alert alert-danger"} role="alert">Unknown orthogroup</div>}
                    {orthogroup &&
                        <>
                            <h2>Genes included in this orthogroup</h2>
                            {genes && Object.keys(genes).length > 0 ?
                                <Genes genes={genes} startExpanded={true}/>
                                :
                                <>{orthogroupLoading ? <Loading/> : <div>Unknown genes</div>} </>
                            }
                        </>
                    }
                </div>
            </div>
        </main>
    );
};

export default Orthogroup;
