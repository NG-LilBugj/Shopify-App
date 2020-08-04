import {
    Autocomplete,
    Banner,
    Button,
    Card,
    Heading,
    Icon,
    Layout,
    Page,
    TextField
} from "@shopify/polaris";
import {DeleteMajorMonotone, SearchMinor, SettingsMajorMonotone} from "@shopify/polaris-icons";
import {ResourcePicker} from "@shopify/app-bridge-react";
import Link from "next/link";
import Product from "../components/product";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Scroll from "react-scroll";
import {connect} from "react-redux";
import {handlePopupProducts, setPopupId} from "../redux/configsReducer";

const Animations = (props) => {

    useEffect(() => { // side effect function to fetch data from main server (get endpoint for animations)
        if (props.dispatchedId) {
            console.log(props.config.script.find(c => c.id === props.dispatchedId));
            fetchData(props.config.script.find(c => c.id === props.dispatchedId))
        }
    }, []);

    const [animData, fetchData] = useState({config: false, status: ''});
    //async state

    const [name, setName] = useState('');
    const [messageText, setMessageText] = useState('');
    const [pickedAnimation, pickAnimation] = useState(0);
    const [animationRenderValue, setBannerValue] = useState('.product-single__title/append');
    const [products, setProducts] = useState([]);
    const [isAllProducts, pickAllProducts] = useState(false);
    //data state

    const [inputSearchValue, setInputValue] = useState('');
    const [isProductsOpen, setProductsOpen] = useState(false);
    //local state

    const [nameTouch, handleNameTouch] = useState(false);
    const [switchTouch, setSwitchTouch] = useState(false);
    //error state

    let handleProductSelection = (products) => { //callback to pick products where animation is shown
        setProducts(products.selection.map(p => ({title: p.title, photo: p.images[0].originalSrc, id: p.handle})));
        setProductsOpen(false);
        console.log(products)
    };

    let handleSearchFieldChange = (value) => {
        //callback to pick products where animation is shown (on search field)
        if (!isAllProducts) {
            setProductsOpen(true);
            setInputValue(value)
        }
    };

    const handleSubmit = async () => {
        if (!name || !messageText){
            Scroll.animateScroll.scrollToTop();
            setSwitchTouch(true)
        }
        else {
            // users errors handler (if user forgets to fill name field)

            // if there is no data received from server, function makes POST request, but if there is data to edit,
            // function makes PUT request
            if (!props.dispatchedId) {
                let res = await axios.post('https://lil-shopify.herokuapp.com/api/animation', {
                    name,
                    pickedAnimation,
                    badgeRenderValue: animationRenderValue,
                    message: messageText,
                    products,
                    isAllProducts
                });
                console.log(res.data);
                props.setPopupId(0);
                // HTTP Post request to main server
            }
            else {
                let res = await axios.put(`https://lil-shopify.herokuapp.com/api/animation`, {
                    id: props.dispatchedId,
                    name,
                    pickedAnimation,
                    badgeRenderValue: animationRenderValue,
                    message: messageText,
                    products,
                    isAllProducts
                });
                console.log(res.data);
                // HTTP Put request to main server
            }
        }
    };

    useEffect(() => {
        console.log('dispatched', products);
        props.handlePopupProducts(products, isAllProducts)
    }, [products]);

    useEffect(() => {
        setName(animData.id ? animData.configData.name : '');
        setMessageText(animData.id ? animData.configData.message : '');
        pickAnimation(animData.id ? animData.configData.pickedAnimation : 0);
        setBannerValue(animData.id ? animData.configData.badgeRenderValue : '.product-single__title/append');
        setProducts(animData.id ? animData.configData.products : []);
        pickAllProducts(animData.id ? animData.configData.isAllProducts : false);
    }, [animData]);
    // resettling data state when there is information from main server

    const searchField = (
        <Autocomplete.TextField
            onChange={handleSearchFieldChange}
            value={inputSearchValue}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
        />
    );

    return (
        <Page>
            <Layout>
                <ResourcePicker
                    allowMultiple
                    resourceType={"Product"}
                    open={isProductsOpen}
                    onSelection={(resources) => handleProductSelection(resources)}
                    onCancel={() => setProductsOpen(false)}
                />
                <Layout.Section>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            marginBottom: '25px'
                        }}>
                        <div style={{fontSize: '24px', fontWeight: '600'}}>
                            {props.strings.customize}
                        </div>
                        <Link href={!!name ? '/success' : '/badges'}>
                            <Button
                                primary
                                disabled={(pickedAnimation === 0)}
                                size={"medium"}
                                type={"submit"}
                                onClick={handleSubmit}
                            >
                                {props.strings.save}
                            </Button>
                        </Link>
                    </div>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.strings.bannerName} sectioned>
                        <TextField
                            label={''}
                            value={name}
                            placeholder={props.strings.enterName}
                            onChange={(value) => {
                                setName(value)
                            }}
                            error={((!name) && switchTouch) ? props.strings.pleaseEnterName : ''}
                        />
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.strings.pickAnimation} sectioned>
                        <div style={{display: "flex", flexWrap: "wrap", width: '100%'}}>
                            <div style={{borderColor: (pickedAnimation === 1) ? '#3333aa' : ""}}
                                 className={'img-container'} onClick={() => pickAnimation(1)}>
                                <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/gift.gif'} alt={'icon'}/></div>
                            <div style={{borderColor: (pickedAnimation === 2) ? '#3333aa' : ""}}
                                 className={'img-container'} onClick={() => pickAnimation(2)}>
                                <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/gift2.gif'} alt={'icon'}/></div>
                            <div style={{borderColor: (pickedAnimation === 3) ? '#3333aa' : ""}}
                                 className={'img-container'} onClick={() => pickAnimation(3)}>
                                <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/gift3.gif'} alt={'icon'}/></div>
                            <div style={{borderColor: (pickedAnimation === 4) ? '#3333aa' : ""}}
                                 className={'img-container'} onClick={() => pickAnimation(4)}>
                                <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/gift4.gif'} alt={'icon'}/></div>
                            <div style={{borderColor: (pickedAnimation === 5) ? '#3333aa' : ""}}
                                 className={'img-container'} onClick={() => pickAnimation(5)}>
                                <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/gift5.gif'} alt={'icon'}/></div>
                        </div>
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    <Card title={props.strings.messageText} sectioned>
                        <TextField
                            label={''}
                            onBlur={() => handleNameTouch(true)}
                            value={messageText}
                            placeholder={props.strings.enterText}
                            onChange={(value) => {
                                setMessageText(value)
                            }}
                            error={((!messageText) && switchTouch) ? props.strings.pleaseEnterText : ''}
                        />
                    </Card>
                </Layout.Section>
                <Layout.Section>
                    {props.warning.isWarning &&
                    <div style={{marginTop: '10px', marginBottom: '30px'}}>
                        <Banner
                            title={props.strings.warningTitle}
                            status="critical"
                        >
                            <p style={{marginTop: '10px', marginBottom: '10px'}}>
                                {props.strings.warningMessage}
                            </p>
                            <p style={{marginTop: '10px', marginBottom: '10px'}}>{props.strings.reason} {props.warning.reason.string}</p>
                            {(props.warning.reason.string === "display/products") &&
                            props.warning.reason.elements.map(p => <Product pickProducts={setProducts}
                                                                            products={products} {...p}/>)
                            }
                        </Banner>
                    </div>}
                    {console.log(props.warning.isWarning)}
                    <Card sectioned title={props.strings.bannerPlacement}>
                        <Heading>
                            {props.strings.productPagesWithPopup}
                        </Heading>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '520px',
                        }}>
                            <Autocomplete
                                onSelect={(value) => console.log(value)}
                                selected={[]}
                                options={[]}
                                textField={searchField}
                            />
                            <Button
                                disabled={isAllProducts}
                                size={"small"}
                                type={"submit"}
                                onClick={() => setProductsOpen(true)}
                            >
                                {props.strings.browseProducts}
                            </Button>
                            <Button
                                plain
                                onClick={() => pickAllProducts(!isAllProducts)}
                            >
                                {props.strings.pickAllProducts}
                            </Button>
                        </div>
                        {(!!products.length) && <div style={{
                            marginTop: '10px',
                            marginBottom: '10px'
                        }}>{products.map(p => <Product
                            pickProducts={setProducts}
                            products={products} {...p}/>)}
                        </div>}
                    </Card>
                </Layout.Section>
                <div style={{display: "flex", justifyContent: 'flex-end', width: '100%'}}>
                    <Link href={!!name ? '/success' : '/badges'}>
                        <Button
                            primary
                            size={"medium"}
                            type={"submit"}
                            onClick={handleSubmit}
                        >
                            {props.strings.save}
                        </Button>
                    </Link>
                </div>
            </Layout>
        </Page>
    )
};

const mapStateToProps = (state) => ({
    config: state.configsReducer.popupConfig,
    dispatchedId: state.configsReducer.dispatchedIds.popupId,
    warning: state.configsReducer.displayWarnings.popup,
    strings: state.localesReducer.stringsToDisplay.strings.animations,
    configStrings: state.localesReducer.stringsToDisplay.strings.existing_config
});

export default connect(mapStateToProps, {
    setPopupId,
    handlePopupProducts
})(Animations)