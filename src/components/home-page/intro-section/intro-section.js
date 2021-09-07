import React from 'react';

export default function IntroSection() {
    return (
        <section>
            <h2>MoultDB</h2>
            <p>MoultDB is a resource on moulting in arthropods (from paleontology to genomics). We will compile currently
                dispersed knowledge from all relevant fields in an integrated database, covering a large number and
                variety of species, from which we will establish broad trends in the characteristics and evolution of
                moulting in arthropods. <a href={"/about/moultdb"}>See more details...</a></p>
        </section>
    );
}