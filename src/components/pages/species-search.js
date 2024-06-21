import React, {Component} from 'react';
import ChangePageTitle from "../../common/change-page-title";
import SpeciesSearchForm from "./species-search-form";

class Search extends Component {

    render() {
        return (
            <main className={"beta"}>
                <ChangePageTitle pageTitle="Taxon search" />
                <h1>Taxon search</h1>
                <SpeciesSearchForm />
            </main>
        );
    }
}

export default Search;