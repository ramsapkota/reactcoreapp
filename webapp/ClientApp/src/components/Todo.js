import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Todos';
import { Button, Form, FormGroup, Label, Input, Table } from 'reactstrap';

class Todo extends React.Component {
    state = {
        title: '',
        department: '',
        status: false
    }

    handleSumbit = (e) => {
        e.preventDefault();
        const todo = { title: this.state.title, department: this.state.department, status: false }
        this.props.add(todo)

    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    ensureDataFetched() {
        this.props.requestTodos();
    }

    componentDidMount() {
        this.ensureDataFetched();
    }

    render() {
        console.log("rendered")
        return (
            <div className="row justify-content-center">
                <div className="col-6">
                    <h1 className="text-center display-4">Todo</h1>
                    <Form onSubmit={this.handleSumbit}>
                        <FormGroup>
                            <Label for="exampleEmail">Todo Title</Label>
                            <Input type="text" id="title" name="title" onChange={this.handleChange} placeholder="Todo Title" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="exampleEmail">Department</Label>
                            <Input type="text" id="department" name="department" onChange={this.handleChange} placeholder="Department" />
                        </FormGroup>
                        <Button className="btn btn-info btn-block">Submit</Button>
                    </Form>
                    <div>
                        {this.requestTodosTable(this.props)}
                    </div>
                </div>
            </div>
        )
    }
    requestTodosTable = (props) => {
        console.log(props)
        return (
            <Table className="mt-5">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Department</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {props.todos && props.todos.map((todo, index) =>
                        <tr key={index}>
                            <td>{todo.title}</td>
                            <td>{todo.department}</td>
                            <td>{todo.status === true ? "true" : "false"}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}




export default connect(
    state => state.todo,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Todo);
