import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import {
    getInterproDomainLink,
    getNCBIGeneLink,
    getNCBIProteinLink,
    getNCBITranscriptLink,
    getSpeciesLink
} from "../../common/link-utils";


const Gene = () => {
    const [gene, setGene] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            MoultdbService.getGene(params.proteinId)
                .then(response => {
                    if (response.data) {
                        setGene(response.data.data);
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during moulting characters upload :', error);
                    setError('An error has occurred during moulting characters upload.');
                    setGene(null);
                });
        }
        fetchData();
    }, [params.proteinId]);

    const h1Text = gene ? <>{gene.displayedName} - <i>{gene.taxon.scientificName}</i></> : params.proteinId;
    return (
        <main className={"container "}>
            <ChangePageTitle pageTitle={`${gene ? gene.displayedName : params.proteinId}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Gene: {h1Text}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { gene ?
                <div className="row">
                    <div className="col-md-12">
                        <h2>General information</h2>
                        <div className="key-value-pair">
                            <span className="key">Gene</span>
                            <span className="value">
                                {getNCBIGeneLink(gene)}
                                {gene.id && gene.locusTag && <>(locus tag: {gene.locusTag})</>}
                                {!gene.id && gene.locusTag && gene.name && <>{gene.name} (locus
                                    tag: {gene.locusTag})</>}
                                {!gene.id && gene.locusTag && !gene.name && <>Locus tag: {gene.locusTag}</>}
                            </span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Transcript</span>
                            <span className="value">{getNCBITranscriptLink(gene)}</span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Protein</span>
                            <span className="value">
                                {getNCBIProteinLink(gene)} {gene.proteinDescription} (length: {gene.proteinLength})</span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Species</span>
                            <span className="value">{getSpeciesLink(gene.taxon)}</span>
                        </div>

                        <h2>Moulting information</h2>

                        <div className="key-value-pair">
                            <span className="key">Moulting orthogroup name</span>
                            <span className="value">{gene.orthogroupName ? gene.orthogroupName : "-"}</span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Pathway</span>
                            <span className="value">
                                {gene.pathway ?
                                    <Link
                                        to={"/pathway/" + gene.pathway.id}>{gene.pathway.name} ({gene.pathway.id})</Link>
                                    : "-"}
                            </span>
                        </div>

                        {gene.geneDomains && gene.geneDomains.length > 0 &&
                            <>
                                <h2>Domain(s)</h2>
                                <ul>
                                    {gene.geneDomains.map((domain, index) => (
                                        <li key={"domain-" + index}>
                                            {getInterproDomainLink(domain)} - {domain.start} - {domain.end}
                                        </li>))
                                    }
                                </ul>
                            </>}
                    </div>
                </div>
                : <div>Unknown gene</div>}
        </main>
    );
};

export default Gene;
