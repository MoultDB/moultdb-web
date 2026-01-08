import React, { useCallback, useEffect, useRef, useState } from "react";
import { Tree } from "react-arborist";
import { Link, useParams } from "react-router-dom";
import MoultdbService from "../../services/moultdb.service";
import { getTaxonUrlFromAccession } from "../../common/link-utils";
import "./taxonomy.css";
import Loading from "../data/loading";
import ChangePageTitle from "../../common/change-page-title";

function Node({ node, style }) {
    
    const icon = node.isLoading ? "⏳" : node.data.isBranch ? (node.isOpen ? "📂" : "📁") : "🍃";
    
    // Stop propagation to prevent node toggle when link is clicked
    const handleLinkClick = (e) => {
        e.stopPropagation();
    };
    
    return (
        <div className="node-container" style={style} >
            <div className="node-content" onClick={() => node.data.isBranch && node.toggle()}>
                {icon}
                <span className="node-text"> {node.data.name}</span>
                <span className="node-counts">
                    (
                    {node.data.isBranch &&
                        <>{node.data.statistics.speciesCount} species, </>
                    }
                    {node.data.statistics.genomeCount} genome{node.data.statistics.genomeCount>1 && "s"}, {node.data.statistics.taxonAnnotationCount} moult. charac.
                    )
                </span>
                <Link to={getTaxonUrlFromAccession(node.data.accession)} className="node-link" onClick={handleLinkClick}>
                    see details
                </Link>
            </div>
        </div>
    );
}

export default function Taxonomy() {
    const [treeData, setTreeData] = useState([]);
    const [root, setRoot] = useState(null);
    const [loading, setLoading] = useState(true);
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
            try {
                const children = await MoultdbService.getTaxonDirectChildrenStats(node.id);
                setTreeData((prev) => addChildrenToNode(prev, node.id, children.data));
            } catch (err) {
                console.error("Error loading children :", err);
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
                <Tree
                    ref={treeRef}
                    data={treeData}
                    openByDefault={false}
                    onToggle={handleLoadChildren}
                    width={"100%"}
                >
                    {Node}
                </Tree>
            }
        </main>
    );
}
