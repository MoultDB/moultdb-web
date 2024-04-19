import {Link} from "react-router-dom";

export const getMainUrl = (taxon) => {
    return "/species/" + taxon.mainDbXref.dataSource.shortName + "/" + taxon.mainDbXref.accession;
}

export const getMainLink = (taxon) => {
    if (taxon.mainDbXref.accession)
        return <Link to={getMainUrl(taxon)}>{taxon.scientificName}</Link>;
    // This should never happen, but it prevents errors
    return taxon.scientificName;
}
