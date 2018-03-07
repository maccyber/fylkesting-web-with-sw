import React from 'react'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isOpen: false
    }
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.state.isOpen
      ? document.removeEventListener('click', this.handleOutsideClick, false)
      : document.addEventListener('click', this.handleOutsideClick, false)
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }

  handleOutsideClick (e) {
    if (this.node.contains(e.target)) {
      return
    }
    this.handleClick()
  }

  render () {
    return (
      <div className='menu' ref={node => { this.node = node }}>
        <a onClick={this.handleClick}>{this.props.name}</a>
        {
          this.state.isOpen &&
            <div className='menu-content'>
              { this.props.children }
            </div>
        }
        <style jsx>
          {`
            .menu {
              position: relative;
              cursor: pointer;
            }
            .menu-content {
              display: inline-block;
              position: absolute;
              background-color: #f9f9f9;
              min-width: 130px;
              box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
              z-index: 1;
              right: 0;
              line-height: 30px;
              top: 40px;
              text-align: center;
              border-radius: 2px;
            }
          `}
        </style>
      </div>
    )
  }
}
