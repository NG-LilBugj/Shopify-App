import {Button, Card, Icon} from "@shopify/polaris";
import Link from "next/link";

const BannerInfo = (props) => {
    return(
        <Card>
            <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: '10px',
            borderBottom: "1px solid grey"
        }}>
            <p>Banner name:</p>
        </div>
            <div style={{width: "100%", display: "flex", justifyContent: "space-between", padding: '10px'}}>
                <b style={{fontSize: "24px"}}>{props.data.script[0].configData ? props.data.script[0].configData.name : "Banner"}</b>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Link href={props.link}>
                    <Button
                        primary
                    >
                        Go to
                    </Button>
                    </Link>
                </div>
            </div>
            </Card>
    )
};

export default BannerInfo