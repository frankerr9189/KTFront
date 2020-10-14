import React, { Component } from 'react';
import 'whatwg-fetch';
import {API} from "./config";
import InputKeyValue from './InputKeyValue';

class stripeAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      setupBegan: false,
      isLoading: true,
      error: null,
      account: null,
      fieldsNeededForm: {}
    };
    this.fetchAccount = this.fetchAccount.bind(this);
    this.onClickBeginSetup = this.onClickBeginSetup.bind(this);
    this.onStartAccountSetup = this.onStartAccountSetup.bind(this);
    this.getFieldValue = this.getFieldValue.bind(this);
    this.fieldsNeededFormChange = this.fieldsNeededFormChange.bind(this);
    this.onClickSaveFieldsNeeded = this.onClickSaveFieldsNeeded.bind(this);
  }

  componentWillMount(){
      this.fetchAccount();
  }
  getFieldValue(key){
      const{
          fieldsNeededForm,
      } = this.state;

      if(fieldsNeededForm[key]){
          return fieldsNeededForm[key];
      }else{
          return '';
      }
  };


  fieldsNeededFormChange(e, key){
    const{
        fieldsNeededForm,
    } = this.state;

    fieldsNeededForm[key]= e.target.value;

    this.setState({
        fieldsNeededForm,
    });
  };

  fetchAccount() {
    fetch(`${API}/stripe/account/get`, 
    { 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
    })
      .then(res => res.json())
      .then(json => {
        const {
            success,
            message,
            setupBegan,
            account,
        } = json;

        if (success){
            this.setState({
                setupBegan,
                isLoading: false,
                account,
            });
        } else {
            this.setState({
                error: message,
                isLoading: false,
            });
        }
      });
  }

  onStartAccountSetup() {
      this.setState({
        isLoading: true,
      });
    fetch(`${API}/stripe/account/setup`, 
    { 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        countryCode: 'US',
    }),
    })
      .then(res => res.json())
      .then(json => {
        const {
            success,
            message,
        } = json;

        if (success){
            this.fetchAccount();
        } else {
            this.setState({
                error: message,
                isLoading: false,
            });
        }
      });
  }

  onClickBeginSetup(){
      console.log("onClickBeginSetup");
      this.onStartAccountSetup();
  }

  onClickSaveFieldsNeeded(){
      console.log('onClickSaveFieldsNeeded');
    const {
        fieldsNeededForm,
    } = this.state;

      this.setState({
          isLoading:true,
      });

      fetch(`${API}/stripe/account/save`, 
    { 
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
    },
    body: JSON.stringify(fieldsNeededForm),
    })
      .then(res => res.json())
      .then(json => {
        const {
            success,
            message,
        } = json;

        if (success){
            this.fetchAccount();
        } else {
            this.setState({
                error: message,
                isLoading: false,
            });
        }
      });
  }


  render() {
      const {
          isLoading,
          setupBegan,
          error,
          account,
      } = this.state;

      if(isLoading){
          return(
              <p>Loading...</p>
          );
      }

      if (!setupBegan){
          return(
            <div>
                {
                    (error) ? (
                        <p>{error}</p>
                    ) : (null)
                }
                <button onClick={this.onClickBeginSetup}>
                    Begin Setup
                </button>
                <p>By clicking setup you agree to the TOS for Stripe and us.</p>
            </div>
          );
      }

    console.log('account', account);

    const {requirements} = account;
    const {currently_due} = requirements;
    // const {external_accounts} = account;

    return (
      <div>
          {
                    (error) ? (
                        <p>{error}</p>
                    ) : (null)
                }

                {
                    (currently_due.length === 0)?(
                        <p>All Setup</p>
                    ) :
                (<div>
                    {
                    currently_due.map(fieldKey =>{
                    return(
                        <InputKeyValue
                        text={fieldKey}
                        id={fieldKey}
                        value={this.getFieldValue(fieldKey)}
                        // key={Math.random()} causes issue with text field
                        onTextboxChange={this.fieldsNeededFormChange}
                        />
                    );
                })
            } }
            {/* <VerificationForm></VerificationForm> */}
            <div>
                <button 
                onClick={this.onClickSaveFieldsNeeded}>
                    Save
                </button>
            </div>
            </div>
            )
            }
      </div>
    )
  }
}

export default stripeAccount;
