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
    
    #buildMoultingGenesByTaxonPathURL(taxonPath) {
        return "/genes?inAMoultingPathway=true&taxonPath=" + taxonPath;
    }
    
    getMoultingGenesByTaxonPath(taxonPath) {
        return axios.get(this.#buildMoultingGenesByTaxonPathURL(taxonPath));
    }
    
    getMoultingGenesByTaxonPathURL(taxonPath) {
        return axios.defaults.baseURL + this.#buildMoultingGenesByTaxonPathURL(taxonPath);
    }
    
    #buildGenesByPathwayURL(pathwayId) {
        return "/genes?pathwayId=" + pathwayId;
    }
    
    getGenesByPathway(pathwayId) {
        return axios.get(this.#buildGenesByPathwayURL(pathwayId));
    }
    
    getGenesByPathwayURL(pathwayId) {
        return axios.defaults.baseURL + this.#buildGenesByPathwayURL(pathwayId);
    }
    
    #buildGenesByOrthogroupURL(orthogroupId, proteinId) {
        let url = "/genes?orthogroupId=" + orthogroupId;
        if (proteinId) {
            url = url + "&proteinId=" + proteinId;
        }
        return url;
    }
    
    getGenesByOrthogroup(orthogroupId, proteinId) {
        return axios.get(this.#buildGenesByOrthogroupURL(orthogroupId, proteinId));
    }
    
    getGenesByOrthogroupURL(orthogroupId, proteinId) {
        return axios.defaults.baseURL + this.#buildGenesByOrthogroupURL(orthogroupId, proteinId);
    }
    
    #buildGenesByDomainPath(domainId) {
        return `/genes?domainId=${domainId}`;
    }
    
    getGenesByDomain(domainId) {
        return axios.get(this.#buildGenesByDomainPath(domainId));
    }
    
    getGenesByDomainURL(domainId) {
        return axios.defaults.baseURL + this.#buildGenesByDomainPath(domainId);
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
