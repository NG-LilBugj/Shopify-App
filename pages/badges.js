import {Button, Card, Layout, Page, Pagination} from "@shopify/polaris";
import {useState} from "react";

const categories = [
    'Banners',
    'Badges',
    'Third',
    'Some'
];

const categoryVariant = (category) => {
    switch (category) {
        case 'Banners': return <div/>;
        case 'Badges': return(
            <div style={{display: "flex", flexWrap: "wrap", width: '100%'}}>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge1.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge2.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge3.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge4.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge5.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge6.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge7.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge8.png'} alt={'icon'}/></div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: '260px', marginBottom: '20px', '&:hover': {border: '1px solid #3333aa', transition: '0.3s'}}}>
                    <img style={{width: '200px'}} src={'https://lil-proxy.herokuapp.com/static/badge9.png'} alt={'icon'}/></div>
            </div>
        );
        case 'Third': return <div/>;
        case 'Some': return <div/>
    }
};

const Badges = (props) => {

    const [category, pickCategory] = useState(categories[0]);

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
                            size={"medium"}
                            type={"submit"}
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
                        {categoryVariant(category)}
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
};

export default Badges