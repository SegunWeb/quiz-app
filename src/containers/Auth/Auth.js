import React, {Component} from 'react';
import { Button, Form } from 'semantic-ui-react'
import Input from "../../component/UI/Input/Input";
import is from 'is_js'
import {auth} from '../../redux/actions/auth_actions'
import {connect} from 'react-redux'

import "./auth.css"


// function validateEmail(email) {
//     // eslint-disable-next-line
//     let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

class Auth extends Component {

    state = {
       isFormValid: false,
      formControls: {
          email: {
            value: '',
              type: 'email',
              label: 'Email',
              errorMessage: 'Введите корректный емаил',
              valid: false,
              touched: false,
              validation: {
                required: true,
                email: true,
              }
          },
          password: {
              value: '',
              type: 'password',
              label: 'Пароль',
              errorMessage: 'Введите корректный пароль',
              valid: false,
              touched: false,
              validation: {
                  required: true,
                  minLength: 6,
              }
          }

      }
    };

    registHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false,
        );

    };
    loginHandler =  () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true,
        );
        // const authData = {
        //     email: this.state.formControls.email.value,
        //     password: this.state.formControls.password.value,
        //     returnSecureToken: true,
        // };
        // try {
        //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3HRrpLACHD6TPwoQ_PLSKPJtXEs98VK4', authData);
        //
        //     console.log(res.data);
        // } catch (e) {
        //     console.log(e);
        // }
    };


    subHandler = (e) => {
        e.preventDefault()
    };

    validateControl = (value, validation) => {
        if(!validation) {
            return true;
        }

        let isValid = true;
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            // isValid = validateEmail(value) && isValid
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    };

    onChangeHandler = (e, controlName) => {
        console.log(`${controlName}`, e.target.value );

        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        })
    };


    renderInput = () => {
       return Object.keys(this.state.formControls).map((controlName, i) => {
           const controls = this.state.formControls[controlName];
           return (
               <Input
                    key={controlName + i}
                    type={controls.type}
                    value={controls.value}
                    valid={controls.valid}
                    touched={controls.touched}
                    label={controls.label}
                    errorMessage={controls.errorMessage}
                    shouldValidate={!!controls.validation}
                    onChange={e => this.onChangeHandler(e, controlName)}
               />
           )
       })
    };

    render() {
        return (
            <div className='auth-wrap'>
                <h1 className='auth-q-title'>Auth</h1>
                <Form onSubmit={this.subHandler}>
                    {this.renderInput()}

                    <Button
                        color='blue'
                        onClick={this.loginHandler}
                        disabled={!this.state.isFormValid}
                    >Submit</Button>
                    <Button
                        color='green'
                        onClick={this.registHandler}
                        disabled={!this.state.isFormValid}
                    >Register</Button>
                </Form>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
      return {
          auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
};

export default connect(null, mapDispatchToProps)(Auth);