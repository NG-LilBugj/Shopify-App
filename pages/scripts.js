import gql from "graphql-tag"
import {useQuery, useMutation} from "@apollo/react-hooks"
import {Button, Card, DatePicker, EmptyState, Layout, Page, ResourceList, TextField} from "@shopify/polaris";
import {useCallback, useState} from "react";

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
    const [initBar, setInitBar] = useState(false);
    const [name, setName] = useState('');

    const [{month, year}, setDate] = useState({
        month: 1,
        year: 2018,
    });
    const [selectedStartDate, setSelectedStartDate] = useState({
        start: new Date(),
    });
    const [selectedEndDate, setSelectedEndDate] = useState({
        end: new Date('Wed Aug 08 2020 00:00:00 GMT-0300 (EST)'),
    });

    const handleMonthChange = useCallback(
        (month, year) => setDate({month, year}),
        [],
    );

    if (!!loading) return <h1>LOADING...</h1>;
    if (!!error) return <div>{error.message}</div>;

    debugger
    return (
        <Page>
            {!initBar && <Layout>
                <Layout.Section>
                    <Card title={"Timebar"}>

                    </Card>
                </Layout.Section>
                {!(data.scriptTags.edges.length) && <Layout.Section>
                    <EmptyState
                        heading={"Time Banner"}
                    image={'https://sct.spur-i-t.com/img/icons/empty-state.svg'}>
                        <Button
                            primary
                            size={"slim"}
                            type={"submit"}
                            onClick={() => {
                                setInitBar(true)
                            }}
                        >
                            Create Bar
                        </Button>
                    </EmptyState>
                </Layout.Section>}
                {!!(data.scriptTags.edges.length) && <Layout.Section>
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
            </Layout>}
            {initBar && <Layout>
                <Layout.Section>
                    <Card title={'Banner name:'} sectioned>
                        <TextField
                            label={'name'}
                            value={name}
                            onChange={(value) => {setName(value)}}
                        />
                    </Card>
                    <Card title={'Start time'} sectioned>
                        <DatePicker
                            month={month}
                            year={year}
                            onChange={setSelectedStartDate}
                            onMonthChange={handleMonthChange}
                            selected={selectedStartDate}
                        />
                    </Card>
                    <Card title={'ENd Time'} sectioned>
                        <DatePicker
                            month={month}
                            year={year}
                            onChange={setSelectedEndDate}
                            onMonthChange={handleMonthChange}
                            selected={selectedEndDate}
                            size={'slim'}
                        />
                    </Card>
                    <Card title={'Timer display'} sectioned>

                    </Card>
                </Layout.Section>
            </Layout>}
        </Page>
    )
};

export default Scripts;