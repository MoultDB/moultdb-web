import React, {Component} from 'react';
import {getMainUrl} from "../../common/taxon-utils";
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css"
import "datatables.net-responsive-dt/css/responsive.dataTables.css"
import "datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.css"
import './data.css'

const $ = require('jquery');
$.DataTable = require( 'datatables.net-dt' );
$.DataTable = require( 'datatables.net-buttons-dt' );
$.DataTable = require( 'datatables.net-buttons/js/buttons.html5.js' );
$.DataTable = require( 'datatables.net-responsive-dt' )
$.DataTable = require( 'datatables.net-searchbuilder-dt' );

const columns = [
    {
        className: 'control',
        orderable: false,
        data: null,
        render: function ( data, type, full ) {
            return '';
        },
        targets:   -1
    },
    { title: 'Taxon', data: 'taxon',
        render: function ( data, type, full ) {
            if (data) {
                // return data.scientificName;
                return '<a href='+getMainUrl(data)+'>' + data.scientificName + '</a>'
            }
            return '';
        }
    },
    { title: 'Observed moult stage', data: 'condition.devStage.name' },
    { title: 'Type of specimens of interest', data: 'sampleSet.specimenTypes[, ]' },
    { title: 'Geological age', data: 'sampleSet.timePeriod',
        render: function ( data, type, full ) {
            if (data) {
                if (data.geologicalAgeFrom.name === data.geologicalAgeTo.name) {
                    return data.geologicalAgeFrom.name;
                }
                return data.geologicalAgeFrom.name + " - " + data.geologicalAgeTo.name;
            }
            return '';
        }
    },
    { title: 'Location: name', data: 'sampleSet.collectionLocations[, ]' },
    { title : 'Contributor', data: 'version.creationUser',
        render: function ( data, type, full ) {
            if (data) {
                return '<a href="https://orcid.org/' + data.orcidId + '">' + data.name + '</a>'
            }
            return '';
        }
    },
    { title: 'Moulting phase', data: 'moultingCharacters.moultingPhase' },
    { title: 'Location of moulting suture', data: 'moultingCharacters.sutureLocation' },
    { title: 'Direction of egress during moulting', data: 'moultingCharacters.egressDirection' },
    { title: 'Position exuviae found in', data: 'moultingCharacters.positionExuviaeFoundIn' },
    { title: 'Level of intraspecific variability in moulting mode', data: 'moultingCharacters.moultingVariability' },
    { title: 'Other behaviours associated with moulting', data: 'moultingCharacters.otherBehaviour' },
    { title: 'Consumption of exuviae', data: 'moultingCharacters.exuviaeConsumption' },
    { title: 'Reabsorption during moulting', data: 'moultingCharacters.reabsorption' },
    { title: 'Published reference: citation (APA style)', data: 'article',
        render: function ( article, type, full ) {
            if (article) {
                let v = article.dbXrefs
                    .map((element, index) => (
                        `${element.dataSource.name}: <a href="${element.xrefURL}" rel="noopener noreferrer" target="_blank">${element.accession}</a>`
                    ))
                    .join(', ');
                return `<div>${article.citation} ${v}</div>`;
            }
        }
    },
    { title: 'Museum collection', data: 'sampleSet.storageLocations[, ]' },
    // { title: 'Museum accession', data: 'sampleSet.storageAccessions[, ]' },
    { title: 'Geological formation', data: 'sampleSet.geologicalFormations[, ]' },
    { title: 'Biozone', data: 'sampleSet.biozone' },
    { title: 'Fossil preservation type', data: 'sampleSet.fossilPreservationTypes[, ]' },
    { title: 'Environment', data: 'sampleSet.environments[, ]' },
    { title: 'Life history style', data: 'moultingCharacters.lifeHistoryStyle' },
    { title: 'Life mode', data: 'moultingCharacters.lifeMode' },
    { title: 'Number of juvenile moults', data: 'moultingCharacters.juvenileMoultCount' },
    { title: 'Number of major morphological transitions', data: 'moultingCharacters.majorMorphologicalTransitionCount' },
    { title: 'Adult stage moulting', data: 'moultingCharacters.hasTerminalAdultStage' },
    { title: 'Observed # total moult stages', data: 'moultingCharacters.observedMoultCount' },
    { title: 'Estimated # moult stages', data: 'moultingCharacters.estimatedMoultCount' },
    { title: 'Segment addition mode', data: 'moultingCharacters.segmentAdditionMode' },
    { title: '# body segments in adult individuals', data: 'moultingCharacters.bodySegmentCountInAdults' },
    { title: '# body segments per moult stage', data: 'moultingCharacters.bodySegmentCount' },
    { title: 'Average body length increase from previous moult (in mm)', data: 'moultingCharacters.bodyLengthIncreaseAverage' },
    { title: 'Average body length (in mm)', data: 'moultingCharacters.bodyLengthAverage' },
    { title: 'Average body mass increase from previous moult (in g)', data: 'moultingCharacters.bodyMassIncreaseAverage' },
    { title: 'Intermoult period (in days)', data: 'moultingCharacters.intermoultPeriod' },
    { title: 'Pre-moult period (in days)', data: 'moultingCharacters.premoultPeriod' },
    { title: 'Post-moult period (in days)', data: 'moultingCharacters.postmoultPeriod' },
    { title: 'Variation in moulting time within cohorts (in days)', data: 'moultingCharacters.variationWithinCohorts' },
    { title: 'Cephalic suture location', data: 'moultingCharacters.cephalicSutureLocation' },
    { title: 'Post-cephalic suture location', data: 'moultingCharacters.postCephalicSutureLocation' },
    { title: 'Resulting named moulting configurations', data: 'moultingCharacters.resultingNamedMoultingConfiguration' },
    { title: 'Post-moult cuticle calcification event', data: 'moultingCharacters.calcificationEvent' },
    { title: 'Post-moult heavy metal reinforcement of the cuticle', data: 'moultingCharacters.heavyMetalReinforcement' },
    { title: 'Quality of fossil exuviae', data: 'moultingCharacters.fossilExuviaeQuality' },
];

