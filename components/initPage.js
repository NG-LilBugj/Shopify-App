import {Button, DisplayText, Heading, Layout, Page} from "@shopify/polaris";


const InitPage = (props) => {
    return(
        <Page>
            <Layout>
                <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center", width: '100%', height: '100%'}}>
                    <div style={{display: "flex", flexDirection: "column", width: "30%", height: "90%", justifyContent: "space-evenly"}}>
                        <DisplayText size={'extraLarge'}>
                            TopSale Countdown Banner
                        </DisplayText>
                        <DisplayText size="small">
                            Increase sales with urgency, countdown timer, labels and awesome banners
                        </DisplayText>
                        <Button
                            primary
                            type={"submit"}
                            onClick={() => {
                                props.setInitBar(true)
                            }}
                        >
                            Create Banner
                        </Button>
                    </div>
                    <img src={'https://lil-proxy.herokuapp.com/static/sale.gif'} alt={'sale'}/>
                </div>
            </Layout>
        </Page>
    )
};

export default InitPage