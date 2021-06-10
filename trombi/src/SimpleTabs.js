import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormStructure from "./FormStructure";
import FormPerson from "./FormPerson";

//npm install @material-ui/icons
//npm install  @material-ui/core

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));


export default function SimpleTabs_initial() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        console.log("SimpleTabs.handleChange(), event=" + event);
        setValue(newValue);
    };


    return (
        <div className={classes.root}>
            <AppBar position="sticky" style={{backgroundColor : "#656263", color : "white"}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Recherche par Individu" {...a11yProps(0)} />
                    <Tab label="Recherche par Structure" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <FormPerson/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FormStructure/>
            </TabPanel>
        </div>
    );
}