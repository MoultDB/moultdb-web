import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Genes from "../data/genes";
import Loading from "../data/loading";

function displayArticle(article) {
    if (article) {
        const v = article.dbXrefs.map((element, index) => (
            <div key={"a-" + index}>
                {element.dataSource.shortName}:&nbsp;
                {element.xrefURL && <a href={element.xrefURL} rel="noopener noreferrer" target="_blank">{element.accession}</a>}
                {!element.xrefURL && <div>{element.accession}</div>}
                {index < article.dbXrefs.length - 1 && ', '}
            </div>
        ));
        return (
            <div className="key-value-pair">
                <span className="key">Reference</span>
                <span className="value">{article.citation} {v}</span>
            </div>);
    }
    return <></>;
}

const Pathway = () => {
    const [pathway, setPathway] = useState(null);
    const [genes, setGenes] = useState(null);
    const [geneLoading, setGeneLoading] = useState(true);
    const [error, setError] = useState(false);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await MoultdbService.getPathway(params.pathwayId);
            const responseData = response.data.data;
            setPathway(responseData);

            if (responseData) {
                setGeneLoading(true);
                await MoultdbService.getGenesByPathway(params.pathwayId)
                    .then(response => {
                        if (response?.data?.data) {
                            setGenes(response.data.data);
                        }
                        setGeneLoading(false);
                    })
                    .catch(error => {
                        console.error('An error has occurred during pathway genes upload :', error);
                        setError('An error has occurred during pathway genes upload.');
                        setGenes(null);
                        setGeneLoading(false);
                    });
            }
        }
        fetchData();
    }, [params.pathwayId]);

    return (
        <main className={"container"}>
            <ChangePageTitle pageTitle={`Pathway: ${pathway ? pathway.name : params.pathwayId}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Pathway: {pathway ? pathway.name + " (" + pathway.id + ")" : params.pathwayId}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { pathway ?
                <div className="row">
                    <div className="col-md-12">
                        <h2>General information</h2>
                        <div className="key-value-pair">
                            <span className="key">Pathway name</span>
                            <span className="value">{pathway.name}</span>
                        </div>
                        {pathway.description &&
                            <div className="key-value-pair">
                                <span className="key">Pathway description</span>
                                <span className="value">{pathway.description}</span>
                            </div>
                        }
                        {displayArticle(pathway.article)}

                        <h2>Gene(s) involved in a moulting pathway</h2>
                        { geneLoading ? <Loading /> : <Genes genes={genes} startExpanded={false} /> }
                    </div>
                </div>
                : <div>Unknown pathway</div> }
        </main>
    );
};

export default Pathway;
