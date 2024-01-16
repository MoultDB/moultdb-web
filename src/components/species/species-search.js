import React, {Component} from 'react';
import './species-search.css'
import ChangePageTitle from "../../common/change-page-title";
import SpeciesSearchForm from "./species-search-form";

class Search extends Component {

    render() {
        return (
            <div>
                <ChangePageTitle pageTitle="Taxon search" />
                <h1>Taxon search</h1>
                <SpeciesSearchForm />
            </div>
        );
    }
}

export default Search;