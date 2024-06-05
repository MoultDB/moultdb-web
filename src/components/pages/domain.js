import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import GeneData from "../data/gene-data";
import {getInterproDomainLink} from "../../common/link-utils";

const Domain = () => {
    const [domain, setDomain] = useState(null);
    const [genes, setGenes] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await MoultdbService.getDomain(params.domainId);
            const responseData = response.data.data;
            setDomain(responseData);

            if (responseData) {
                await MoultdbService.getGenesByDomain(params.domainId)
                    .then(response => {
                        if (response?.data?.data) {
                            setGenes(response.data.data);
                        }
                    })
                    .catch(error => {
                        console.error('An error has occurred during domain genes upload :', error);
                        setError('An error has occurred during domain genes upload.');
                        setGenes(null);
                    });
            }
        }
        fetchData();
    }, [params.domainId]);

    return (
        <main className={"container "}>
            <ChangePageTitle pageTitle={`Domain: ${domain ? domain.description : params.domainId}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Domain: {domain ? domain.description + " (" + domain.id + ")" : params.domainId}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { domain ?
                <div className="row">
                    <div className="col-md-12">
                        <h2>General information</h2>
                        <div className="key-value-pair">
                            <span className="key">Domain description</span>
                            <span className="value">{domain.description}</span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Interpro link</span>
                            <span className="value">{getInterproDomainLink(domain.id)}</span>
                        </div>

                        <h2>Gene(s) matching this domain</h2>
                        <GeneData genes={genes}/>
                    </div>
                </div>
                : <div>Unknown domain</div>}
        </main>
    );
};

export default Domain;
