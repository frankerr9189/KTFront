import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Box,
    Grid,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {
    SentimentVerySatisfied,
    SentimentVeryDissatisfied
} from '@material-ui/icons';
import StepperIcons from "./StepIcons";
import StepConnector from "./StepConnector";
import ContactForm from "./Forms/ContactForm";
import ServiceForm from "./Forms/ServiceForm";
import PaymentForm from "./Forms/PaymentForm";
import {
    useStripe,
    useElements,
    CardNumberElement,
} from '@stripe/react-stripe-js';
import { useStateValue } from "../StateContext";
import Axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {getBraintreeClientToken, processPayment, createOrder} from "../admin/adminApi";
import {isAuthenticated} from '../auth';

const style = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
    },
    mainBox: {
        position: "relative",
        marginTop: "-8px",
        padding: "10px 20px",
        borderBottomRightRadius: "4px",
        borderBottomLeftRadius: "4px",
        background: theme.palette.background.default
    },
    stepper: {
        height: "calc(10vh - 40px)",
        minHeight: "55px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%"
    },
}));

const StepContent = ({ step }) => {
    switch (step) {
        case 0:
            return <ContactForm />;
        case 1:
            return <ServiceForm />;
        case 2:
            return <PaymentForm />;
        default:
            return <></>;
    }
}

const Steppers = () => {
    const classes = style();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [cardStatus, setCardStatus] = useState(true);
    const [cardMessage, setCardMessage] = useState("");
    const cart = useSelector((state)=>state.cart);
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    const stripe = useStripe();
    const elements = useElements();
    const [{ formValues }, dispatch] = useStateValue();

    const handleNext = () => {
        if (activeStep === 2) {
            capture()
        } else {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
        }
    };
    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleReset = () => setActiveStep(0);

    const clientSecretPull = (data) => {
        const url = window.location.hostname + "capture.php"
        return new Promise(async resolve => {
            const { data: { clientSecret } } = await Axios.post(url, data);
            resolve(clientSecret)
        })
    }

    const capture = () => {

        // setLoading(true);

        // const clientSecret = await clientSecretPull({
        //     amount: formValues.amount * 100,
        //     currency: "USD",
        //     cardType: "card",
        //     receipt_email: formValues.email,
        // });
        const cardInfo = elements.getElement(CardNumberElement);

        const orderData = {
            orderItems: cart,
        };

        const stripeDataObject = {
            amount: "",
            currency: "USD",
            cardType: "card",
            payment_method: {
                 card: cardInfo,
                 billing_details: {
                     address: {
                         city: formValues.city,
                         country: formValues.country.code,
                         line1: formValues.line1,
                         line2: formValues.line2,
                         postal_code: formValues.postal_code,
                         state: formValues.state,
                     },
                     email: formValues.email,
                     name: `${formValues.firstname} ${formValues.lastname}`,
                 },
             },
        };

        createOrder(userId, token, orderData, stripeDataObject);
                

        // const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, stripeDataObject);

        // if (error) {
        //     setCardStatus(false);
        //     setCardMessage(`Oops... ${error.message}`);
        // } else if (paymentIntent && paymentIntent.status === "succeeded") {
        //     dispatch({ type: 'emptyFormValue' });
        //     setCardStatus(true);
        //     setCardMessage("Thank you for your payment.");
        // }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setLoading(false);

    }

    return <>
        <Stepper alternativeLabel className={classes.stepper} connector={<StepConnector />} activeStep={activeStep}>
            {/* Change the number of loops here based on StepContent */}
            {[1, 2, 3].map(e =>
                <Step key={e}>
                    <StepLabel StepIconComponent={StepperIcons} />
                </Step>
            )}
        </Stepper>
        <Box className={classes.mainBox}>
            <Grid
                container
                spacing={3}
                direction="column"
                justify="space-around"
                alignItems="center"
                style={{ height: "400px" }}
            >
                {activeStep === 3
                    ?
                    <>
                        {cardStatus
                            ?
                            <SentimentVerySatisfied fontSize="large" color="primary" />
                            :
                            <SentimentVeryDissatisfied fontSize="large" color="error" />
                        }
                        <Typography variant="h4">
                            {cardMessage}
                        </Typography>
                        <Button onClick={cardStatus ? handleReset : handleBack} className={classes.button}>
                            {cardStatus ? "Reset" : "Back"}
                        </Button>
                    </>
                    :
                    <form className={classes.form} onSubmit={e => { e.preventDefault(); handleNext() }}>
                        <Grid container spacing={3}>
                            <StepContent step={activeStep} />
                            <Grid container item justify="flex-end">
                                <Button disabled={activeStep === 0} className={classes.button} onClick={handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    type="submit"
                                    disabled={loading}
                                >
                                    {
                                        loading
                                            ?
                                            <CircularProgress size={24} />
                                            :
                                            activeStep === 2 ? 'Pay' : 'Next'
                                    }
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                }
            </Grid>
        </Box>
    </>
}

export default Steppers;