import {Link} from "react-router-dom";

export const getMainUrl = (taxon) => {
    if (taxon.dbXrefs && taxon.dbXrefs.length > 0) {
        return "/species/" + taxon.dbXrefs[0].dataSource.shortName + "/" + taxon.dbXrefs[0].accession;
    }
    // This should never happen, but it prevents errors
    return "/";
}

export const getMainLink = (taxon) => {
    if (taxon.dbXrefs && taxon.dbXrefs.length > 0)
        return <Link to={getMainUrl(taxon)}>{taxon.scientificName}</Link>;
    // This should never happen, but it prevents errors
    return taxon.scientificName;
}
