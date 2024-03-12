import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useParams} from "react-router-dom";
import './species.css';
import {getMainUrl} from "../../common/taxon-utils";
import ChangePageTitle from "../../common/change-page-title";
import PhenotypicData from "../data/phenotypic-data";
import MoultdbService from "../../services/moultdb.service";
import GenomeData from "../data/genome-data";

function displayXref(taxon) {
    const groupedByDataSource = taxon.dbXrefs
        .filter(element => element.accession !== null)
        .sort((a, b) => {
            const comparisonByDataSource = b.dataSource.name.localeCompare(a.dataSource.name);
            const comparisonByName = a.name.localeCompare(b.name);
            const comparisonByMain = b.main - a.main;
            const comparisonByAccession = a.accession - b.accession;
            
            if (comparisonByDataSource !== 0) return comparisonByDataSource;
            if (comparisonByMain !== 0) return comparisonByMain;
            if (comparisonByName !== 0) return comparisonByName;
            return comparisonByAccession;
        })
        .reduce((acc, element) => {
            const key = element.dataSource.name;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(element);
            return acc;
        }, {});

    return (
        <div className="key-value-pair">
            <span className="key">Cross-reference(s)</span>
            <span className="value">
                <ul>
                    {Object.keys(groupedByDataSource).map(dataSourceName => (
                        <li key={dataSourceName}>
                            <strong>{dataSourceName}</strong>
                            <ul className="xref">
                                {groupedByDataSource[dataSourceName].map((element, index) => (
                                    <li key={index}>
                                        <a href={element.xrefURL} rel="noopener noreferrer" target="_blank">
                                            {element.name} ({element.accession})
                                        </a>
                                        {index < groupedByDataSource[dataSourceName].length - 1 && '; '}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </span>
        </div>
    );
}
function displaySynonyms(taxon) {
    if (taxon.dbXrefs && taxon.dbXrefs.filter(element => element.accession == null).length > 0) {
        const filteredAndSortedElements = taxon.dbXrefs
            .filter(element => element.accession == null)
            .sort((a, b) => a.name.localeCompare(b.name));

        const jsxElements = filteredAndSortedElements.map((element, index) => (
            <span key={index}>
                {element.name}
                {index < filteredAndSortedElements.length - 1 && '; '}
            </span>
        ));

        return (
            <div className="key-value-pair">
                <span className="key">Synonym(s)</span>
                <span className="value">
                    <ul className="xref">
                        {jsxElements}
                    </ul>
                </span>
            </div>
        );
    }

    // Retourner null ou un autre élément React vide si nécessaire
    return null;
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
    }, [params.datasource, params.accession]);

    return (
        <main className={"container "}>
            <ChangePageTitle pageTitle={`${taxon ? taxon.scientificName : params.datasource + ":" + params.accession}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Taxon: {taxon ? taxon.scientificName : params.datasource + ":" + params.accession}</h1>
                </div>
                <div className="col-2 pt-2 text-end"><Link to="/species/search">New taxon search</Link></div>
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
                        {displayXref(taxon)}
                        {displaySynonyms(taxon)}
                        
                        {lineage &&
                            <div className="key-value-pair">
                                <span className="key">Lineage</span>
                                <span className="value">
                                    <ol className="lineage">
                                        {lineage.map((element, index) => (
                                            <li key={index}>
                                                {/*TODO replace <a> by <Link to={getMainUrl(element)} >{element.scientificName}</Link>*/}
                                                <a href={getMainUrl(element)}>{element.scientificName}</a>
                                                {index < lineage.length - 1 && <span className="lineage-separator"/>}
                                            </li>))}
                                    </ol>
                                </span>
                            </div>
                        }

                        <h2>Genome(s) <span className={"subtitle"}>(current taxon and its children)</span></h2>
                        <GenomeData taxonPath={taxon.path}/>

                        <h2>Moulting characters <span className={"subtitle"}>(current taxon and its children)</span></h2>
                        <PhenotypicData taxonPath={taxon.path}/>
                    </div>
                </div>
                : <div>Unknown taxon</div> }
            
        </main>
    );
};

export default Species;
