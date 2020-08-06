import {
    Autocomplete, Banner,
    Button,
    Card,
    Heading,
    Icon,
    Layout,
    Page,
    Pagination,
    Select,
    Stack,
    TextField
} from "@shopify/polaris";
import {useEffect, useState} from "react";
import "../public/index.css"
import axios from "axios";
import * as Scroll from "react-scroll";
import {DeleteMajorMonotone, SearchMinor, SettingsMajorMonotone} from "@shopify/polaris-icons";
import Link from "next/link";
import {ResourcePicker} from "@shopify/app-bridge-react";
import Product from "../components/product";
import {connect} from "react-redux";
import {handleSaleProducts, setSaleId} from "../redux/configsReducer";

const categories = [
    'Banners',
    'Badges',
];

const categoryVariant = (category, pickedBadge, pickBadge) => {
    switch (category) {
        case 'Banners': return(
            <div style={{display: "flex", flexWrap: "wrap", width: '100%'}}>
                <div style={{borderColor: (pickedBadge === 1) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(1)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner1.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 2) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(2)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner2.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 3) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(3)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner3.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 4) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(4)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner4.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 5) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(5)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner5.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 6) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(6)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner6.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 7) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(7)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner7.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 8) ? '#3333aa' : ""}}
                     className={'img-banner-container'} onClick={() => pickBadge(8)}>
                    <img style={{width: '600px'}} src={'https://lil-proxy.herokuapp.com/static/banner8.png'} alt={'icon'}/></div>
            </div>
        );
        case 'Badges': return(
            <div style={{display: "flex", flexWrap: "wrap", width: '100%'}}>
                <div style={{borderColor: (pickedBadge === 10) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(10)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge1.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 11) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(11)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge2.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 12) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(12)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge3.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 13) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(13)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge4.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 14) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(14)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge5.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 15) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(15)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge6.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 16) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(16)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge7.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 17) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(17)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge8.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 18) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(18)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge9.png'} alt={'icon'}/></div>
            </div>
        );
        case 'Third': return <div/>;
        case 'Some': return <div/>
    }
};

