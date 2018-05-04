import React, {Component} from 'react'
import {Modal, Button, Col, Row, ButtonToolbar} from 'react-bootstrap'
import {Document, Page} from 'react-pdf/dist/entry.webpack'
import './Menus.css'

class Menus extends Component {
  state = {
    showMenu: false,
    showCatering: false,
    numPages: null,
    pageNumber: 1,
  }

  render() {

    const {pageNumber, numPages} = this.state

    return (

      <Col lg={6}>
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
              onClick={e => window.open('https://www.google.com/maps/dir/?api=1&destination=' + this.props.list.coordinates.lat + ',' + this.props.list.coordinates.lng, '_blank')}>
              Directions
            </Button>
          </ButtonToolbar>
        </Row>

          <Modal
            show={this.state.showMenu}
            onHide={this._handleCloseMenu}
            dialogClassName="custom-modal">
            <Modal.Header closeButton>
              <Modal.Title>{this.props.list.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>House Menu</h4>

              <div className="smaller-screen-locations">
                {this.props.list.houseMenuUrl.map(menuPic =>
                  <img key={menuPic} src={'images/' + menuPic + '.jpg'} alt="menu" width="100%"/>)}
              </div>

              <div className="large-screen-locations">
                <Document
                  onLoadSuccess={this._onDocumentLoad} file={'pdf/House_' + this.props.list.label + '.pdf'}
                  onClick={this._turnPdfPage}
                >
                  <Page
                    pageNumber={pageNumber}
                    className="pdf-menu"
                    width={window.innerWidth * .85}/>
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
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
              <Modal.Title>{this.props.list.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Catering Menu</h4>

              <div className="smaller-screen-locations">
                {this.props.list.cateringMenuUrl.map(menuPic => <img key={menuPic} src={'images/' + menuPic + '.jpg'}
                                                                     alt="menu" width="100%"/>)}
              </div>

              <div className="large-screen-locations">
                <Document
                  onLoadSuccess={this._onDocumentLoad} file={'pdf/Catering_' + this.props.list.label + '.pdf'}
                  onClick={this._turnPdfPage}
                >
                  <Page
                    pageNumber={pageNumber}
                    className="pdf-menu"
                    width={window.innerWidth * .85}/>
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
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