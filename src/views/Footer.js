import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Link
} from "@material-ui/core";
import {
    Security,
    Info
} from "@material-ui/icons";

const Footer = () => <>

        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
            <Info color="action" />
                <Typography variant="caption">©2020 Powered by Koastal-Technology.com</Typography>
            </Toolbar>
        </AppBar>
    </>

export default Footer;