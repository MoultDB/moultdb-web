import React, { Component } from 'react';
import "./moulting-characters.css"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css"
import "datatables.net-responsive-dt/css/responsive.dataTables.css"
import "datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.css"
import * as bootstrap from 'bootstrap';
import './data.css'
import { getTaxonUrl, getUberonLink } from "../../common/link-utils";

const $ = require('jquery');
$.DataTable = require( 'datatables.net-dt' );
$.DataTable = require( 'datatables.net-buttons-dt' );
$.DataTable = require( 'datatables.net-buttons/js/buttons.html5.js' );
$.DataTable = require( 'datatables.net-responsive-dt' )
$.DataTable = require( 'datatables.net-searchbuilder-dt' );

function buildColumn(title, data, tooltip, renderFunc) {
    return { 
        title: tooltip
            ? `<span data-bs-toggle="tooltip" data-bs-placement="top" title="${tooltip}">${title}</span>`
            : title,
        name: title,
        data: data,
        render: renderFunc
    };
}

const columns = [
    buildColumn('Taxon', 'taxon',
        'Finest-grained taxonomic level of organism',
        function(data, type, full) {
            if (data) {
                let name = data.scientificName;
                if (full.authorSpeciesName !== data.scientificName && full.authorSpeciesName !== null) {
                    name = name + " (" + full.authorSpeciesName + ")";
                }
                return '<a href=' + getTaxonUrl(data) + '>' + name + '</a>';
            }
            return '';
        }
    ),
    buildColumn('Moult stage', 'condition.devStage',
        'Moult stage of the sample',
        function(devStage, type, full) {
            if (devStage) {
                return getUberonLink(devStage);
            }
            return '';
        }
    ),
    buildColumn('Moulting step', 'condition.moultingStep',
        'Moulting step at the time of the sampling'),
    buildColumn('Sex', 'condition.sex',
        'Annotation of the sex of the sample'),
    buildColumn('Moult stage author annotation', 'authorDevStage',
        'Free text annotation of moult stage of the sample as provided by authors'),
    buildColumn("Reproductive state", 'condition.reproductiveState',
        'Whether samples are virgin, mated, etc.'),
    buildColumn('Type of specimens of interest', 'sampleSet.specimenTypes[, ]',
        'Type of specimens described for the sample'),
    buildColumn('Geological age', 'sampleSet.timePeriod',
        'Geological age of the sample - for fossil data only',
        function ( data, type, full ) {
          if (data) {
              if (data.geologicalAgeFrom.name === data.geologicalAgeTo.name) {
                  return data.geologicalAgeFrom.name;
              }
              return data.geologicalAgeFrom.name + " to " + data.geologicalAgeTo.name;
          }
          return '';
      }
    ),
    buildColumn('Location: name', 'sampleSet.collectionLocations[, ]',
        'Geographical location name of the sample'),
    buildColumn('Reference', null,
        'Relevant publication reference or iNaturalist observation ID',
        function ( data, type, full ) {
            if (data?.article) {
                let v = data.article.dbXrefs
                    .map((element, index) => {
                        if (element.xrefURL) {
                            return `<a href="${element.xrefURL}" rel="noopener noreferrer" target="_blank">${element.accession}</a>`
                        }
                        return `<span>${element.dataSource.shortName.toUpperCase()}: ${element.accession}</span>`
                    })
                    .join(', ');
                return `<div>${v}</div>`;
            }
            if (data?.observation) {
                return `<div><a href="${data.observation.url}" rel="noopener noreferrer" target="_blank">iNaturalist: ${data.observation.id}</a></div>`;
            }
            return ''
        }
    ),
    buildColumn("Evidence type", 'ecoTerm',
        'Code from the Evidence and Conclusion Ontology that indicates what type of evidence observations for this taxon are based upon',
      function ( ecoTerm, type, full ) {
          if (ecoTerm) {
              return '<a href="https://evidenceontology.org/term/' + ecoTerm.id + '">' + ecoTerm.name + '</a>'
          }
          return '';
      }
    ),
    buildColumn('Moulting phase', 'moultingCharacters.moultingPhase',
        'Whether individuals of this species moult all parts of the exoskeleton in one go, or in multiple phases'),
    buildColumn('Location of moulting suture', 'moultingCharacters.sutureLocations[, ]',
        'Location of moulting suture opened in specimens of this species in order to moult'),
    buildColumn('Direction of egress during moulting', 'moultingCharacters.egressDirections[, ]',
        'Direction in which individuals of this species exist their exuviae'),
    buildColumn('Position exuviae found in', 'moultingCharacters.positionsExuviaeFoundIn[, ]',
        'Position in which moults of this species are found in'),
    buildColumn('Level of intraspecific variability in moulting mode', 'moultingCharacters.moultingVariability',
        'Do individuals of this species vary in the ways they moult their exoskeletons? Such as whether different ' +
        'individuals use different moulting sutures, or produce a variety of resulting moulting configurations'),
    buildColumn('Other behaviours associated with moulting', 'moultingCharacters.otherBehaviours[, ]',
        'Other notable behaviours, excepting methods of moulting itself, that the species shows in conjunction ' +
        'with individual moulting events'),
    buildColumn('Consumption of exuviae', 'moultingCharacters.exuviaeConsumption',
        'Whether individuals of this species are known to consume any of their moulted exoskeletons'),
    buildColumn('Reabsorption during moulting', 'moultingCharacters.reabsorption',
        'Whether individuals of this species are known to reabsorb any of their previous exoskeleton during moulting'),
    buildColumn('Museum collection', 'sampleSet.storageLocations[, ]',
        'Location of museum that specimen/s is/are hosted in - usually for fossils'),
    // buildColumn('Museum accession', 'sampleSet.storageAccessions[, ]', ''),
    buildColumn('Geological formation', 'sampleSet.geologicalFormations[, ]',
        'Geological formation the sample was found in - for fossil data only'),
    buildColumn('Biozone', 'sampleSet.biozone',
        'Chronostratigraphic biozone - for fossil data only'),
    buildColumn('Fossil preservation type', 'sampleSet.fossilPreservationTypes[, ]',
        'Type of fossil preservation - for fossil data only'),
    buildColumn('Environment', 'sampleSet.environments[, ]',
        'Environment in which the sample was sampled in (not where it was eventually studied after sampling)'),
    buildColumn('Life history style', 'moultingCharacters.lifeHistoryStyle',
        'Whether individuals of this species show direct development from juvenile to adulthood, or whether this development is punctuated by metamorphosis'),
    buildColumn('Life mode', 'moultingCharacters.lifeModes[, ]',
        'Benthic for animals that are not fixed to the sea floor (swimming occasionally included), and epifaunal is fixed to the seafloor'),
    buildColumn('Number of juvenile moults', 'moultingCharacters.juvenileMoultCount',
        'Number of moults before reaching sexual maturity'),
    buildColumn('Number of major morphological transitions',
        'moultingCharacters.majorMorphologicalTransitionCount', 'Number of major morphological transitions'),
    buildColumn('Adult stage moulting', 'moultingCharacters.hasTerminalAdultStage',
        'Whether there is a terminal adult moult (=true) or it\'s a continued moulting (=false) during adult stage'),
    buildColumn('Observed # total moult stages', 'moultingCharacters.observedMoultCount',
        'Number of separate moult stages observed and described for this species\' development'),
    buildColumn('Estimated # moult stages', 'moultingCharacters.estimatedMoultCount',
        'Number of separate moult stages estimated for this species\' development'),
    buildColumn('Segment addition mode', 'moultingCharacters.segmentAdditionMode',
        'Mode in which the species adds segments through its life history'),
    buildColumn('# body segments in adult individuals', 'moultingCharacters.bodySegmentCountInAdults',
        'Total number of body segments in adult individuals of the species'),
    buildColumn('# body segments per moult stage', 'moultingCharacters.bodySegmentCount',
        'Number of body segments added by individuals of the species at each moult stage'),
    buildColumn('Average body length increase from previous moult (in mm)', 'moultingCharacters.bodyLengthIncreaseAverage',
        'Average quantity by which total body length increases from previous moult stage in this species'),
    buildColumn('Average body length (in mm)', 'moultingCharacters.bodyLengthAverage',
        'Average body length of individuals at this defined and observed moult stage (defined by cond)'),
    buildColumn('Average width length increase from previous moult (in mm)', 'moultingCharacters.bodyWidthIncreaseAverage',
        'Average quantity by which total body length increases from previous moult stage in this species'),
    buildColumn('Average width length (in mm)', 'moultingCharacters.bodyWidthAverage',
        'Average body width of individuals at this defined and observed moult stage (defined by cond)'),
    buildColumn('Average body mass increase from previous moult (in g)', 'moultingCharacters.bodyMassIncreaseAverage',
        'Average quantity by which total body mass increases from previous moult stage in this species. ' +
        'Measurements should not be taken during the early post-moult phase'),
    buildColumn('Observed moult stage period (in days)', 'moultingCharacters.devStagePeriod',
        'How long is the ontogenetic stage period on average'),
    buildColumn('Intermoult period (in days)', 'moultingCharacters.intermoultPeriod',
        'How long is the intermoult period on average, specific for a stage'),
    buildColumn('Pre-moult period (in days)', 'moultingCharacters.premoultPeriod',
        'How long is the pre-moult period on average, specific for a stage'),
    buildColumn('Post-moult period (in days)', 'moultingCharacters.postmoultPeriod',
        'Time specifically in post-moult period before fully hardened/sclerotized exoskeleton'),
    buildColumn('Variation in moulting time within cohorts (in days)', 'moultingCharacters.variationWithinCohorts',
        'Synchronization in moulting withing a sibling cohort'),
    buildColumn('Cephalic suture location', 'moultingCharacters.cephalicSutureLocations[, ]',
        'Locations of cephalic sutures if cephalic moulting sutures are used'),
    buildColumn('Post-cephalic suture location', 'moultingCharacters.postCephalicSutureLocations[, ]',
        'Locations of post-cephalic sutures if post-cephalic moulting is used'),
    buildColumn('Resulting named moulting configurations', 'moultingCharacters.resultingNamedMoultingConfigurations[, ]',
        'Moult configurations resulting from a moulting event in the species formally described and named'),
    buildColumn('Post-moult cuticle calcification event', 'moultingCharacters.calcificationEvent',
        'Calcification and its degree if presents'),
    buildColumn('Post-moult heavy metal reinforcement of the cuticle', 'moultingCharacters.heavyMetalReinforcements[, ]',
        'Heavy metal incorporation into the cuticle, and specific metals if present'),
    buildColumn('Quality of fossil exuviae', 'moultingCharacters.fossilExuviaeQualities[, ]',
        'Preservational quality of fossil moults for the sample'),
];

