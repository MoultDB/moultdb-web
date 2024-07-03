import React, {Component} from 'react';
import './species-search.css'
import MoultdbService from "../../services/moultdb.service";
import {getSpeciesLink} from "../../common/link-utils";
import Loading from "../data/loading";

const examples = {
    searchedText: ['Fuxianhuia protensa', 'Penaeus vannamei', "Arthropoda"]
};

class SpeciesSearchForm extends Component {
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
            self.setState({isFetching: false, errorMessage: "Undefined searched taxa."});
            return;
        }
        MoultdbService.getTaxonByText(self.state.searchedText)
            .then(response => {
                if (response.data) {
                    this.setState({data: response.data.data});
                }
                this.setState({isFetching: false, isLoaded: true});
            })
            .catch(error => {
                console.error('An error has occurred during taxon lineage upload :', error);
                this.setState({isFetching: false, isLoaded: true,
                    errorMessage: 'An error has occurred during taxon lineage upload :' + error.message});
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
        examples[id].map((el, index) => (
            exampleLinks.push(
                <button className="btn-link" type="button" key={"ex-"+index}
                        onClick={(e) => {
                            this.updateValue(id, el) }}>
                    {el}
                </button>
            )
        ))
        return <div className="text-center">
            <input id={id} className="form-control form-control-sm" type="text"
                   placeholder="Taxon scientific name" aria-label="Taxon scientific name"
                   onChange={(e) => {
                       this.handleChange(id, e.target.value)
                   }}/>
            <small className="text-muted">Ex: {exampleLinks}</small>
        </div>;
    }

    getResultDisplay() {
        let result = "";
        if (this.state.isLoaded) {
            if (this.state.data?.length > 0) {
                result =
                    <table className="simple-table m-auto">
                        <thead>
                        <tr>
                            <th>Taxon name</th>
                            <th>Taxon cross-reference</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((element, index) => (
                                <tr key={index}>
                                    <td>{getSpeciesLink(element)}</td>
                                    <td>
                                        <a href={element.dbXrefs[0].xrefURL} rel="noopener noreferrer" target="_blank">
                                            {element.dbXrefs[0].dataSource.shortName}:{element.dbXrefs[0].accession}
                                        </a>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
            } else {
                result =
                    <div className={"alert alert-danger"}>
                        Sorry, no results found for your search.
                    </div>
            }
        } else if (this.state.errorMessage !== null) {
            result = <div className={"container alert alert-danger"} role="alert">{this.state.errorMessage}</div>
        } else if (this.state.isFetching) {
            result = <Loading/>
        }
        return result;
    }
    
    render() {
        let result = this.getResultDisplay();
        return (
            <div className='row'>
                <div className={"col-6 offset-3 mb-3 mt-5"}>
                    <form onSubmit={this.handleSubmit}>
                        {this.getInput('searchedText', 'Taxon name')}
                        <p className={"text-center"}>
                            <button className="btn btn-sm btn-primary" type='submit'>Submit</button>
                        </p>
                    </form>
                    {result}
                </div>
            </div>
        );
    }
}

export default SpeciesSearchForm;