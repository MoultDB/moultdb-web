import axios from 'axios';

class INaturalistService {

    getObservationsOfMoultingProject(iNatId, limit) {
        let url = "https://api.inaturalist.org/v1/observations?" +
            "project_id=moulting-arthropods&" +
            "license=cc-by%2Ccc-by-nc%2Ccc0&" +
            "photo_license=cc-by%2Ccc-by-nc%2Ccc0&" +
            "per_page=" + (limit ? limit : 0) + "&" +
            "taxon_id=" + iNatId;
        return axios.get(url);
    }
}

export default new INaturalistService();
