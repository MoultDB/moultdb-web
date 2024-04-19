import axios from "./http-common";

class TaxonAnnotationService {


    getTaxonByText(searchedText) {
        return axios.get("/taxa/search?text=" + searchedText);
    }
    getTaxonByDbXref(datasource, accession) {
        return axios.get("/taxa?datasource=" + datasource + "&accession=" + accession);
    }

    getTaxonLineage(taxonPath) {
        return axios.get("/taxa/" + taxonPath + "/lineage");
    }
    
    getTaxAnnotationsByTaxonPath(taxonPath) {
        return axios.get("/taxon-annotations/species?taxonPath=" + taxonPath);
    }
    
    getGenomesByTaxonPath(taxonPath) {
        return axios.get("/genomes?withSubspeciesGenomes=true&taxonPath=" + taxonPath);
    }
    
    getMoultingGenesByTaxonPath(taxonPath) {
        return axios.get("/genes?inAMoultingPathway=true&taxonPath=" + taxonPath);
    }
}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TaxonAnnotationService();
