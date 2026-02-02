import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Genes from "../data/genes";
import Loading from "../data/loading";

const Orthogroup = () => {
    const [orthogroup, setOrthogroup] = useState(null);
    const [orthogroupLoading, setOrthogroupLoading] = useState(true);
    const [geneLoading, setGeneLoading] = useState(true);
    const [genesByPathwayTaxonOrthogroup, setGenesByPathwayTaxonOrthogroup] = useState(null);
    const [genesURL, setGenesURL] = useState()
    const [error, setError] = useState(false);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setOrthogroupLoading(true);
            const response = await MoultdbService.getOrthogroup(params.orthogroupId);
            const responseData = response?.data?.data;
            setOrthogroup(responseData);
            setOrthogroupLoading(false);

            if (responseData) {
                setGeneLoading(true);
                setGenesURL(MoultdbService.getGenesByOrthogroupURL(params.orthogroupId));
                await MoultdbService.getGenesByOrthogroup(params.orthogroupId)
                    .then(response => {
                        setGenesByPathwayTaxonOrthogroup(response?.data?.data);
                        setGeneLoading(false);
                    })
                    .catch(error => {
                        console.error('An error has occurred during orthogroup genes upload :', error);
                        setError('An error has occurred during orthogroup genes upload.');
                        setGenesByPathwayTaxonOrthogroup(null);
                        setGenesURL(null);
                        setGeneLoading(false);
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
                    {orthogroup ?
                        <>
                            <h2>Genes included in this orthogroup</h2>
                            {genesByPathwayTaxonOrthogroup && Object.keys(genesByPathwayTaxonOrthogroup).length > 0 ?
                                <Genes genesByPathwayTaxonOrthogroup={genesByPathwayTaxonOrthogroup}
                                       startExpanded={true} dataURL={genesURL}/>
                                :
                                <>{geneLoading ? <Loading/> : <div>No data</div>}</>
                            }
                        </>
                        :
                        <>
                            {orthogroupLoading ?
                                <Loading/> 
                                :
                                <div className="alert alert-warning" role="alert">
                                    Orthogroup not found.<br/>
                                    Please check the orthogroup accession in the URL or go to the page <Link to={"/pathways/"}>
                                    Pathways</Link> to browse all orthogroups involved in moulting.
                                </div>
                            }
                        </>
                    }
                </div>
            </div>
        </main>
    );
};

export default Orthogroup;
