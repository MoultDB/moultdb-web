import React, { useState, useEffect } from 'react';
import TaxAnnotService from "../../services/tax-annot.service";
import {useParams} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";


const Species = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    let params = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await TaxAnnotService.getTaxAnnotationsBySpecies(params.path);
                if (response.data) {
                    if (response.data.data[0]) {
                        setData((prevData) => ({
                            ...prevData,
                            taxon: response.data.data[0].taxon
                        }));
                    }
                    setData((prevData) => ({
                        ...prevData,
                        content: response.data.data
                    }));
                    setError(null);
                }
            } catch (error) {
                console.error('An error has occurred during taxon annotation upload :', error);
                setError('An error has occurred during taxon annotation upload.');
                setData(null);
            }
        };

        fetchData();
    }, []); // empty table [] means that this effect is executed only once when the component is assembled.

    return (
        <main>
            <ChangePageTitle pageTitle={`${data ? data.taxon.scientificName: params.path}`} />
            <div className="species">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1>Species: {data ? data.taxon.scientificName: params.path}</h1>
                        </div>
                    </div>
                </div>
            </div>

            {error && ( <div className={"container alert alert-danger"} role="alert">{error}</div> )}
            {data ? (
                // TODO refactor in a separated component
                    <table>
                        <tbody>
                        {data.content && (
                            data.content.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.sampleSet.timePeriod.geologicalAgeFrom.name} to {item.sampleSet.timePeriod.geologicalAgeTo.name}</td>
                                    <td>{item.sampleSet.collectionLocations}</td>
                                    <td>{item.sampleSet.geologicalFormations}</td>
                                    <td>{item.sampleSet.specimenTypes}</td>
                                    <td>{item.specimenTypes}</td>
                                    <td>{item.condition.devStage.id}</td>
                                    <td>{item.condition.anatomicalEntity.name}</td>
                                    <td>{JSON.stringify(item.moultingCharacters, null, 2)}</td>
                                    <td>{item.article.citation}</td>
                                    <td><a href={`https://orcid.org/${item.version.creationUser.orcidId}`} rel="noopener noreferrer" target="_blank">
                                        {item.version.creationUser.name}</a></td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                )
                : (
                    <div>No data</div>
                )}
        </main>
    );
};

export default Species;
