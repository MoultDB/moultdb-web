import React, {Component} from 'react';
import "./moulting-characters.css"
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css"
import "datatables.net-responsive-dt/css/responsive.dataTables.css"
import "datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.css"
import './data.css'
import {getSpeciesUrl, getUberonLink} from "../../common/link-utils";

const $ = require('jquery');
$.DataTable = require( 'datatables.net-dt' );
$.DataTable = require( 'datatables.net-buttons-dt' );
$.DataTable = require( 'datatables.net-buttons/js/buttons.html5.js' );
$.DataTable = require( 'datatables.net-responsive-dt' )
$.DataTable = require( 'datatables.net-searchbuilder-dt' );

const columns = [
    { title: 'Taxon', 
      data: 'taxon',
      render: function(data, type, full) {
          if (data) {
              let name = data.scientificName;
              if (full.authorSpeciesName !== data.scientificName && full.authorSpeciesName !== null) {
                  name = name + " (" + full.authorSpeciesName + ")";
              }
              return '<a href=' + getSpeciesUrl(data) + '>' + name + '</a>';
          }
          return '';
      }
    },
    { title: 'Moult stage', data: 'condition.devStage',
        render: function(devStage, type, full) {
            if (devStage) {
                return getUberonLink(devStage);
            }
            return '';
        }
    },
    { title: 'Moult stage author annotation', data: 'authorDevStage' },
    { title: 'Reproductive state', data: 'condition.reproductiveState' },
    { title: 'Type of specimens of interest', data: 'sampleSet.specimenTypes[, ]' },
    { title: 'Geological age', data: 'sampleSet.timePeriod',
      render: function ( data, type, full ) {
          if (data) {
              if (data.geologicalAgeFrom.name === data.geologicalAgeTo.name) {
                  return data.geologicalAgeFrom.name;
              }
              return data.geologicalAgeFrom.name + " to " + data.geologicalAgeTo.name;
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
    { title: 'Location of moulting suture', data: 'moultingCharacters.sutureLocations[, ]' },
    { title: 'Direction of egress during moulting', data: 'moultingCharacters.egressDirections[, ]' },
    { title: 'Position exuviae found in', data: 'moultingCharacters.positionsExuviaeFoundIn[, ]' },
    { title: 'Level of intraspecific variability in moulting mode', data: 'moultingCharacters.moultingVariability' },
    { title: 'Other behaviours associated with moulting', data: 'moultingCharacters.otherBehaviours[, ]' },
    { title: 'Consumption of exuviae', data: 'moultingCharacters.exuviaeConsumption' },
    { title: 'Reabsorption during moulting', data: 'moultingCharacters.reabsorption' },
    { title: 'Published reference: citation', data: 'article',
      render: function ( article, type, full ) {
          if (article) {
              let v = article.dbXrefs
                  .map((element, index) => {
                      if (element.xrefURL) {
                          return `<a href="${element.xrefURL}" rel="noopener noreferrer" target="_blank">${element.accession}</a>`
                      }
                      return `<span>${element.dataSource.shortName}: ${element.accession}</span>`
                  })
                  .join(', ');
              return `<div>${v}</div>`;
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
    { title: 'Life mode', data: 'moultingCharacters.lifeModes[, ]' },
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
    { title: 'Average width length increase from previous moult (in mm)', data: 'moultingCharacters.bodyWidthIncreaseAverage' },
    { title: 'Average width length (in mm)', data: 'moultingCharacters.bodyWidthAverage' },
    { title: 'Average body mass increase from previous moult (in g)', data: 'moultingCharacters.bodyMassIncreaseAverage' },
    { title: 'Observed moult stage period (in days)', data: 'moultingCharacters.devStagePeriod' },
    { title: 'Intermoult period (in days)', data: 'moultingCharacters.intermoultPeriod' },
    { title: 'Pre-moult period (in days)', data: 'moultingCharacters.premoultPeriod' },
    { title: 'Post-moult period (in days)', data: 'moultingCharacters.postmoultPeriod' },
    { title: 'Variation in moulting time within cohorts (in days)', data: 'moultingCharacters.variationWithinCohorts' },
    { title: 'Cephalic suture location', data: 'moultingCharacters.cephalicSutureLocations[, ]' },
    { title: 'Post-cephalic suture location', data: 'moultingCharacters.postCephalicSutureLocations[, ]' },
    { title: 'Resulting named moulting configurations', data: 'moultingCharacters.resultingNamedMoultingConfigurations[, ]' },
    { title: 'Post-moult cuticle calcification event', data: 'moultingCharacters.calcificationEvent' },
    { title: 'Post-moult heavy metal reinforcement of the cuticle', data: 'moultingCharacters.heavyMetalReinforcements[, ]' },
    { title: 'Quality of fossil exuviae', data: 'moultingCharacters.fossilExuviaeQualities[, ]' },
];

class MoultingCharacters extends Component {
    componentDidMount() {
        const table = $(this.refs.mcharacters).DataTable({
            order: [[0, 'asc'], [1, 'asc']],
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
                                <label htmlFor={"checkbox-" + idx}>{item.title}</label>
                            </div>))}
                    </div>
                </div>
                <table id="mc-result" ref="mcharacters"
                       className={'table table-sm table-striped table-bordered table-hover'}>
                </table>
            </div>);
    }
}

export default MoultingCharacters;
