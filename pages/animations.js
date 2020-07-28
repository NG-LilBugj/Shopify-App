import {Autocomplete, Button, Card, Heading, Icon, Layout, Page, Pagination, Select, TextField} from "@shopify/polaris";
import {DeleteMajorMonotone, SearchMinor, SettingsMajorMonotone} from "@shopify/polaris-icons";
import {ResourcePicker} from "@shopify/app-bridge-react";
import Link from "next/link";
import Product from "../components/product";
import {useEffect, useState} from "react";
import axios from "axios";
import * as Scroll from "react-scroll";

const Animations = () => {

    useEffect(() => { // side effect function to fetch data from main server (get endpoint for animations)
        axios.get('https://lil-shopify.herokuapp.com/api/animation').then(res => {
            fetchData(res.data);
            setLoading(false);
            console.log(res.data)
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
            });
    }, []);

    const [animData, fetchData] = useState({config: false, status: ''});
    const [isLoading, setLoading] = useState(true);
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
        setProducts(products.selection.map(p => ({title: p.title, photo: p.images[0].originalSrc, id: p.handle})))
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
            if (!animData.script) {
                let res = await axios.post('https://lil-shopify.herokuapp.com/api/animation', {
                    name,
                    pickedAnimation,
                    badgeRenderValue: animationRenderValue,
                    message: messageText,
                    products,
                    isAllProducts
                });
                console.log(res);
                // HTTP Post request to main server
            }
            else {
                let res = await axios.put('https://lil-shopify.herokuapp.com/api/animation', {
                    name,
                    pickedAnimation,
                    badgeRenderValue: animationRenderValue,
                    message: messageText,
                    products,
                    isAllProducts
                });
                console.log(res);
                // HTTP Put request to main server
            }
        }
    };

    const deleteSubmit = async () => {
        // HTTP Delete request to main server
        setLoading(true);
        axios.delete('https://lil-shopify.herokuapp.com/api/animation').then(res => {
            console.log(res)
        });
        // HTTP request to renew data about config
        axios.get('https://lil-shopify.herokuapp.com/api/animation').then(res => {
            fetchData(res.data);
            setLoading(false)
        });
    };

    useEffect(() => {
        setName(animData.status ? animData.script[0].configData.name : '');
        setBannerValue(animData.status ? animData.script[0].configData.badgeRenderValue : '.product-single__title/append');
        setProducts(animData.status ? animData.script[0].configData.products : [])
    }, [animData.config]);
    // resettling data state when there is information from main server

    const searchField = (
        <Autocomplete.TextField
            onChange={handleSearchFieldChange}
            value={inputSearchValue}
            prefix={<Icon source={SearchMinor} color="inkLighter" />}
            placeholder="Search"
        />
    );

    if (isLoading) return <Page><Layout>
        <img src={'https://lil-proxy.herokuapp.com/static/Preloader.gif'} alt={'load...'}/>
    </Layout></Page>;
    else return (
        <Page>
            {animData.config ?
                <Layout>
                    <Card title={"Existing Badge Banner:"} sectioned>
                        <div style={{
                            width: "60vw",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: '10px',
                            borderBottom: "1px solid grey"
                        }}>
                            <p>Banner name:</p>
                            <p>Actions:</p>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px'}}>
                            <b style={{fontSize: "24px"}}>{animData.script[0].configData ? animData.script[0].configData.name : "Timer"}</b>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button
                                    size={"medium"}
                                    type={"submit"}
                                    onClick={() => fetchData({...animData, config: false})}>
                                    <Icon source={SettingsMajorMonotone}/>
                                </Button>
                                <Button
                                    destructive
                                    size={"medium"}
                                    type={"submit"}
                                    onClick={deleteSubmit}>
                                    <Icon source={DeleteMajorMonotone}/>
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Layout>
                :
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
                                Customize your special badge banner!
                            </div>
                            <Link href={!!name ? '/success' : '/badges'}>
                                <Button
                                    primary
                                    disabled={(pickedAnimation === 0)}
                                    size={"medium"}
                                    type={"submit"}
                                    onClick={handleSubmit}
                                >
                                    Save
                                </Button>
                            </Link>
                        </div>
                    </Layout.Section>
                    <Layout.Section>
                        <Card title={'Banner name:'} sectioned>
                            <TextField
                                label={''}
                                value={name}
                                placeholder={'Enter name...'}
                                onChange={(value) => {
                                    setName(value)
                                }}
                                error={((!name) && switchTouch) ? 'Please enter name' : ''}
                            />
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card title={'Pick animation'} sectioned>
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
                        <Card title={'Your message text:'} sectioned>
                            <TextField
                                label={''}
                                onBlur={() => handleNameTouch(true)}
                                value={messageText}
                                placeholder={'Enter text...'}
                                onChange={(value) => {
                                    setMessageText(value)
                                }}
                                error={((!messageText) && switchTouch) ? 'Please enter text' : ''}
                            />
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned title={'Banner placement'}>
                            <Heading>
                                Product pages with badge:
                            </Heading>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '520px'
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
                                    onClick={() => setProducts(true)}
                                >
                                    Browse products
                                </Button>
                                <Button
                                    plain
                                    onClick={() => pickAllProducts(true)}
                                >
                                    All products
                                </Button>
                            </div>
                            {(products.length) && products.map(p => <Product
                                pickProducts={setProducts}
                                products={products} {...p}/>)}
                            <div style={{width: '320px'}}>
                                <Select
                                    label={''}
                                    labelInline
                                    options={[
                                        {label: 'Above title', value: '.product-single__title/prepend'},
                                        {label: 'Below title', value: '.product-single__title/append'},
                                        {label: 'Above price', value: '.product__price/prepend'},
                                        {label: 'Below price', value: '.product__price/append'},
                                        {label: 'Above buy button', value: '.product-form__controls-group/append'},
                                        {
                                            label: 'Below buy button',
                                            value: '.product-form__controls-group product-form__controls-group--submit/append'
                                        },
                                    ]}
                                    onChange={(value) => setBannerValue(value)}
                                    value={animationRenderValue}
                                />
                            </div>
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
                                Save
                            </Button>
                        </Link>
                    </div>
                </Layout>
            }
        </Page>
    )
};

export default Animations