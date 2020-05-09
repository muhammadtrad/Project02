import React from 'react';
import { withRouter } from 'react-router-dom';

class LoginForm extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderErrors = this.renderErrors.bind(this);
    }

//When the user is authenticated, redirect to the home page
    componentWillReceiveProps(nextProps){
        if (nextProps.currentUser === true){
            this.props.history.push('/home');
        }
        //set or clear errors
        this.setState({errors: nextProps.errors})
    }

//Handle field updates (called in the render method)
    update(field){
        return e => this.setState({
            [field]: e.currentTarget.value
        });
    }

//Handle form submission
handleSubmit(e){
    e.preventDefault();

    let user = {
        email: this.state.email,
        password: this.state.password
    };

    this.props.login(user);
}

//Render the session errors

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

render() {
    return (
        <div>
            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="text"
                     value={this.state.email}
                     onChange={this.update('email')}
                     placeholder="Email"
                     />
                <br/>
                    <input type="password"
                    value={this.state.password}
                    onChange={this.update('password')}
                    placeholder="Email"
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


export default withRouter(LoginForm);