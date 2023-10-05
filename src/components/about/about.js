import React, {useEffect} from 'react';

export default function About() {

    useEffect(() => {
        document.title = "MoultDB - About"
    }, []);

    return (
        <div className="row">
            <div className='col-sm-10 offset-sm-1'>
                <h1>About MoultDB</h1>

                <div>
                    <p>This page provides details on MoultDB:</p>
                    <ul className={"documentation-menu"}>
                        <li><a href="#what-is-moultdb">What is MoultDB?</a></li>
                        <li><a href="#who-are-we">Who are we?</a></li>
                        <li><a href="#funding-sources">Funding source</a></li>
                    </ul>
                </div>
                <dl>
                    <dt><h2 id={"what-is-moultdb"}>What is MoultDB?</h2></dt>
                    <dd>
                        <p>Arthropods are the most diverse phylum on Earth, inhabiting virtually all ecosystems and
                            playing important roles in the natural environment as well as in agriculture and human health.
                            Their segmented body plans allow modularity and evolvability, with a spectacularly large variety
                            of life histories. Their exoskeleton imposes periodic moults, but also provides opportunities
                            for specialisation or plasticity. Thus moulting is both a key step in each arthropod’s life
                            history, and a key to understanding arthropod diversity.This project brings together researchers
                            with complementary expertise to address three main goals unified through the theme of arthropod
                            moulting as a key life history trait. The first is to establish broad evolutionary trends across
                            groups of extant and extinct arthropods by building and analysing a comprehensive compendium of
                            arthropod moulting characteristics. The second main goal is to determine how moulting modes
                            observed today evolved from ancient diversity. The comparisons aim to define which aspects -in
                            terms of genes and pathways or networks and the biological processes they control- of moulting
                            are ancestral versus derived, to then relate these to ecological changes and species
                            diversifications and trace the evolutionary paths of moulting. This leads to the final goal
                            focusing specifically on the evolutionary flexibility of moulting and its role in arthropod
                            terrestrialisation events.</p>
                        <p>We will compile currently dispersed knowledge from all relevant fields (paleontology to genomics)
                            in an integrated database, MoultDB, covering a large number and variety of species, from which
                            we will establish broad trends in the characteristics and evolution of moulting in arthropods.
                            This will also answer the first goal, and serve as a foundation for the other project goals.
                            We will then generate genomes and moulting transcriptomes in diverse arthropods. Comparative
                            analysis of these data, guided by re-analysis of paleontological and phylogenetic trends, will
                            allow us to answer the second goal. Building on outcomes from the first two goals, we will
                            compare moulting characteristics (extant and extinct), as well as genetic and molecular
                            processes that direct moulting, in terrestrial versus aquatic taxa to learn how moulting
                            plasticity could have facilitated or constrained these transitions.</p>
                        <p>We expect to obtain a much improved understanding of the evolutionary and functional
                            mechanisms which underpin arthropod diversity and adaptation, both in the broad picture and in specific examples.
                            The integration of different data and expertise will shed new light on existing fossils, and
                            allow better interpretation of genomic and functional data. MoultDB will provide important
                            resources for the community and future research, and set an example of integrating
                            paleontological, morphological and genomic data together. Finally, this project will provide
                            the impetus for more and better integration of different approaches to biodiversity in future
                            studies, by these groups and others.</p>
                    </dd>
                    <dt><h2 id={"who-are-we"}>Who are we?</h2></dt>
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
                    <dt><h2 id={"funding-sources"}>Funding source</h2></dt>
                    <dd>MoultDB is the result of a <a href="http://p3.snf.ch/project-198691" rel="noopener noreferrer" target="_blank">
                        Sinergia collaborative project</a> funded by the <a href="https://www.snf.ch/en" rel="noopener noreferrer" target="_blank">
                        Swiss National Science Foundation</a>.
                    </dd>
                </dl>
            </div>
        </div>
    );
}