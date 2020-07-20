import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Button,
    Grid,
    Typography,
    Divider,
    Dialog,
    DialogContent,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SignInModal from './SignInModal';

const styles = theme => ({
    paper: {
        backgroundColor: '#DF3D39',
    }
});

class TripWizHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openSignInModal: false
        };
    }

    openModal = () => {
        this.setState({ openSignInModal: true });
    }

    closeModal = () => {
        this.setState({ openSignInModal: false });
    }

    render() {
        const { classes } = this.props;
        const { openSignInModal } = this.state;
        return (
            <>
                <AppBar
                    position="static"
                    className="tripW-header"
                >
                    <Toolbar>
                        <Grid container className="w3-padding-24">
                            <Grid item xs={7}>
                                <Grid container>
                                    <Grid item xs={1} />
                                    <Grid item xs={11}>
                                        <Typography className="tripW-title-logo">Tripwiz</Typography>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={1} className="w3-padding-16">
                                <Typography className="tripW-body-text">Experiences</Typography>

                            </Grid>
                            <Grid item xs={2} className="w3-padding-16 w3-center">
                                <Typography className="tripW-body-text">Questions</Typography>

                            </Grid>
                            <Grid item xs={2} style={{ marginTop: '12px' }}>
                                <Button
                                    className="tripW-signIn-btn tripW-button-text"
                                >
                                Sign In
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Grid container>
                    <Grid item xs={12} className="tripW-pattern-background">
                        <Grid container spacing={5} className="tripW-content1-container">
                            <Grid item xs={6} className="w3-right-align">
                                <Typography className="tripW-title-large">
                                    Discover New Adventures
                                </Typography>
                                <Divider className="tripW-divider w3-right w3-margin-top" />
                            </Grid>
                            <Grid item xs={5} style={{ flexBasis: '38.666667%' }}>
                                <Typography className="tripW-content1 tripW-body-text">
                                        We offer you a totally flexible and personal service so you can experience Kerala and Tamil Nadu your way. Take a glimpse at the tours we offer - for you to get inspired! <br />
                                        All of our sample tours can be customized to suit your personal preferences. Or, you can request your own personal tour!
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container className="tripW-content2-container">
                    <Grid item xs={12} className="tripW-image-background">
                        <Grid container>
                            <Grid item xs={7} className="w3-center">
                                <img alt="" src="/images/image.png" height="330px" width="550px" />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className="tripW-title-small">
                                        Here We Go
                                </Typography>
                                <Typography className="tripW-body-text tripW-content2 w3-margin-bottom">
                                        We'll design a complete itenerary for you.
                                        From suggesting our favourite places that we are sure you'd love and the sights you shouldn't miss, we are at your service, throughtout.
                                        We'll book your accomodation and transport, and are happy to drive you anywhere you want.
                                </Typography>
                                <Button 
                                    className="tripW-customize-btn tripW-button-text"
                                    onClick={this.openModal}
                                >
                                    Customize My Trip
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} className="tripW-footer w3-padding-24">
                        <Grid container>
                            <Grid item xs={1} />
                            <Grid item xs={11} className="w3-padding-16">
                                <Typography>Copyright &#169; 2010-2017 Tripwiz.</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {
                    openSignInModal && (
                        <Dialog
                            fullWidth
                            maxWidth="md"
                            classes={{
                                paper: classes.paper
                            }}
                            open={openSignInModal}
                            keepMounted
                        >
                            <div className="w3-display-topright w3-margin-bottom">
                                <IconButton aria-label="Close" onClick={this.closeModal}>
                                    <CloseIcon style={{ color: 'white' }} />
                                </IconButton>
                            </div>

                            <DialogContent>
                                <SignInModal
                                    closeModal={this.closeModal}
                                />
                            </DialogContent>
                        </Dialog>
                    )}
            </>
        );
    }
}

export default withStyles(styles)(TripWizHomePage);
