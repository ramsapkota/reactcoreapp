import React from 'react';
import {Alert} from 'reactstrap'

class AlertMessage extends React.Component {

    state = {
        complete: false
    }
    componentDidMount() {
        this.stopLoading()
    }

    stopLoading = () => {
        setTimeout(() => {
            this.setState({ complete: !this.state.complete })
        }, 2000)
    }
    render() {
        const { message, success } = this.props;
        if (!this.state.complete) {
            return (
                <Alert color={success === true ? "success" : "danger"}>
                    {message}
                </Alert>
            )
        }
        else {
            return (<p></p>)
        }
    }
}



export default AlertMessage
