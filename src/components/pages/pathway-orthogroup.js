import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Loading from "../data/loading";

const PathwayOrthogroup = () => {
    const [pathways, setPathways] = useState(null);
    const [pathwaysLoading, setPathwaysLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setPathwaysLoading(true);
            await MoultdbService.getPathwayOrthogroup()
                .then(response => {
                    if (response?.data?.data) {
                        setPathways(response.data.data.sort((a, b) => a.id.localeCompare(b.id)));
                    }
                    setPathwaysLoading(false);
                })
                .catch(error => {
                    console.error('An error has occurred during pathways upload :', error);
                    setError('An error has occurred during pathways upload.');
                    setPathways(null);
                    setPathwaysLoading(false);
                });
        }
        fetchData();
    }, []);

    return (
        <main className={"container"}>
            <ChangePageTitle pageTitle={"Pathways"} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Pathways</h1>
                </div>
            </div>

            { error && <div className={"container alert alert-danger"} role="alert">{error}</div> }
            { pathways && pathways.length > 0 ?
                <div className="row">
                    <div className="col-md-12">
                        <p>Discover the main moulting pathways and the related orthogroups to explore the molecular mechanisms underlying arthropod moulting</p>
                        <ul>
                            {pathways.map((pathway, idx) => (
                                <li key={"pathway-" + idx}>
                                    <Link to={"/pathway/" + pathway.id}>
                                        <strong>{pathway.name}</strong> ({pathway.id})
                                    </Link>
                                    <p>
                                        Orthogroups:{" "}
                                        {pathway?.orthogroups?.sort((a, b) => a.name.localeCompare(b.name))
                                            .map((og) => (
                                                <Link key={"orthogroup-" + og.id} to={"/orthogroup/" + og.id}>
                                                    {og.name}
                                                </Link>
                                            )).reduce((prev, curr) => [prev, ", ", curr])}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                :
                pathwaysLoading ? <Loading /> : <div>No pathway</div>
            }
        </main>
    );
};

export default PathwayOrthogroup;
