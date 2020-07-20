import {Button, Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";

const BannerVariants = (props) => {
    return(
        <Page>
            <Layout>
                <DisplayText size={'extraLarge'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                <div>
                    <Card sectioned>
                        <Heading>
                            Banner first
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano forttress. Trant absorbes chaos energy
                        </DisplayText>
                    </Card>
                    <Card sectioned>
                        <Heading>
                            Banner second
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano forttress. Trant absorbes chaos energy
                        </DisplayText>
                    </Card>
                    <Card sectioned>
                        <Heading>
                            Banner third
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano forttress. Trant absorbes chaos energy
                        </DisplayText>
                    </Card>
                </div>
                <div>
                    <Button
                        primary
                    >
                        Create
                    </Button>
                </div>
            </Layout>
        </Page>
    )
};

export default BannerVariants