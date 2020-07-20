import {Button, Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";

const BannerVariants = (props) => {
    return(
        <Page>
            <Layout>
                <DisplayText size={'extraLarge'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                <div>
                    <Layout.Section>
                        <Heading>
                            Banner first
                        </Heading>
                        <DisplayText size={'small'}>
                            poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                        </DisplayText>
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
                <div>
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