import React from 'react'
import { Button, Icon, Header, Segment } from 'semantic-ui-react'
import MenuForm from './MenuForm';
import axios from 'axios'

export default class Menu extends React.Component {
    state = {
        items: ['Burrito, ', 'Taco, ', ' Enchilada'],
        showItems: false,
        editing: false
    }

    toggleEdit = () => this.setState({ editing: !this.state.editing })

    toggleShow = () => this.setState({ showItems: !this.state.showItems })

    componentDidMount() {
    axios.get(`/api/menu/${this.props.id}/items`) 
      .then( res => {
        this.setState({ items: res.data })
      })
      .catch( err => {
        console.log(err)
      })
    }

    render() {
     

        return(
            <div>
                <Segment style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                {
                    this.state.editing ?
                        <MenuForm {...this.props} toggleEdit={this.toggleEdit} />
                        :
                        <Header as="h2" style={{ marginLeft: "15px", }}>{ this.props.name }</Header>
                }
                <Button
                    icon
                    color="green"
                    size="small"
                    onClick={this.toggleShow}
                >
                    <Icon name={this.state.showItems ? `angle double up` : `angle double down`}
                    /> 
                </Button>
                <Button 
                    icon
                    color="blue"
                    size="small"
                    onClick={this.toggleEdit}
                >
                    <Icon name="edit" />
                </Button>
                <Button 
                    icon
                    color="red"
                    size="tiny"
                    onClick={() => this.props.deleteMenu(this.props.id)}
                    style={{ marginLeft: "15px"}}
                    >
                    <Icon name="trash" />
                </Button>
                    <Segment.Group>
                       {
                           this.state.showItems ?
                           <h2>{this.state.items}</h2>
                           :
                           null
                       }
                    </Segment.Group>
                </Segment>
                
            </div>
        )
    }
}