import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import {
    getNCBIGeneLink,
    getNCBIProteinLink,
    getNCBITranscriptLink,
    getSpeciesLink
} from "../../common/link-utils";
import GeneData from "../data/gene-data";


const Gene = () => {
    const [gene, setGene] = useState(null);
    const [orthologs, setOrthologs] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setGene(null);

            let response;

            if (params.type === "id") {
                response = await MoultdbService.getGeneByGeneId(params.id)
                    .catch(error => {
                        setError('An error has occurred during gene upload.');
                        setGene(null);
                    });
            } else if (params.type === "protein-id") {
                response = await MoultdbService.getGeneByProteinId(params.id)
                    .catch(error => {
                        setError('An error has occurred during gene upload.');
                        setGene(null);
                    });
            } else if (params.type === "locus-tag") {
                response = await MoultdbService.getGeneByLocusTag(params.id)
                    .catch(error => {
                        setError('An error has occurred during gene upload.');
                        setGene(null);
                    });
            } else {
                setError('Unknown ID type: ' + params.type);
                response = undefined;
            }
            const responseData = response?.data?.data;
            setGene(responseData);

            if (responseData?.orthogroup?.id) {
                await MoultdbService.getGenesByOrthogroup(responseData.orthogroup.id, responseData.proteinId)
                    .then(response => {
                        if (response?.data?.data) {
                            setOrthologs(response.data.data);
                        }
                    })
                    .catch(error => {
                        console.error('An error has occurred during orthologous genes upload :', error);
                        setError('An error has occurred during orthologous genes upload.');
                        setOrthologs(null);
                    });
            }
        }
        fetchData();
    }, [params.type, params.id]);

    const h1Text = gene ? <>: {gene.mainName} - <i>{gene.taxon.scientificName}</i></> : <>: {params.id}</>;
    return (
        <main className={"container beta"}>
            <ChangePageTitle pageTitle={`Gene: ${gene ? gene.mainName + " - " + gene.taxon.scientificName : params.id}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Gene{h1Text}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { !gene && !error && <div>Unknown gene</div>}
            { gene &&
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
                            <span className="value">{gene.orthogroup?.name ? <Link to={"/orthogroup/" + gene.orthogroup.id}>{gene.orthogroup.name}</Link>: "-"}</span>
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

                        {gene.geneDomains?.length > 0 &&
                            <>
                                <h2>Domain(s)</h2>
                                <table className="simple-table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Domain accession</th>
                                        <th scope="col">Domain description</th>
                                        <th scope="col">Start location</th>
                                        <th scope="col">End location</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {gene.geneDomains.map((domain, index) => (
                                        <tr key={"domain-" + index}>
                                            <td><Link to={"/domain/" + domain.domain.id}>{domain.domain.id}</Link></td>
                                            <td>{domain.domain.description} </td>
                                            <td>{domain.start}</td>
                                            <td>{domain.end}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </>}

                        {orthologs &&
                            <>
                                <h2>Ortholog(s)</h2>
                                <GeneData genes={orthologs}/>
                            </>
                        }
                    </div>
                </div>
            }
        </main>
    );
};

export default Gene;
