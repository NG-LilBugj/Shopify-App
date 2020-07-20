import {Button, Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";

const BannerVariants = (props) => {
    return(
        <Page>
            <Layout>
                <DisplayText size={'large'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-around", height: '60vh'}}>
                    <Layout.Section>
                        <Card sectioned>
                            <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                        <Heading>
                            Banner first
                        </Heading>
                        <p>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </p>
                                </div>
                                <img alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                        <Heading>
                            Banner second
                        </Heading>
                        <p>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </p>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                        <Heading>
                            Banner third
                        </Heading>
                        <p>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </p>
                        </Card>
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