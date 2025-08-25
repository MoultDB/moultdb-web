import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Genes from "../data/genes";
import Loading from "../data/loading";
import './pathway.css'

const Article = ({ article }) => {
    if (article) {
        const xref = article.dbXrefs.map((element, index) => (
            <span  key={index}>
                {element.dataSource.shortName}:&nbsp;
                {element.xrefURL && <a href={element.xrefURL} rel="noopener noreferrer" target="_blank">{element.accession}</a>}
                {!element.xrefURL && <div>{element.accession}</div>}
                {index < article.dbXrefs.length - 1 && ', '}
            </span>
        ));
        return (
            <div className="key-value-pair">
                <span className="key">Reference</span>
                <span className="value">{article.citation} {xref}</span>
            </div>);
    }
    return <></>;
};

const Figures = ({ figureIds }) => {
    if (figureIds && figureIds.length > 0) {
        return (
            <div className="key-value-pair">
                <span className="key">Figure{figureIds.length > 1 && "s"}</span>
                <span className="value">
                    <div className={"row"}>
                        {figureIds.map((figureId) => (
                            <ImageWithModal figureId={figureId}/>
                        ))}
                    </div>
                </span>
            </div>
        );
    }
    return <></>;
};

const ImageWithModal = ({ figureId }) => {
    const [show, setShow] = useState(false);
    const [imageError, setImageError] = useState(false);

    const imgPath = `/pathways/fig${figureId}.jpg`;

    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div key={figureId} className="col-md-4 col-sm-6 col-12 mb-3">
            <figure className="text-center">
                {!imageError ? (
                        <>
                            <span className={"pathway-figure"}>
                                <img src={imgPath} alt={`Figure ${figureId}`} className="img-fluid"
                                     onClick={() => setShow(true)} onError={handleImageError} />
                            </span>
                            {show && (
                                <>
                                    <div className="modal-backdrop show"></div>
                                    <div className="modal show d-block" tabIndex="-1" onClick={() => setShow(false)}>
                                        <div className="modal-dialog modal-dialog-centered modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-body text-center">
                                                    <img src={imgPath} alt={`Figure ${figureId}`} className="img-fluid"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </>
                ) : (
                    <div className="error-message">
                    <p>Error loading image. Please try again later.</p>
                        </div>
                    )}
            </figure>
        </div>
    );
};

const Pathway = () => {
    const [pathway, setPathway] = useState(null);
    const [genesByPathwayTaxonOrthogroup, setGenesByPathwayTaxonOrthogroup] = useState(null);
    const [genesURL, setGenesURL] = useState()
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
                setGenesURL(MoultdbService.getGenesByPathwayURL(params.pathwayId));
                await MoultdbService.getGenesByPathway(params.pathwayId)
                    .then(response => {
                        if (response?.data?.data) {
                            setGenesByPathwayTaxonOrthogroup(response.data.data);
                        }
                        setGeneLoading(false);
                    })
                    .catch(error => {
                        console.error('An error has occurred during pathway genes upload :', error);
                        setError('An error has occurred during pathway genes upload.');
                        setGenesByPathwayTaxonOrthogroup(null);
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
                        <Article article={pathway.article} />
                        <Figures figureIds={pathway.figureIds} />

                        <h2>Gene(s) involved in a moulting pathway</h2>
                        { geneLoading ?
                            <Loading />
                            :
                            <Genes genesByPathwayTaxonOrthogroup={genesByPathwayTaxonOrthogroup}
                                   startExpanded={false} dataURL={genesURL}/>
                        }
                    </div>
                </div>
                :
                <div>Unknown pathway</div>
            }
        </main>
    );
};

export default Pathway;
