import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const ShopifyButton = withStyles({
    root: {
        padding: '6px 12px',
        textTransform: 'none',
        fontSize: 16,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
})(Button);