class MoultingCharacters extends Component {

    constructor(props) {
        super(props);
        this.mcharactersRef = React.createRef();
    }
    
    componentDidMount() {
        const table = $(this.mcharactersRef.current).DataTable({
            order: [[10, 'asc'], [0, 'asc'], [1, 'asc']],
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
                sSearch: "Global filter"
            },
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
            columns,
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

        // Allow to toggle the column visibility
        $("input.toggle-vis").change(function() {
            let columnIdx = this.getAttribute('data-column');
            let column = table.column(columnIdx);
            column.visible(this.checked);
        });

        // Enable Bootstrap tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    componentWillUnmount(){
        $('.data-table-wrapper').find('#mc-result').DataTable().destroy(true);
    }
    
    render() {
        return (
            <div>
                <div className="dt-buttons">
                    <button id="toggleColumnsButton" className="dt-button" type="button" data-bs-toggle="offcanvas"
                            data-bs-target="#toggleColumns" aria-controls="toggleColumns">
                        Customize columns
                    </button>
                </div>

                <div className="offcanvas offcanvas-start" tabIndex="-1" id="toggleColumns"
                     aria-labelledby="toggleColumnsLabel">
                    <div className="offcanvas-header">
                        <p className="offcanvas-title" id="toggleColumnsLabel">Customize columns</p>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        {columns.map((item, idx) => (
                            <div key={"checkbox-div-" + idx}>
                                <input id={"checkbox-" + idx} className="toggle-vis" data-column={idx}
                                       type="checkbox" defaultChecked="true"/>
                                <label htmlFor={"checkbox-" + idx}>{item.name ? item.name : item.title}</label>
                            </div>))}
                    </div>
                </div>
                <table id="mc-result" ref={this.mcharactersRef}
                       className={'table table-sm table-striped table-bordered table-hover'}>
                </table>
            </div>);
    }
}

export default MoultingCharacters;
