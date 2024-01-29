import React, {Component} from 'react';
import "datatables.net-dt/css/jquery.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css"
import "datatables.net-responsive-dt/css/responsive.dataTables.css"
import {getMainUrl} from "../../common/taxon-utils";


const $ = require('jquery');
$.DataTable = require( 'datatables.net-dt' );
$.DataTable = require( 'datatables.net-buttons-dt' );
$.DataTable = require( 'datatables.net-buttons/js/buttons.html5.js' );

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
    { title: 'Species', data: 'taxon',
        render: function ( data, type, full ) {
            if (data) {
                return '<a href='+getMainUrl(data)+'>' + data.scientificName + '</a>'
            }
            return '';
        }
    },
    { title: 'GenBank', data: 'geneBankAcc',
        render: function ( data, type, full ) {
            if (data) {
                return '<a href="https://www.ncbi.nlm.nih.gov/data-hub/genome/' + data 
                    + '" target="_blank" rel="noopener noreferrer">' + data + '</a>'
            }
            return '';
        }
    },
    { title: 'Submission Date', data: 'submissionDate'},
    { title: 'Length', data: 'length'},
    { title: 'Scaffolds', data: 'scaffolds'},
    { title: 'Scaffold L50', data: 'scaffoldL50'},
    { title: 'Scaffold N50', data: 'scaffoldN50'},
    { title: 'Annotation Date', data: 'annotationDate'},
    { title: 'Total genes', data: 'totalGenes'},
    { title: 'Arthropoda Complete', data: 'completeBusco'},
    { title: 'Arthropoda Single', data: 'singleBusco'},
    { title: 'Arthropoda Duplicated', data: 'duplicatedBusco'},
    { title: 'Arthropoda Fragmented', data: 'fragmentedBusco'},
    { title: 'Arthropoda Missing', data: 'missingBusco'},
];

class GenomeData extends Component {

    componentDidMount() {
        $(this.refs.gdata).DataTable({
            order: [[1, 'asc'], [2, 'asc']],
            dom:"<'row'<'col-sm-4'l><'col-sm-4'i><'col-sm-4 browse-search'f>>" +
                "<'row my-1'<'data-table-wrapper col-sm-12'tr>>" +
                "<'row'<'col-sm-6 btn-download'B><'col-sm-6'p>>",
            oLanguage: {
                sSearch: "Filter:"
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
            data: this.props.genomeData,
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
                    title: 'MoultDB export - genomes'
                }
            ]
        });
    }
    componentWillUnmount(){
        $('.data-table-wrapper').find('#genome-result').DataTable().destroy(true);
    }

    render() {
        return (<div>
                <div className={"result-info mb-3"}>
                    <p>Clicking on the <span className={"open-row"}/> sign shows the full information for each row.</p>
                </div>

                <table id="genome-result" ref="gdata"
                       className={'table table-sm table-striped table-bordered table-hover responsive '}>
                </table>
            </div>
        )
    }
}

export default GenomeData;
