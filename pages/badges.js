import {Button, Card, Layout, Page, Pagination, Select} from "@shopify/polaris";
import {useState} from "react";
import "../public/index.css"
import axios from "axios";

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

const Badges = (props) => {

    const [category, pickCategory] = useState(categories[0]);
    const [pickedBadge, pickBadge] = useState(0);
    const [bannerRenderValue, setBannerValue] = useState('.product-single__title/append');

    const handleSubmit = async () => {
        let res = await axios.post('https://lil-shopify.herokuapp.com/api/badge', {
            pickedBadge,
            bannerRenderValue
        });
        console.log(res);
    };

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <div
                        style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '25px'}}>
                        <div style={{fontSize: '24px', fontWeight: '600'}}>
                            Customize your special badge banner!
                        </div>
                        <Button
                            primary
                            disabled={(pickedBadge === 0)}
                            size={"medium"}
                            type={"submit"}
                            onClick={handleSubmit}
                        >
                            Save
                        </Button>
                    </div>
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
                                {label: 'Below buy button', value: '.product-form__controls-group product-form__controls-group--submit/append'},
                            ]}
                            onChange={(value) => setBannerValue(value)}
                            value={bannerRenderValue}
                        />
                        </div>
                    </Card>
                </Layout.Section>
                <div style={{display: "flex", justifyContent: 'flex-end',width: '100%'}}>
                    <Button
                        primary
                        disabled={(pickedBadge === 0)}
                        size={"medium"}
                        type={"submit"}
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </div>
            </Layout>
        </Page>
    )
};

export default Badges