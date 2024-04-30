import {Link} from "react-router-dom";

export const getSpeciesUrl = (taxon) => {
    if (taxon.dbXrefs && taxon.dbXrefs.length > 0) {
        return "/species/" + taxon.dbXrefs[0].dataSource.shortName + "/" + taxon.dbXrefs[0].accession;
    }
    // This should never happen, but it prevents errors
    return "/";
}

export const getSpeciesLink = (taxon) => {
    if (taxon.dbXrefs && taxon.dbXrefs.length > 0)
        return <Link to={getSpeciesUrl(taxon)}>{taxon.scientificName}</Link>;
    // This should never happen, but it prevents errors
    return taxon.scientificName;
}

export const getNCBIGeneLink = (gene) => {
    return <>
        {gene.id &&
            <a target="_blank" rel="noopener noreferrer"
               href={"https://www.ncbi.nlm.nih.gov/gene/" + gene.id}>
                {gene.name ? gene.name : gene.id}
            </a>
        }
    </>
};

export const getNCBITranscriptLink = (gene) => {
    const link = "https://www.ncbi.nlm.nih.gov/nuccore/" + gene.transcriptUrlSuffix;
    return <a href={link} rel="noopener noreferrer" target="_blank">
        {gene.transcriptId ? gene.transcriptId : link}
    </a>;
};

export const getNCBIGenomeLink = (accession) => {
    return '<a href="https://www.ncbi.nlm.nih.gov/datasets/genome/' + accession + '" target="_blank" rel="noopener noreferrer">' + accession + '</a>'
}

export const getNCBIProteinLink = (gene) => {
    return <a href={"https://www.ncbi.nlm.nih.gov/protein/" + gene.proteinId}
              target="_blank" rel="noopener noreferrer">{gene.proteinId}</a>
}

export const getInterproDomainLink = (gene) => {
    return <a href={"https://www.ebi.ac.uk/interpro/entry/InterPro/" + gene.domain.id + "/"}
              target="_blank" rel="noopener noreferrer">{gene.domain.id}</a>
}
