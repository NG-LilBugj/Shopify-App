import {Button, Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";

const BannerVariants = (props) => {
    return(
        <Page>
            <Layout>
                <DisplayText size={'extraLarge'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: '60vh'}}>
                    <Layout.Section>
                        <Card sectioned>
                        <Heading>
                            Banner first
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </DisplayText>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Heading>
                            Banner second
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </DisplayText>
                    </Layout.Section>
                    <Layout.Section>
                        <Heading>
                            Banner third
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </DisplayText>
                    </Layout.Section>
                </div>
                <Layout.Section>
                <div style={{display: "flex", justifyContent: "center", width: '100%'}}>
                    <Button
                        primary
                    >
                        Create
                    </Button>
                </div>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

export default BannerVariants