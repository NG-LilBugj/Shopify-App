import {Button, Card, DisplayText, Heading, Layout, Page} from "@shopify/polaris";

const BannerVariants = (props) => {
    return(
        <Page>
            <Layout>
                <div style={{marginBottom: '30px', marginTop: '30px'}}>
                <DisplayText size={'large'} element={'h1'}>
                    Which wat do you want to encreasy revenue?
                </DisplayText>
                </div>
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
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/flash_sale.png'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <Heading>
                                        Banner second
                                    </Heading>
                                    <p>
                                        poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                                    </p>
                                </div>
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/day_left.png'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned>
                            <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <Heading>
                                        Banner third
                                    </Heading>
                                    <p>
                                        poru elem necro manuscipto piano fortress. Trant absorbes chaos energy
                                    </p>
                                </div>
                                <img style={{width: '120px'}} src={'https://lil-proxy.herokuapp.com/static/gift.gif'} alt={'design'}/>
                            </div>
                        </Card>
                    </Layout.Section>
                </div>
                <Layout.Section>
                <div style={{display: "flex", justifyContent: "center", width: '100%', marginBottom: '30px', marginTop: '30px'}}>
                    <Button
                        primary
                    >
                        Continue
                    </Button>
                </div>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

export default BannerVariants