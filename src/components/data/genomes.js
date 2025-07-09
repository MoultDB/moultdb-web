import React, {Component} from 'react';
import {getNCBIGenomeLink, getSpeciesUrl} from "../../common/link-utils";
import "datatables.net-dt/css/dataTables.dataTables.min.css"
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css"
import "datatables.net-searchbuilder-dt/css/searchBuilder.dataTables.css"
import "datatables.net-datetime/css/dataTables.dateTime.scss"
import './data.css'


const $ = require('jquery');
$.DataTable = require( 'datatables.net-dt' );
$.DataTable = require( 'datatables.net-buttons-dt' );
$.DataTable = require( 'datatables.net-buttons/js/buttons.html5.js' );
$.DataTable = require( 'datatables.net-searchbuilder-dt' );
$.DataTable = require( 'datatables.net-datetime' );

const columns = [
    { title: 'Species', data: 'taxon',
        render: function ( data ) {
            if (data) {
                return '<a href=' + getSpeciesUrl(data) + '>' + data.scientificName + '</a>'
            }
            return '';
        }
    },
    { title: 'GenBank/RefSeq', data: 'geneBankAcc',
        render: function ( data ) {
            if (data) {
                return getNCBIGenomeLink(data) ;
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
    { title: 'BUSCO Complete', data: 'completeBusco'},
    { title: 'BUSCO Single', data: 'singleBusco'},
    { title: 'BUSCO Duplicated', data: 'duplicatedBusco'},
    { title: 'BUSCO Fragmented', data: 'fragmentedBusco'},
    { title: 'BUSCO Missing', data: 'missingBusco'},
];

class GenomeData extends Component {

    constructor(props) {
        super(props);
        this.gdataRef = React.createRef();
    }

    componentDidMount() {
        $(this.gdataRef.current).DataTable({
            order: [[0, 'asc']],
            scrollX: true,
            dom:"<'row'<'col'Q>>" +
                "<'row'<'col page-length'l><'col text-center'i><'col text-end'f>>" +
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
                <table id="genome-result" ref={this.gdataRef}
                       className={'table table-sm table-striped table-bordered table-hover'}>
                </table>
            </div>
        )
    }
}

export default GenomeData;
