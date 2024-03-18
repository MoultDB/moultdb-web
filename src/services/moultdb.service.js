import axios from "./http-common";

class TaxonAnnotationService {


    getTaxonByText(searchedText) {
        return axios.get("/taxon/search?text=" + searchedText);
    }
    getTaxonByDbXref(datasource, accession) {
        return axios.get("/taxon/dbxref?datasource=" + datasource + "&accession=" + accession);
    }

    getTaxonLineage(taxonPath) {
        return axios.get("/taxon/lineage?path=" + taxonPath);
    }
    
    getTaxAnnotationsByTaxonPath(taxonPath) {
        return axios.get("/taxon-annotation/species/path?taxonPath=" + taxonPath);
    }
    
    getGenomesByTaxonPath(taxonPath) {
        return axios.get("/genome/taxon?withSubspeciesGenomes=true&taxonPath=" + taxonPath);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TaxonAnnotationService();
