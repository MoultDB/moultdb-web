export const getMainUrl = (taxon) => {
    taxon.dbXrefs.sort(compareDbXrefs)
    return "/species/" + taxon.dbXrefs[0].dataSource.shortName + "/" + taxon.dbXrefs[0].accession;

}

function compareDbXrefs(a, b) {
    // Compare main (boolean)
    if (a.main && !b.main) {
        return -1;
    } else if (!a.main && b.main) {
        return 1;
    } else {
        // If booleans are equals, compare datasource (string) in reverse order
        let datasourceComparison = b.dataSource.name.localeCompare(a.dataSource.name);

        if (datasourceComparison !== 0) {
            return datasourceComparison;
        } else {
            // If datasource names are equals, compare accession (integer in a string)
            return parseInt(a.accession, 10) - parseInt(b.accession, 10);
        }
    }
}
