import React, {Component} from 'react'
import {Modal, Button, Col, Row, ButtonToolbar} from 'react-bootstrap'
import { Document, Page } from 'react-pdf/dist/entry.webpack'
import './Menus.css'

class Menus extends Component {
  state = {
    showMenu: false,
    showCatering: false,
    numPages: null,
    pageNumber: 1,
  }

  render() {

    const { pageNumber, numPages } = this.state

    return (

      <Col lg={6}>
        <Row>
          <ButtonToolbar>
            <Button
              onClick={this._handleShowMenu}>
              Menu
            </Button>
            <Button
              onClick={this._handleShowCatering}>
              Catering Menu
            </Button>
          </ButtonToolbar>
        </Row>
        <Row>
          <ButtonToolbar>
            <Button
              onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.props.list.coordinates.lat + ',' + this.props.list.coordinates.lng, '_blank')}>
              Directions
            </Button>
          </ButtonToolbar>

          <Modal show={this.state.showMenu} onHide={this._handleCloseMenu}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.list.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>House Menu</h4>

              <div className="smaller-screen-locations">
              {this.props.list.houseMenuUrl.map(menuPic =>
                <img key={menuPic} src={'images/' + menuPic + '.jpg'} alt="menu" width="100%"/>)}
              </div>

                  <Document
                    onLoadSuccess={this._onDocumentLoad} file={'pdf/House_' + this.props.list.label + '.pdf'}
                    onClick={this._turnPdfPage}
                  >
                  <Page pageNumber={pageNumber} />
                  </Document>
              <p>Page {pageNumber} of {numPages}</p>




            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this._handleCloseMenu}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.showCatering} onHide={this._handleCloseCatering}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.list.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Catering Menu</h4>

              <div className="smaller-screen-locations">
              {this.props.list.cateringMenuUrl.map(menuPic => <img key={menuPic} src={'images/' + menuPic + '.jpg'} alt="menu" width="100%"/>)}
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this._handleCloseCatering}>Close</Button>
            </Modal.Footer>
          </Modal>

        </Row>
      </Col>

    )

  }

  _handleCloseMenu = () => {
    this.setState({showMenu: false});
  }

  _handleShowMenu = () => {
    this.setState({showMenu: true});
  }

  _handleCloseCatering = () => {
    this.setState({showCatering: false});
  }

  _handleShowCatering = () => {
    this.setState({showCatering: true});
  }

  _onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  _turnPdfPage = () => {
    const { pageNumber, numPages } = this.state

    let currPage = pageNumber
    if (currPage < numPages) {
      this.setState({pageNumber: currPage+1 })
    } else {
      this.setState({pageNumber: 1})
    }
  }

}

export default Menus