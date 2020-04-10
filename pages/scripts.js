import gql from "graphql-tag"
import {useQuery, useMutation} from "@apollo/react-hooks"

const CREATE_SCRIPT_TAG = gql`
    mutation scriptTagCreate($input: ScriptTagInput!) {
        scriptTagCreate(input: $input) {
            scriptTag {
                id
            }
            userErrors {
                field
                message
            }
        }
    }       
`;

const DELETE_SCRIPT_TAG = gql`
    mutation scriptTagDelete($id: ID!) {
        scriptTagDelete(id: $id) {
            deletedScriptTagId
            userErrors {
                field
                message
            }
        }
    }
`;

const QUERY_SCRIPTTAGS = gql`
    query {
        scriptTags(first: 5) {
            edges {
                node {
                    id
                    src
                    displayScope
                }
            }
        }
    }
`;

const Scripts = () => {

    const [createScript] = useMutation(CREATE_SCRIPT_TAG);
    const [deleteScript] = useMutation(DELETE_SCRIPT_TAG);
    const {loading, error, data} = useQuery(QUERY_SCRIPTTAGS);

    if (!!loading) return <h1>LOADING...</h1>;
    if (!!error) return <div>{error.message}</div>;


    return (
        <div>
            <h1>Introduction to script tags</h1>

            {!!data && data.scriptTags.edges.map(i => <div key={i.node.id}>{i.node.src}</div>)};

            <button type={'primary'}
                    onClick={() => {
                        createScript({
                            variables: {
                                input: {
                                    src: "https://648619a7.ngrok.io/script.js", displayScope: "ALL"
                                },
                                refetchQueries: [{query: QUERY_SCRIPTTAGS}]
                            }
                        })
                    }
                    }>Add script</button>
            <button onClick={() => {
                deleteScript({
                    variables: {
                        id: data.scriptTags.edges[0].node.id,
                        refetchQueries: [{query: QUERY_SCRIPTTAGS}]
                    }
                })
            }}>Delete script</button>
        </div>
    )
};

export default Scripts;