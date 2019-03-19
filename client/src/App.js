import React from 'react';
import { Container } from 'semantic-ui-react'
import MenuList from './components/MenuList'
import axios from 'axios'
import MenuForm from './components/MenuForm'

export default class App extends React.Component {
  state = { menus: [] }

  componentDidMount() {
    axios.get('/api/menus')
      .then( res => {
        this.setState({ menus: res.data })
      })
      .catch( err => {
        console.log(err)
      })
  }

  addMenu = (name) => {
    axios.post('/api/menus', { name })
      .then( res => {
        const { menus } = this.state;
        this.setState({ menus: [...menus, res.data] });
      })
  }

  updateMenu = (id) => {
    axios.put(`/api/menus/${id}`)
      .then( res => {
        const menus = this.state.menus.map( m => {
        if (m.id === id)
          return res.data;
        return m;
      });
      this.setState({ menus });
    })
  }

  deleteMenu = (id) => {
    axios.delete(`/api/menus/${id}`)
      .then( res => {
        const { menus } = this.state;
        this.setState({ menus: menus.filter(t => t.id !== id) })
      })
  }

  editMenu = (menuData) => {
    const menus = this.state.menus.map( m => {
      if (m.id === menuData.id)
        return menuData
      return m
    })
    this.setState({ menus })
  }

  render() {
    return (
      <Container>
        <MenuForm 
          addMenu={this.addMenu}
          editMenu={this.editMenu}
        />
        <MenuList 
          menus={this.state.menus}
          deleteMenu={this.deleteMenu}
          updateMenu={this.updateMenu}
          editMenu={this.editMenu}
        /> 
      </Container>
    );
  }
}
