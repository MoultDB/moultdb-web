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
    
    if (gene.transcriptId) {
        return <a href={link} rel="noopener noreferrer" target="_blank">
            {gene.transcriptId}
        </a>;
    }

    const id = gene.transcriptUrlSuffix.substring(0, gene.transcriptUrlSuffix.indexOf("?"));
    const location = gene.transcriptUrlSuffix.substring(gene.transcriptUrlSuffix.indexOf("=") + 1, gene.transcriptUrlSuffix.indexOf("&"));
    return <>Locus: {id} - Location: {location} (see <a href={link} rel="noopener noreferrer" target="_blank">CDS</a>)</>;
};

export const getNCBIGenomeLink = (accession) => {
    return '<a href="https://www.ncbi.nlm.nih.gov/datasets/genome/' + accession + '" target="_blank" rel="noopener noreferrer">' + accession + '</a>'
}

export const getNCBIProteinLink = (gene) => {
    return <a href={"https://www.ncbi.nlm.nih.gov/protein/" + gene.proteinId}
              target="_blank" rel="noopener noreferrer">{gene.proteinId}</a>
}

export const getInterproDomainLink = (domainId) => {
    return <a href={"https://www.ebi.ac.uk/interpro/entry/InterPro/" + domainId + "/"}
              target="_blank" rel="noopener noreferrer">{domainId}</a>
}
