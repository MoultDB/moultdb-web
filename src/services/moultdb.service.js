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

    getTaxonDirectChildren(taxonPath) {
        return axios.get("/taxa/" + taxonPath + "/direct-children");
    }
    
    getTaxAnnotationsByTaxonPath(taxonPath) {
        return axios.get("/taxon-annotations/species?taxonPath=" + taxonPath);
    }
    
    getReleaseInfo() {
        return axios.get("/release/info");
    }
    
    getGenomesByTaxonPath(taxonPath) {
        return axios.get("/genomes?withSubspeciesGenomes=true&taxonPath=" + taxonPath);
    }

    getPathway(pathwayId) {
        return axios.get("/pathways?pathwayId=" + pathwayId);
    }

    getPathwayOrthogroup() {
        return axios.get("/pathways/with-orthogroups");
    }

    getDomain(domainId) {
        return axios.get("/domains/" + domainId);
    }

    getOrthogroup(orthogroupId) {
        return axios.get("/orthogroups/" + orthogroupId);
    }
    
    getGeneByProteinId(proteinId) {
        return axios.get("/genes?proteinId=" + proteinId);
    }
    
    getGeneByGeneId(geneId) {
        return axios.get("/genes?geneId=" + geneId);
    }
    
    getGeneByLocusTag(locusTag) {
        return axios.get("/genes?locusTag=" + locusTag);
    }

    getMoultingGenesByTaxonPath(taxonPath) {
        return axios.get("/genes?inAMoultingPathway=true&taxonPath=" + taxonPath);
    }

    getGenesByPathway(pathwayId) {
        return axios.get("/genes?pathwayId=" + pathwayId);
    }

    getGenesByOrthogroup(orthogroupId, proteinId) {
        let url = "/genes?orthogroupId=" + orthogroupId;
        if (proteinId) {
            url = url + "&proteinId=" + proteinId;    
        }
        return axios.get(url);
    }

    getGenesByDomain(domainId) {
        return axios.get("/genes?domainId=" + domainId);
    }

    getTaxonAutocomplete(searchText, signal) {
        return axios.get("/search/taxon_autocomplete?q=" + searchText, { signal });
    }
    
    getTaxonSearch(searchText) {
        return axios.get("/search/taxon_search?q=" + searchText);
    }

}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new TaxonAnnotationService();
