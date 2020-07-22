import {Button, Card, Icon, Layout, Page, Pagination, Select, TextField} from "@shopify/polaris";
import {useEffect, useState} from "react";
import "../public/index.css"
import axios from "axios";
import * as Scroll from "react-scroll";
import {DeleteMajorMonotone, SettingsMajorMonotone} from "@shopify/polaris-icons";
import Link from "next/link";

const categories = [
    'Banners',
    'Badges',
    'Third',
    'Some'
];

const categoryVariant = (category, pickedBadge, pickBadge) => {
    switch (category) {
        case 'Banners': return <div/>;
        case 'Badges': return(
            <div style={{display: "flex", flexWrap: "wrap", width: '100%'}}>
                <div style={{borderColor: (pickedBadge === 1) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(1)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge1.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 2) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(2)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge2.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 3) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(3)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge3.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 4) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(4)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge4.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 5) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(5)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge5.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 6) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(6)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge6.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 7) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(7)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge7.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 8) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(8)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge8.png'} alt={'icon'}/></div>
                <div style={{borderColor: (pickedBadge === 9) ? '#3333aa' : ""}}
                     className={'img-container'} onClick={() => pickBadge(9)}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge9.png'} alt={'icon'}/></div>
            </div>
        );
        case 'Third': return <div/>;
        case 'Some': return <div/>
    }
};

const Badges = () => {

    useEffect(() => {
        axios.get('https://lil-shopify.herokuapp.com/api/badge').then(res => {
            fetchData(res.data);
            setLoading(false);
            console.log(res.data)
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
            });
    }, []);

    const [badgeData, fetchData] = useState({config: false, status: ''});
    const [isLoading, setLoading] = useState(true);
    //async state

    const [name, setName] = useState('');
    const [category, pickCategory] = useState(categories[0]);
    const [pickedBadge, pickBadge] = useState(0);
    const [bannerRenderValue, setBannerValue] = useState('.product-single__title/append');
    //data state

    const [nameTouch, handleNameTouch] = useState(false);
    const [switchTouch, setSwitchTouch] = useState(false);
    //error state

    const handleSubmit = async () => {
        if (!name){
            Scroll.animateScroll.scrollToTop();
            setSwitchTouch(true)
        }
        else {
            if (!badgeData.script) {
                let res = await axios.post('https://lil-shopify.herokuapp.com/api/badge', {
                    name,
                    pickedBadge,
                    bannerRenderValue
                });
                console.log(res);
            }
            else {
                let res = await axios.put('https://lil-shopify.herokuapp.com/api/badge', {
                    name,
                    pickedBadge,
                    bannerRenderValue
                });
                console.log(res);
            }
        }
    };

    const deleteSubmit = async () => {
        setLoading(true);
        axios.delete('https://lil-shopify.herokuapp.com/api/badge').then(res => {
            console.log(res)
        });
        axios.get('https://lil-shopify.herokuapp.com/api/badge').then(res => {
            fetchData(res.data);
            setLoading(false)
        });
    };

    useEffect(() => {
        setName(badgeData.status ? badgeData.script[0].configData.name : '');
        pickCategory(badgeData.status ? categories[1] : categories[0]);
        pickBadge(badgeData.status ? badgeData.script[0].configData.pickedBadge : 0);
        setBannerValue(badgeData.status ? badgeData.script[0].configData.bannerRenderValue : '.product-single__title/append')
    }, [badgeData.config]);

    useEffect(() => console.log(pickedBadge), [pickedBadge]);

    if (isLoading) return <Page><Layout>
        <img src={'https://lil-proxy.herokuapp.com/static/Preloader.gif'} alt={'load...'}/>
    </Layout></Page>;
    else return (
        <Page>
            {badgeData.config ?
                <Layout>
                    <Card title={"Existing Badge Banner:"} sectioned>
                        <div style={{width: "60vw", display: "flex", justifyContent: "space-between", padding: '10px', borderBottom: "1px solid grey"}}>
                            <p>Banner name:</p>
                            <p>Actions:</p>
                        </div>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px'}}>
                            <b style={{fontSize: "24px"}}>{badgeData.script[0].configData?badgeData.script[0].configData.name:"Timer"}</b>
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Button
                                    size={"medium"}
                                    type={"submit"}
                                    onClick={() => fetchData({...badgeData, config: false})}>
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
                                disabled={(pickedBadge === 0)}
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
                                onBlur={() => handleNameTouch(true)}
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
                        <Card sectioned title={'Pick category'}>
                            <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                                <p>Category: {category}</p>
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
                        <Card sectioned title={'Pick Badge'}>
                            {categoryVariant(category, pickedBadge, pickBadge)}
                        </Card>
                    </Layout.Section>
                    <Layout.Section>
                        <Card sectioned title={'Banner placement'}>
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
                                    value={bannerRenderValue}
                                />
                            </div>
                        </Card>
                    </Layout.Section>
                    <div style={{display: "flex", justifyContent: 'flex-end', width: '100%'}}>
                        <Link href={!!name ? '/success' : '/badges'}>
                        <Button
                            primary
                            disabled={(pickedBadge === 0)}
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

export default Badges