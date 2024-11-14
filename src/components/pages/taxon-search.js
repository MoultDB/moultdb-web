import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import ChangePageTitle from "../../common/change-page-title";
import MoultdbService from "../../services/moultdb.service";
import Loading from "../data/loading";
import {getSpeciesUrlFromAccession} from "../../common/link-utils";
import {useCombobox} from 'downshift';
import './taxon-search.css'

const examples = ['Fuxianhuia protensa', 'Penaeus vannamei', "Arthropoda"];

 const TaxonSearch = () => {
    const [items, setItems] = useState([]);
    const [loadingResults, setLoadingResults] = useState(false);
    const [searchResults, setSearchResults] = useState('');

    const {
        getMenuProps,
        getInputProps,
        getItemProps,
        isOpen,
        highlightedIndex,
        selectedItem,
        inputValue,
        setInputValue
    } = useCombobox({
        items,
        onInputValueChange: ({ inputValue }) => setInputValue(inputValue),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoadingResults(true);
        await MoultdbService.getTaxonSearch(inputValue)
            .then(response => {
                if (response.data) {
                    setSearchResults(response.data.data);
                }
                setLoadingResults(false);
            })
            .catch(error => {
                console.error('An error has occurred during taxon upload :', error);
                setSearchResults(null);
                setLoadingResults(false);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!inputValue.trim()) return;

            const response = await MoultdbService.getTaxonAutocomplete(inputValue);
            setItems(response.data?.data);
        };

        fetchData();
    }, [inputValue]);

     const updateValue = (newValue) => {
         setInputValue(newValue); // Met à jour l'état
     };

     return (
        <main>
            <ChangePageTitle pageTitle="Taxon search"/>
            <h1>Taxon search</h1>

            <div className='row'>
                <div className={"col-6 offset-3 mb-3 mt-5"}>
                        <form onSubmit={handleSubmit} id={"searchTaxon"} >
                            <input type="text" className={"autocomplete-input form-control"}
                                   placeholder={'Taxon scientific name'} aria-label={'Taxon scientific name'}
                                   {...getInputProps()}
                            />
                            <ul
                                className={`autocomplete-options ${!(isOpen && items?.length) && 'hidden'}`}
                                {...getMenuProps()}
                            >
                                {isOpen && (
                                    items.map((item, index) => (
                                        <li
                                            className={highlightedIndex === index ? 'highlight' : ''}
                                            key={index}
                                            {...getItemProps({item, index})}
                                        >
                                            {item}
                                        </li>
                                    )))}
                            </ul>
                            {examples &&
                                <small className="text-muted">Ex:
                                    {examples.map((el, index) => (
                                        <button className="btn-link" type="button" key={"ex-" + index}
                                                onClick={() => updateValue(el)}>
                                            {el}
                                        </button>
                                    ))}
                                </small>
                            }
                            <p className={"text-center"}>
                                <button className="btn btn-sm btn-primary" type='submit'>Submit</button>
                            </p>
                        </form>
                        <>{loadingResults ? <Loading/> : <div></div>} </>
                        <>{!loadingResults && searchResults ? <>
                                {searchResults.length >= 1000 && <div>Only the first 1000 hits are displayed</div>}
                                <table className="search-table m-auto">
                                    <thead>
                                    <tr>
                                        <th>Taxon name</th>
                                        <th>Taxon synonyms</th>
                                        <th>Taxon cross-reference</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {searchResults.map((element, index) => (
                                        <tr key={index}>
                                            <td><Link
                                                to={getSpeciesUrlFromAccession(element.accession)}>{element.scientificName}</Link>
                                            </td>
                                            <td className={"synonyms"}>{element.synonyms}</td>
                                            <td>
                                                <a href={element.xrefUrl} rel="noopener noreferrer" target="_blank">
                                                    {element.accession.replaceAll('/', ':')}
                                                </a>
                                            </td>
                                        </tr>))}
                                    </tbody>
                                </table>
                            </>
                            : <div></div>} </>

                    </div>
            </div>
        </main>
    );
};

export default TaxonSearch;