class MoultingCharacters extends Component {
    componentDidMount() {
        $(this.refs.mcharacters).DataTable({
            order: [[1, 'asc'], [2, 'asc']],
            scrollX: true,
            dom:"<'row'<'col'Q>>" +
                "<'row'<'col'l><'col text-center'i><'col text-end'f>>" +
                "<'row my-1'<'data-table-wrapper col'tr>>" +
                "<'row'<'col'B><'col text-end'p>>",
            language: {
                searchBuilder: {
                    add: 'Add filter',
                    clearAll: 'Reset filters',
                    data: 'Column',
                    title: {
                        0: '',
                        _: 'Filters (%d)'
                    },
                }
            },
            oLanguage: {
                sSearch: "Global filter:"
            },
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            columns,
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr'
                }
            },
            ordering: true,
            data: this.props.mcData,
            buttons: [
                {
                    extend: 'copyHtml5',
                    text: 'Copy to clipboard'
                },
                {
                    extend: 'csvHtml5',
                    fieldSeparator: '\t',
                    extension: '.tsv',
                    text: 'TSV',
                    title: 'MoultDB export - moulting characters'
                }
            ]
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper').find('#mc-result').DataTable().destroy(true);
    }
    
    render() {
        return (
            <div>
                <div className={"result-info mb-3"}>
                    <p>Clicking on the <span className={"open-row"}/> sign shows the full information for each row.</p>
                </div>

                <table id="mc-result"
                       className={'table table-sm table-striped table-bordered table-hover responsive'}
                       ref="mcharacters">
                </table>
            </div>);
    }
}
export default MoultingCharacters;
