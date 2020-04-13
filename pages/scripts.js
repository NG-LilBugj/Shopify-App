import gql from "graphql-tag"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {Button, Card, Layout, Page, ResourceList} from "@shopify/polaris";

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
        <Page>
            <Layout>
                <Layout.Section>
                    <Card title={"Timebar"}>

                    </Card>
                </Layout.Section>
                {!data && <Layout.Section>
                    <Card title={"Create Timebar"} sectioned>
                        <Button
                            primary
                            size={"slim"}
                            type={"submit"}
                            onClick={() => {
                                createScript({
                                    variables: {
                                        input: {
                                            src: "https://47c3aa5c.ngrok.io/script.js", displayScope: "ALL"
                                        },
                                        refetchQueries: [{query: QUERY_SCRIPTTAGS}]
                                    }
                                })
                            }}
                        >
                            Create Bar
                        </Button>
                    </Card>
                </Layout.Section>}
                {!!data && <Layout.Section>
                    <Card title={"Delete Timebar"} sectioned>
                        <Button
                            primary
                            size={"slim"}
                            type={"submit"}
                            onClick={() => {
                                deleteScript({
                                    variables: {
                                        id: data.scriptTags.edges[0].node.id,
                                        refetchQueries: [{query: QUERY_SCRIPTTAGS}]
                                    }
                                })
                            }}>
                            Delete Bar
                        </Button>
                    </Card>
                </Layout.Section>}
                <Layout.Section>
                    <Card title={'Bars'} sectioned>
                        <ResourceList
                            showHeader
                            resourceName={'Bar'}
                            items={data.scriptTags.edges}
                            renderItem={item => {
                                return (
                                    <ResourceList.Item
                                        id={item.id}
                                    >
                                        <Stack>
                                            <Stack.Item>
                                                <p>
                                                    {item.node.id}
                                                </p>
                                            </Stack.Item>
                                            <Stack.Item>
                                            </Stack.Item>
                                        </Stack>
                                    </ResourceList.Item>
                                )
                            }}
                        />
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

export default Scripts;