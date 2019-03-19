import React from 'react'
import Menu from './Menu'

export default class MenuList extends React.Component {

    render() {
        return(
            <div>
                { this.props.menus.map( menu => 
                    <Menu 
                        key={menu.id}
                        { ...menu }
                        deleteMenu={this.props.deleteMenu}
                        updateMenu={this.props.updateMenu}
                        editMenu={this.props.editMenu}
                    />
                )}
            </div>
        )
    }
}