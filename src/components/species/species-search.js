import React, {Component} from 'react';
import './species-search.css'
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import {getMainUrl} from "../../common/taxon-utils";
import Loading from "../data/loading";

const examples = {
    searchedText: ['Fuxianhuia protensa', 'testw']
};

class Search extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            isLoaded: false,
            isFetching: false,
            errorMessage: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        self.setState({data: null, isFetching: true, isLoaded: false, errorMessage: null});

        if (self.state.searchedText === undefined) {
            self.setState({isFetching: false, errorMessage: "Undefined taxa."});
            return;
        }
        MoultdbService.getTaxonByText(self.state.searchedText)
            .then(response => {

                if (response.data) {
                    this.setState({data: response.data.data, isFetching: false, isLoaded: true, errorMessage: null});
                    // setLineage(response.data.data);
                }
            })
            .catch(error => {
                console.error('An error has occurred during taxon lineage upload :', error);
                // setError('An error has occurred during taxon lineage upload.');
                // setLineage(null);
            });
    }

    handleChange(fieldName, value) {
        this.setState({ [fieldName]: value })
    }

    updateValue(id, val) {
        document.getElementById(id).value = val;
        this.handleChange(id, val);
    }

    getInput(id, label) {
        var exampleLinks = [];
        for (const el of examples[id]) {
            exampleLinks.push(
                <button className="btn btn-link btn-sm no-style" type="button"
                        onClick={(e) => {
                            this.updateValue(id, el) }}>
                    {el}
                </button>
            )
        }
        return <div>
            <label htmlFor={id} className="col-form-label">{label}</label>
            <input id={id} className="form-control form-control-sm" type="text"
                   onChange={(e) => {
                       this.handleChange(id, e.target.value)
                   }}/>
            <small className="text-muted">Ex: {exampleLinks}</small>
        </div>;
    }

    render() {
        let result = this.getResultDisplay();

        return (
            <div>
                <ChangePageTitle pageTitle="Taxon search" />
                <h1>Taxon search</h1>
                <div className='row'>
                    <div className='col-4 offset-4'>
                        <div className="mb-3">
                            <form onSubmit={this.handleSubmit}>
                                {this.getInput('searchedText', 'Taxon name')}
                                <button className="btn btn-sm btn-custom col-sm-2 offset-sm-5" type='submit'>Submit</button>
                            </form>
                        </div>
                        {result}
                    </div>
                </div>
            </div>
        );
    }

    getResultDisplay() {
        let result = "";
        if (this.state.isLoaded) {
            if (this.state.data && this.state.data.length > 0) {
                result =
                    <div>
                        <ul>
                            {this.state.data.map((element, index) => (
                                <li key={index}>
                                    {/*TODO replace <a> by <Link to={getMainUrl(element)} >{element.scientificName}</Link>*/}
                                    <a href={getMainUrl(element)} >{element.scientificName}</a>
                                </li>))}
                        </ul>
                    </div>
            } else {
                result =
                    <div className={"alert alert-danger"}>
                        Sorry, no results found for your search.
                    </div>
            }
        } else if (this.state.errorMessage !== null) {
            result = <div className={"container alert alert-danger"} role="alert">{this.state.errorMessage}</div>

            // <p>{}</p>
        } else if (this.state.isFetching) {
            result = <Loading/>
        }
        return result;
    }
}

export default Search;