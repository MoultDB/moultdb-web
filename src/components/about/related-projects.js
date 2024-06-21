import React, {useEffect} from 'react';

export default function RelatedProjects() {

    useEffect(() => {
        document.title = "MoultDB - Related projects"
    }, []);

    return (
        <main className="row">
            <div className='col-sm-10 offset-sm-1'>
                <h1>Related projects</h1>

                <div>
                    <p>This page provides projects related to the MoultDB (in alphabetical order):</p>
                    <ul className={"documentation-menu"}>
                        <li><a href="#bgee-desc">Bgee - gene expression data in animals</a></li>
                        <li><a href="#erga-desc">ERGA - European Reference Genome Atlas</a></li>
                        <li><a href="#selectome-desc">Selectome - positive selection database</a></li>
                    </ul>
                </div>

                <dl>
                    <dt><h2 id={"bgee-desc"}>Bgee - gene expression data in animals</h2></dt>
                    <dd>
                        <p><a href="https://bgee.org" title="Bgee" rel="noopener noreferrer" target="_blank">Bgee</a> is a database for retrieval and comparison of gene expression patterns across multiple animal species, produced from multiple data types (RNA-Seq, Affymetrix, in situ hybridization, and EST data) and from multiple data sets (including <a
                        href="https://www.gtexportal.org/home/" title="GTEx portal" rel="noopener noreferrer" target="_blank">GTEx data</a>).</p>
                        <p>Bgee is based exclusively on curated "normal", healthy wild-type, expression data (e.g., no gene knock-out, no treatment, no disease), to provide a comparable reference of normal gene expression.</p>
                        <p>Bgee produces calls of presence/absence of expression, and of differential over-/under-expression, integrated along with information of gene orthology, and of homology between organs. This allows comparisons of expression patterns between species.</p>
                    </dd>
                    <dt><h2 id={"erga-desc"}>ERGA - European Reference Genome Atlas</h2></dt>
                    <dd>
                        <p><a href="https://vertebrategenomesproject.org/erga" title="ERGA" rel="noopener noreferrer" target="_blank">ERGA</a> is an initiative with the goal of capturing the biodiversity of Europe by sequencing and generating reference-quality genomes for representatives of the over 200 thousands European species of eukaryotes, not yet done, ranging from species of importance for agriculture, pests, ecosystem function and stability to endangered species.</p>
                    </dd>
                    <dt><h2 id={"selectome-desc"}>Selectome - positive selection database</h2></dt>
                    <dd>
                        <p><a href="https://selectome.org" title="Selectome" rel="noopener noreferrer" target="_blank">Selectome</a> Selectome is a database of positive selection based on rigorous alignment filtering method and branch-site specific likelihood test. Positive selection is detected using <a href="https://bitbucket.org/Davydov/godon" rel="noopener noreferrer" target="_blank">GODON</a> on all branches of animal gene trees.</p>
                        <p>Selectome enables queries according both to the results of positive selection tests, and to gene related criteria. Test results including positively selected sites can be visualized on the tree, and on the protein sequence alignment.</p>
                    </dd>
                </dl>
            </div>
        </main>
    );
}