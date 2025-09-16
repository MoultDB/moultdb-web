import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import './taxon.css';
import {getTaxonUrl} from "../../common/link-utils";
import ChangePageTitle from "../../common/change-page-title";
import PhenotypicData from "../data/phenotypic-data";
import MoultdbService from "../../services/moultdb.service";
import GenomeData from "../data/genome-data";
import Genes from "../data/genes";
import Loading from "../data/loading";
import InaturalistService from "../../services/inaturalist.service";

function displayXref(taxon, iNatCount, iNatXref) {
    const groupedByDataSource = taxon.dbXrefs
        .filter(element => element.accession !== null)
        .sort((a, b) => {
            const comparisonByDataSource = a.dataSource.displayOrder - b.dataSource.displayOrder;
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
                <ul className="xrefs">
                    {Object.keys(groupedByDataSource).map(dataSourceName => (
                        <li key={dataSourceName}>
                            <strong>{dataSourceName}</strong>
                            <ul className="xref">
                                {groupedByDataSource[dataSourceName].map((element, index) => (
                                    <li key={index}>
                                        <a href={element.xrefURL} rel="noopener noreferrer" target="_blank">
                                            {element.name} ({element.accession})
                                        </a>
                                        {index < groupedByDataSource[dataSourceName].length - 1 && <span>; </span>}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    {iNatCount > 0 &&
                        <li key="moulting.org">
                            <strong>moulting.org</strong>
                            <ul className="xref">
                                <li>
                                    <a href={"https://www.moulting.org/species/" + iNatXref.accession} 
                                       rel="noopener noreferrer" target="_blank">
                                        {iNatXref.name} ({iNatXref.accession})
                                    </a>
                                    <span>({iNatCount} moulting observations has been captured by photo)</span>
                                </li>
                            </ul>
                        </li>
                    }
                </ul>
            </span>
        </div>
    );
}

function displaySynonyms(taxon) {
    if (taxon.dbXrefs?.filter(element => element.accession == null).length > 0) {
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

const Taxon = () => {
    const [taxon, setTaxon] = useState(null);
    const [lineage, setLineage] = useState(null);
    const [genesByPathwayTaxonOrthogroup, setGenesByPathwayTaxonOrthogroup] = useState(null);
    const [genesURL, setGenesURL] = useState()
    const [iNatCount, setINatCount] = useState(0);
    const [iNatXref, setINatXref] = useState(null);
    const [geneLoading, setGeneLoading] = useState(true);
    const [error, setError] = useState(false);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await MoultdbService.getTaxonByDbXref(params.datasource, params.accession);
            const responseData = response.data.data;
            setTaxon(responseData);

            if (responseData) {
                const find = responseData.dbXrefs.find(xref => xref.dataSource?.shortName === "inaturalist");
                setINatXref(find);
                if (find) {
                    await InaturalistService.getObservationsOfMoultingProject(find.accession)
                        .then(response => {
                            if (response?.data?.total_results) {
                                setINatCount(response?.data?.total_results);
                            }
                        })
                        .catch(error => {
                            console.error('An error has occurred during iNaturalist upload :', error);
                            setError('An error has occurred during iNaturalist upload.');
                            setINatCount(0);
                        });
                }
                await MoultdbService.getTaxonLineage(responseData.path)
                    .then(response => {
                        if (response?.data?.data?.length > 0) {
                            setLineage(response.data.data);
                        }
                    })
                    .catch(error => {
                        console.error('An error has occurred during taxon lineage upload :', error);
                        setError('An error has occurred during taxon lineage upload.');
                        setLineage(null);
                    });
                setGeneLoading(true);
                setGenesURL(MoultdbService.getMoultingGenesByTaxonPathURL(responseData.path));
                await MoultdbService.getMoultingGenesByTaxonPath(responseData.path)
                    .then(response => {
                        if (response?.data?.data) {
                            setGenesByPathwayTaxonOrthogroup(response.data.data);
                        }
                        setGeneLoading(false);
                    })
                    .catch(error => {
                        console.error('An error has occurred during taxon genes upload :', error);
                        setError('An error has occurred during taxon genes upload.');
                        setGenesByPathwayTaxonOrthogroup(null);
                        setGenesURL(null);
                        setGeneLoading(false);
                    });
            }
        }
        fetchData();
    }, [params.datasource, params.accession]);

    return (
        <main id={"taxon-page"} className={"container"}>
            <ChangePageTitle pageTitle={`Taxon: ${taxon ? taxon.scientificName : params.datasource + ":" + params.accession}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Taxon: {taxon ? taxon.scientificName : params.datasource + ":" + params.accession}</h1>
                </div>
                <div className="col-2 pt-2 text-end"><Link to="/search/taxa">New taxon search</Link></div>
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
                        {displayXref(taxon, iNatCount, iNatXref)}
                        {displaySynonyms(taxon)}
                        
                        {lineage &&
                            <div className="key-value-pair">
                                <span className="key">Lineage</span>
                                <span className="value">
                                    <ol className="lineage">
                                        {lineage.map((element, index) => (
                                            <li key={index}>
                                                <a href={getTaxonUrl(element)}>{element.scientificName}</a>
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

                        <h2>Gene(s) involved in a moulting pathway</h2>
                        {genesByPathwayTaxonOrthogroup && Object.keys(genesByPathwayTaxonOrthogroup).length > 0 ?
                            <Genes genesByPathwayTaxonOrthogroup={genesByPathwayTaxonOrthogroup}
                                   startExpanded={false} dataURL={genesURL} />
                            :
                            <div>{geneLoading ? <Loading/> : <div>No data</div>} </div>
                        }
                    </div>
                </div>
                :
                <div>Unknown taxon</div>
            }
        </main>
    );
};

export default Taxon;