const Badges = (props) => {

    useEffect(() => {
        if (props.dispatchedId) {
            console.log(props.config.script.find(c => c.id === props.dispatchedId));
            console.log(props.config, props.dispatchedId);
            fetchData(props.config.script.find(c => c.id === props.dispatchedId))
        }
        axios.get('https://lil-shopify.herokuapp.com/amplitude/banner/in')
            .catch(e => console.log(e));
    }, []);

    const [badgeData, fetchData] = useState({config: false, status: ''});
    //async state

    const [name, setName] = useState('');
    const [pickedBadge, pickBadge] = useState(0);
    const [bannerRenderValue, setBannerValue] = useState('.product-single__title/append');
    const [products, setProducts] = useState([]);
    const [isAllProducts, pickAllProducts] = useState(false);
    //data state

    const [category, pickCategory] = useState(categories[0]);
    const [inputSearchValue, setInputValue] = useState('');
    const [isProductsOpen, setProductsOpen] = useState(false);
    //local state

    const [nameTouch, handleNameTouch] = useState(false);
    const [switchTouch, setSwitchTouch] = useState(false);
    //error state

    let handleProductSelection = (products) => {
        setProducts(products.selection.map(p => ({title: p.title, photo: p.images[0].originalSrc, id: p.handle})))
        setProductsOpen(false);
        console.log(products)
    };

    let handleSearchFieldChange = (value) => {
        if (!isAllProducts) {
            setProductsOpen(true);
            setInputValue(value)
        }
    };

    const handleSubmit = async () => {
        if (!name){
            Scroll.animateScroll.scrollToTop();
            setSwitchTouch(true)
        }
        else {
            if (!props.dispatchedId) {
                let res = await axios.post('https://lil-shopify.herokuapp.com/api/badge', {
                    name,
                    pickedBadge,
                    bannerRenderValue,
                    products,
                    isAllProducts
                });
                console.log(res.data);
                props.setSaleId(0);
            }
            else {
                let res = await axios.put('https://lil-shopify.herokuapp.com/api/badge', {
                    id: badgeData.id,
                    name,
                    pickedBadge,
                    bannerRenderValue,
                    products,
                    isAllProducts
                });
                console.log(res.data);
            }
        }
        await axios.get('https://lil-shopify.herokuapp.com/amplitude/banner/created');
    };

    useEffect(() => {
        props.handleSaleProducts(products, isAllProducts)
    }, [products]);

    useEffect(() => {
        setName(badgeData.id ? badgeData.configData.name : '');
        pickCategory(badgeData.id ? categories[1] : categories[0]);
        pickBadge(badgeData.id ? badgeData.configData.pickedBadge : 0);
        setBannerValue(badgeData.id ? badgeData.configData.bannerRenderValue : '.product-single__title/append');
        setProducts(badgeData.id ? badgeData.configData.products : [])
    }, [badgeData]);

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
                            <Link href={!!name ? '/saleSuccess' : '/badges'}>
                            <Button
                                primary
                                disabled={(pickedBadge === 0)}
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
                        <Card title={props.bannerName} sectioned>
                            <TextField
                                label={''}
                                onBlur={() => handleNameTouch(true)}
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
                        <Card sectioned title={props.strings.pickCategory}>
                            <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <p>{props.strings.category} {category}</p>
                                <Pagination
                                    hasPrevious={categories.indexOf(category) > 0}
                                    onPrevious={() => {
                                        console.log(categories.indexOf(category) - 1, categories[categories.indexOf(category) - 1]);
                                        pickCategory(categories[categories.indexOf(category) - 1])
                                    }}
                                    hasNext={categories.indexOf(category) < categories.length - 1}
                                    onNext={() => {
                                        console.log(categories.indexOf(category) + 1, categories[categories.indexOf(category) + 1]);
                                        pickCategory(categories[categories.indexOf(category) + 1])
                                    }}
                                />
                            </div>
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned title={props.strings.pickCategory}>
                            {categoryVariant(category, pickedBadge, pickBadge)}
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
                                props.warning.reason.elements.map(p => <Product pickProducts={pickProducts}
                                                                                products={products} {...p}/>)
                                }
                            </Banner>
                        </div>}
                        <Card sectioned title={'Banner placement'}>
                            <Heading>
                                {props.strings.productPagesWithBanner}
                            </Heading>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '520px',
                                marginTop: '15px',
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
                            <div style={{width: '320px', marginTop: '20px'}}>
                                <Select
                                    label={''}
                                    labelInline
                                    options={(category === 'Badges') ? [
                                        {label: props.strings.aboveTitle, value: '.product-single__title/prepend'},
                                        {label: props.strings.belowTitle, value: '.product-single__title/append'},
                                        {label: props.strings.abovePrice, value: '.product__price/prepend'},
                                        {label: props.strings.belowPrice, value: '.product__price/append'},
                                        {label: props.strings.aboveBuyButton, value: '.product-form__controls-group/append'},
                                        {
                                            label: props.strings.belowBuyButton,
                                            value: '.product-form__controls-group product-form__controls-group--submit/append'
                                        },
                                    ] : [
                                        {label: props.strings.aboveTitle, value: '.product-single__title/prepend'},
                                        {label: props.strings.belowTitle, value: '.product-single__title/append'},
                                        {label: props.strings.abovePrice, value: '.product__price/prepend'},
                                        {label: props.strings.belowPrice, value: '.product__price/append'},
                                        {label: props.strings.aboveBuyButton, value: '.product-form__controls-group/append'},
                                    ]}
                                    onChange={(value) => setBannerValue(value)}
                                    value={bannerRenderValue}
                                />
                            </div>
                        </Card>
                    </Layout.Section>
                    <div style={{display: "flex", justifyContent: 'flex-end', width: '100%', marginTop: '20px'}}>
                        <Link href={!!name ? '/saleSuccess' : '/badges'}>
                        <Button
                            primary
                            disabled={(pickedBadge === 0) || props.warning.isWarning}
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
    config: state.configsReducer.saleConfig,
    dispatchedId: state.configsReducer.dispatchedIds.saleId,
    warning: state.configsReducer.displayWarnings.sale,
    strings: state.localesReducer.stringsToDisplay.strings.badges,
    configStrings: state.localesReducer.stringsToDisplay.strings.existing_config
});

export default connect(mapStateToProps, {
    setSaleId,
    handleSaleProducts
})(Badges)