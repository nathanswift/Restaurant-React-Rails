import React from 'react'
import { Form } from 'semantic-ui-react'

export default class MenuForm extends React.Component {
    state = { name: '' }

    handleChange = (e) => {
        this.setState({ name: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.id) {
            this.props.editMenu({ id: this.props.id, ...this.state })
            this.props.toggleEdit()
        } else {
            this.props.addMenu(this.state.name)
        }
        this.setState({ name: '' })
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Input
                    label="Menu"
                    placeholder="Add A Menu"
                    required
                    value={this.state.name}
                    onChange={this.handleChange}
                />
            </Form>
        )
    }
}