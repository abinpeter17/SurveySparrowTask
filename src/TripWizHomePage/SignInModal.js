import React, { Component } from 'react';
import {
    Grid, Typography, TextField, Select, MenuItem, Button
} from '@material-ui/core';
import { get, isEmpty } from 'lodash';
import { stateData } from './constants';


class SignInModal extends Component {
    constructor(arg) {
        super(arg);
        this.state = {
            name: '',
            email: '',
            phoneNo: '',
            state: '',
            destination: '',
            errors: {}
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value, errors: {} }, () => {
            if (name === 'state') {
                this.setState({ destination: '' });
            }
        });
    }

    formValidator = () => {
        const { email, phoneNo } = this.state;
        const { closeModal } = this.props;
        const NUMBER_LENGTH = 10;
        const newErrors = {};

        if (!email) {
            newErrors.email = '*Required';
        } else if (typeof email !== 'undefined') {
            const lastAtPos = email.lastIndexOf('@');
            const lastDotPos = email.lastIndexOf('.');
            if (
                !(
                    lastAtPos < lastDotPos
                        && lastAtPos > 0
                        && email.indexOf('@@') === -1
                        && lastDotPos > 2
                        && email.length - lastDotPos > 2
                )
            ) {
                newErrors.email = "Email is not valid, include '@' and '.'";
            }
        }

        if (!phoneNo) {
            newErrors.phoneNo = '*Required';
        } else if (phoneNo.length < NUMBER_LENGTH) {
            newErrors.phoneNo = 'Should be 10 digits';
        }

        const isNumberNoDecimal = /^[0-9]*$/.test(phoneNo);
        if (isNaN(phoneNo) || !isNumberNoDecimal) {
            newErrors.phoneNo = 'Mobile Number not valid';
        }
        if (!isEmpty(newErrors)) {
            this.setState({ errors: newErrors });
            return;
        } else {
            closeModal();
        }
    };

    handleSubmit = () => {
        this.formValidator();
    }

    render() {
        const { closeModal } = this.props;
        const {
            name, email, phoneNo, state, destination, errors
        } = this.state;
        let filterDistricts = [];
        const districtData = stateData.map(item => item.districts);
        filterDistricts = districtData.filter((item, idx) => item[idx].stateID === state);
        return (
            <Grid container spacing={5} direction="row" className="w3-padding-64">

                <Grid item xs={6} className="w3-center">
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <Typography className="tripW-title-small tripW-white">
                Enter Your Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="tripW-input"
                                name="name"
                                label="Name"
                                variant="filled"
                                value={name}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="tripW-input"
                                name="email"
                                label="Email"
                                variant="filled"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <span className="tripW-error">{get(errors, 'email')}</span>

                        <Grid item xs={12}>
                            <TextField
                                className="tripW-input"
                                name="phoneNo"
                                label="Phone No"
                                type="number"
                                variant="filled"
                                value={phoneNo}
                                onChange={this.handleChange}
                            />
                        </Grid>
                        <span className="tripW-error">{get(errors, 'phoneNo')}</span>
                    </Grid>
                </Grid>


                <Grid item xs={6}>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12}>
                            <Typography className="tripW-title-small tripW-white">
                Select Your Destination
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                name="state"
                                value={state}
                                className={state === '' ? 'tripW-input tripW-placeholder' : 'tripW-input'}
                                variant="filled"
                                onChange={this.handleChange}
                                displayEmpty
                            >
                                <MenuItem key="" value="" disabled>
                        Select your state
                                </MenuItem>
                                {(stateData || []).map(eachOption => (
                                    <MenuItem
                                        key={eachOption.ID}
                                        value={eachOption.ID}
                                    >
                                        {eachOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                name="destination"
                                value={destination}
                                className={destination === '' ? 'tripW-input tripW-placeholder' : 'tripW-input'}
                                variant="filled"
                                onChange={this.handleChange}
                                displayEmpty
                            >
                                <MenuItem key="" value="" disabled>
                                Destinations
                                </MenuItem>
                                {get(filterDistricts, 'length') && filterDistricts[0].map(eachOption => (
                                    <MenuItem
                                        key={eachOption.ID}
                                        value={eachOption.ID}
                                    >
                                        {eachOption.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container className="tripW-btn-container" spacing={1}>
                                <Grid item xs={6}>
                                    <Button
                                        className="tripW-modal-btn tripW-button-text"
                                        onClick={this.handleSubmit}
                                    >
                                    Submit
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button
                                        className="tripW-modal-btn tripW-button-text"
                                        onClick={closeModal}
                                    >
                                    Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default SignInModal;
