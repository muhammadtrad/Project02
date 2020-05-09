import React from 'react';
import { withRouter } from 'react-router-dom';

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            handle: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearedErrors = false;
    }

    //Redirect user to login page once they are signed up
    componentWillReceiveProps(nextProps){
        if (nextProps.signedIn === true){
            this.props.history.push('/login');
        }

        this.setState({errors: nextProps.errors})
    }

    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        let user = {
            email: this.state.email,
            handle: this.state.handle,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.signup(user, this.props.history);
    }

    renderErrors(){
        return(
            <ul>
                {Object.keys(this.state.errors).map((error, i) => (
                    <li key={`error-${i}`}>
                        {this.state.errors[error]}
                </li>
                ))}
            </ul>
        );
    }

    render(){
        return(
            <div className="signup-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="signup-form">
                        <br/>
                          <input type="text"
                            value={this.state.email}
                            onChange={this.update('email')}
                            placeHolder="Email"
                            />
                        <br/>
                          <input type="text"
                            value={this.state.handle}
                            onChange={this.update('handle')}
                            placeHolder="Handle"
                            />
                        <br/>
                          <input type="password"
                            value={this.state.password}
                            onChange={this.update("password")}
                            placeHolder="password"
                            />
                        <br/>
                          <input type="password"
                            value={this.state.password2}
                            onChange={this.update("password2")}
                            placeHolder="Confirm Password"
                        />
                        <br/>
                        <input type="submit" value="Submit" />
                        {this.renderErrors()}
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(SignupForm);