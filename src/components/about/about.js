import React from 'react';

export default function About() {
    return (
        <div className="row">
            <div className='col-sm-10 offset-sm-1'>
                <h1>About MoultDB</h1>
                <dl>
                    <dt><h2>What is MoultDB?</h2></dt>
                    <dd>MoultDB is a resource on moulting in arthropods (from paleontology to genomics).</dd>
                    <dt><h2>Who are we?</h2></dt>
                    <dd>MoultDB is developed by :
                        <ul>
                            <li>The <a href="https://wp.unil.ch/paleo/page-exemple/arthropod-moulting/" rel="noopener noreferrer" target="_blank">
                                ANOM Lab</a> at the University of Lausanne;</li>
                            <li>The <a href="https://www.bio.huji.ac.il/en/content/chipman-ariel" rel="noopener noreferrer" target="_blank">
                                Developmental & Evolutionary Biology group</a> at the Hebrew University of Jerusalem;</li>
                            <li>The <a href="https://www.unil.ch/dee/robinson-rechavi-group" rel="noopener noreferrer" target="_blank">
                                Evolutionary Bioinformatics group</a> at the University of Lausanne and the SIB Swiss Institute of Bioinformatics.</li>
                            <li>The <a href="https://www.unil.ch/dee/waterhouse-group" rel="noopener noreferrer" target="_blank">
                                Evolutionary-Functional Genomics group</a> at the University of Lausanne;</li>
                        </ul>
                    </dd>
                    <dt><h2>Funding source</h2></dt>
                    <dd>MoultDB is the result of a <a href="http://p3.snf.ch/project-198691" rel="noopener noreferrer" target="_blank">
                        Sinergia collaborative project</a> funded by the <a href="https://www.snf.ch/en" rel="noopener noreferrer" target="_blank">
                        Swiss National Science Foundation</a>.
                    </dd>
                </dl>
            </div>
        </div>
    );
}