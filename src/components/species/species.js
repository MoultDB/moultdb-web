import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import './species.css';
import {getMainUrl} from "../../common/taxon-utils";
import ChangePageTitle from "../../common/change-page-title";
import PhenotypicData from "../data/phenotypic-data";
import MoultdbService from "../../services/moultdb.service";
import GenomeData from "../data/genome-data";


function getXrefUl(taxon) {
    return <ul className="xref">
        {taxon.dbXrefs
            .filter(element => element.accession !== null)
            .sort((a, b) => {
                // Compare by data source names (string)
                const comparisonByName = a.dataSource.name.localeCompare(b.dataSource.name);
                // If names are equals, compare by accession (integer)
                return comparisonByName !== 0 ? comparisonByName : a.accession - b.accession;
            })
            .map((element, index) => (
                <li key={index}>
                    {element.dataSource.name}: <a href={element.xrefURL} rel="noopener noreferrer" target="_blank">
                    {element.accession}</a>
                </li>
            ))}
    </ul>;
}

const Species = () => {
    const [taxon, setTaxon] = useState(null);
    const [lineage, setLineage] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await MoultdbService.getTaxonByDbXref(params.datasource, params.accession);
            const responseData = response.data.data;
            setTaxon(responseData);

            if (responseData) {
                await MoultdbService.getTaxonLineage(responseData.path)
                    .then(response => {
                        if (response.data) {
                            setLineage(response.data.data);
                        }
                    })
                    .catch(error => {
                        console.error('An error has occurred during taxon lineage upload :', error);
                        setError('An error has occurred during taxon lineage upload.');
                        setLineage(null);
                    });
            }
        }
        fetchData();
    }, []); // empty table [] means that this effect is executed only once when the component is assembled.

    return (
        <main className={"container "}>
            <ChangePageTitle pageTitle={`${taxon ? taxon.scientificName : params.datasource + ":" + params.accession}`} />
            <div className="row">
                <div className="col-md-12">
                    <h1>Taxon: {taxon ? taxon.scientificName : params.datasource + ":" + params.accession}</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { taxon ?
                <div className="row">
                    <div className="col-md-12">
                        <h2>General information</h2>
                        <div className="key-value-pair">
                            <span className="key">Scientific name</span> <span
                            className="value">{taxon.scientificName}</span>
                        </div>
                        <div className="key-value-pair">
                            <span className="key">Cross-reference(s)</span>
                            <span className="value">{getXrefUl(taxon)}</span>
                        </div>
                        {lineage &&
                            <div className="key-value-pair">
                                <span className="key">Lineage</span>
                                <span className="value">
                                    <ol className="lineage">
                                        {lineage.map((element, index) => (
                                            <li key={index}>
                                                {/*TODO replace <a> by <Link to={getMainUrl(element)} >{element.scientificName}</Link>*/}
                                                <a href={getMainUrl(element)}>{element.scientificName}</a>
                                                {index < lineage.length - 1 && <span className="separator"/>}
                                            </li>))}
                                    </ol>
                                </span>
                            </div>
                        }

                        <h2>Genome(s)</h2>
                        <GenomeData taxonPath={taxon.path}/>

                        <h2>Moulting characters</h2>
                        <PhenotypicData taxonPath={taxon.path}/>
                    </div>
                </div>
                : <div>Unknown taxon</div> }
            
        </main>
    );
};

export default Species;
