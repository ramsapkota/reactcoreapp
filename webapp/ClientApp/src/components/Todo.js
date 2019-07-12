import React from 'react';
import { bindActionCreators } from 'redux';
    import { connect } from 'react-redux';
    import { actionCreators } from '../store/Todos';
import AlertMessage from './AlertMessage';
import Pager from './Helper/Pager'
import { Form, FormGroup, Label, Input, Button, Table } from 'reactstrap'


class Todo extends React.Component {
    state = {
        title: '',
        department: '',
        status: false,
        showMessage: false
    }

    handleSumbit = (e) => {
        e.preventDefault();
        const todo = { title: this.state.title, department: this.state.department, status: false }
        this.props.add(todo)

        this.setState({
            title: '',
            department: '',
            status: false
        })
        document.getElementById('title').focus();


    }
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value }, () => { this.validateField(name, value) })
    }

    handelPageChange = page => {
        this.ensureDataFetched(page);
    }

    validateField = (name, value) => {
        return true
    }

    ensureDataFetched(pageNo = 1) {
        const pager = { pageNo: pageNo, itemsPerPage: 20, pagePerDisplay: 5 }
        this.props.requestTodos(pager);
    }

    componentDidMount() {
        this.ensureDataFetched();
    }
   

    render() {
        return (
            <div className="row justify-content-center">
                <div className="col-6">
                    {
                        this.props.dbMessage ?
                            <AlertMessage message={this.props.dbMessage} success={this.props.isDbSuccess} />
                            : true
                    }
                    <h1 className="text-center display-4">Todo</h1>
                    <div>
                        <Form onSubmit={this.handleSumbit}>
                            <FormGroup>
                                <Label for="exampleEmail">Todo Title</Label>
                                <Input type="text" id="title"
                                    autoFocus="true"
                                    name="title" onChange={this.handleChange} value={this.state.title} placeholder="Todo Title" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail">Department</Label>
                                <Input type="text" id="department" name="department" onChange={this.handleChange} value={this.state.department} placeholder="Department" />
                            </FormGroup>
                            <Button className="btn btn-info btn-block">Submit</Button>
                        </Form>
                        {this.requestTodosTable(this.props)}
                    </div>
                </div>
            </div>
        )
    }

    requestTodosTable = (props) => {
        return (
            <React.Fragment>
                <Table className="mt-5">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.todos && props.todos.map((todo) =>
                            <tr key={todo.id}>
                                <td>{todo.title}</td>
                                <td>{todo.department}</td>
                                <td>{todo.status === true ? "true" : "false"}</td>
                                <td><Button className="btn btn-sm- btn-danger" onClick={() => props.removeTodo(todo.id)}>X</Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Pager pager={props.pager} onPageChange={this.handelPageChange} />
            </React.Fragment>
        )
    }
}




export default connect(
    state => state.todo,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Todo);
