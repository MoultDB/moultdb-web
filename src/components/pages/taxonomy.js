import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "react-arborist";
import { Link, useParams } from "react-router-dom";
import MoultdbService from "../../services/moultdb.service";
import { getTaxonUrlFromAccession } from "../../common/link-utils";
import Loading from "../data/loading";
import ChangePageTitle from "../../common/change-page-title";
import "./taxonomy.css";

function Node({ node, style }) {
    
    const icon = node.data.isBranch ?
        (node.isOpen ? <span className="close-row"></span> : <span className="open-row"></span>)
        : <span className="leaf-row"></span>;
    
    // Stop propagation to prevent node toggle when the link is clicked
    const handleLinkClick = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className="taxonomy-tree-node" style={style} onClick={() => node.data.isBranch && node.toggle()}>
            <div className="row ttn-row">
                <span className="ttn-cell col " >{icon} {node.data.name}</span>
                <span className="ttn-cell col-auto count-col">{node.data.statistics.speciesCount}</span>
                <span className="ttn-cell col-auto count-col">{node.data.statistics.genomeCount}</span>
                <span className="ttn-cell col-auto count-col">{node.data.statistics.taxonAnnotationCount}</span>
                <span className="ttn-cell col-auto text-col">
                    <Link to={getTaxonUrlFromAccession(node.data.accession)} className="node-link" onClick={handleLinkClick}>
                        see taxon page
                    </Link>
                </span>
            </div>
        </div>
    );
}

export default function Taxonomy() {
    const [treeData, setTreeData] = useState([]);
    const [root, setRoot] = useState(null);
    const [loading, setLoading] = useState(true);
    const [childrenLoading, setChildrenLoading] = useState(false);
    const treeRef = useRef(null);
    const { datasource, accession } = useParams();
    
    useEffect(() => {
        const fetchRoot = async () => {
            setLoading(true);
            try {
                const isValidParams = datasource && accession;
                const source = isValidParams ? datasource : "gbif";
                const acc = isValidParams ? accession : "54";
                const response = await MoultdbService.getTaxonStats(source, acc);
                const rootTaxon = response?.data?.data;
                
                // Set data only if rootTaxon exists, otherwise empty array
                setTreeData(rootTaxon ? [rootTaxon] : []);
                setRoot(rootTaxon ? rootTaxon : null);
            } catch (err) {
                console.error("Error loading root:", err);
                setTreeData([]); // Set empty on error to prevent crash
                setRoot(null);
            } finally {
                setLoading(false);
            }
        };
        fetchRoot();
    }, [datasource, accession]);
    
    // Utility function: add children to a node by ID in the data tree
    const addChildrenToNode = useCallback((treeData, nodeId, children) => {
        return treeData.map((node) => {
            if (node.id === nodeId) {
                return { ...node, children, loaded: true };
            } else if (node.children?.length) {
                return {
                    ...node,
                    children: addChildrenToNode(node.children, nodeId, children),
                };
            }
            return node;
        });
    }, []);
    
    const handleLoadChildren = useCallback(
        async (nodeId) => {
            const treeApi = treeRef.current;
            if (!treeApi) return;
            
            const node = treeApi.get(nodeId);
            
            if (!node || !node.data.isBranch || node.data.children) return;
            
            setChildrenLoading(true);
            try {
                const children = await MoultdbService.getTaxonDirectChildrenStats(node.id);
                setTreeData((prev) => addChildrenToNode(prev, node.id, children.data));
            } catch (err) {
                console.error("Error loading children :", err);
            } finally {
                setChildrenLoading(false);
            }
        },
        [addChildrenToNode]
    );
    
    return (
        <main id={"taxonomy-page"} className={"container"}>
            <ChangePageTitle pageTitle={`Taxonomy${root?.name && `: ${root.name}`}`} />
            <div className="row">
                <div className="col-8 offset-2 text-center">
                    <h1>Taxonomy{root?.name && `: ${root.name}`}</h1>
                </div>
            </div>

            {loading ?
                <Loading /> :
                <>
                    {!root && treeData.length === 0 ?
                            <div className="alert alert-warning" role="alert">
                                Taxon not found.<br/>
                                Please check the taxon accession in the URL or go to the page 
                                <Link to="/taxonomy">Taxonomy</Link> to browse all Arthropoda taxa.
                            </div>
                        :
                        <div className="taxonomy-tree">
                            <div className="taxonomy-tree-header">
                                <div className="row">
                                    <span className="col">{childrenLoading && <Loading text={"Fetching children..."} />}</span>
                                    <span className="col-auto count-col">Species</span>
                                    <span className="col-auto count-col">Genomes</span>
                                    <span className="col-auto count-col">Moulting characters</span>
                                    <span className="col-auto text-col">Link to taxon details</span>
                                </div>
                            </div>
                            <Tree
                                ref={treeRef}
                                data={treeData}
                                openByDefault={false}
                                onToggle={handleLoadChildren}
                                width={"100%"}
                            >
                                {Node}
                            </Tree>
                        </div>
                    }
                </>
            }
        </main>
    );
}
