import React, {Component} from 'react'
import {Modal, Button, Col, Row, ButtonToolbar} from 'react-bootstrap'
import './Menus.css'


const pdfStyle = {
  width: '100%',
  height: '70vh'
}

class Menus extends Component {
  state = {
    showMenu: false,
    showCatering: false,
    numPages: null,
    pageNumber: 1,
  }

  render() {

    return (

      <Col lg={6} className="location-buttons">
        <Row>
          <ButtonToolbar>
            <Col lg={6} md={6} sm={6} xs={6} className="menu">
              <Button
                className="menu-button"
                onClick={this._handleShowMenu}>
                Menu
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="menu">
              <Button
                className="menu-button"
                onClick={this._handleShowCatering}>
                Catering Menu
              </Button>
            </Col>
          </ButtonToolbar>
        </Row>
        <Row>
          <ButtonToolbar>
            <Button
              className="menu-button-directions"
              onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.props.list.address + ',' + this.props.list.city + ',' + this.props.list.state + '_blank')}>
              Directions
            </Button>
          </ButtonToolbar>
        </Row>

        <Modal
          show={this.state.showMenu}
          onHide={this._handleCloseMenu}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.list.name} <a
              href={'../wp-content/themes/texsite/pdf/House_' + this.props.list.label + '.pdf'} target="_blank"><i
              className="fa fa-print" aria-hidden="true"/></a></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>House Menu</h4>

            <div className="smaller-screen-locations">
              {this.props.list.houseMenuUrl.map(menuPic =>
                <img key={menuPic} src={'../wp-content/themes/texsite/images/' + menuPic + '.jpg'} alt="menu"
                     width="100%"/>)}
            </div>

            <div className="large-screen-locations">

              <object
                data={'../wp-content/themes/texsite/pdf/House_' + this.props.list.label + '.pdf'}
                type="application/pdf" style={pdfStyle}>
                Your browser does not support objects
              </object>

            </div>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._handleCloseMenu}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.showCatering}
          onHide={this._handleCloseCatering}
          dialogClassName="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>{this.props.list.name} <a
              href={'../wp-content/themes/texsite/pdf/Catering_' + this.props.list.label + '.pdf'} target="_blank"><i
              className="fa fa-print" aria-hidden="true"/></a></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Catering Menu</h4>

            <div className="smaller-screen-locations">
              {this.props.list.cateringMenuUrl.map(menuPic => <img key={menuPic}
                                                                   src={'../wp-content/themes/texsite/images/' + menuPic + '.jpg'}
                                                                   alt="menu" width="100%"/>)}
            </div>

            <div className="large-screen-locations">

              <object
                data={'../wp-content/themes/texsite/pdf/Catering_' + this.props.list.label + '.pdf'}
                type="application/pdf" style={pdfStyle}>
                Your browser does not support objects
              </object>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._handleCloseCatering}>Close</Button>
          </Modal.Footer>
        </Modal>

      </Col>

    )

  }

  _handleCloseMenu = () => {
    this.setState({showMenu: false})
    this.setState({pageNumber: 1})
  }

  _handleShowMenu = () => {
    this.setState({showMenu: true})
  }

  _handleCloseCatering = () => {
    this.setState({showCatering: false})
    this.setState({pageNumber: 1})
  }

  _handleShowCatering = () => {
    this.setState({showCatering: true})
  }

  _onDocumentLoad = ({numPages}) => {
    this.setState({numPages});
  }

  _turnPdfPage = () => {
    const {pageNumber, numPages} = this.state

    let currPage = pageNumber
    if (currPage < numPages) {
      this.setState({pageNumber: currPage + 1})
    } else {
      this.setState({pageNumber: 1})
    }
  }

}

export default Menus