import axios from "./http-common";

class TaxonAnnotationService {

    getTaxAnnotationsBySpecies(scientificName) {
        return axios.get("/taxon-annotation/species/path?path=" + scientificName);
    }
}

export default new TaxonAnnotationService();
