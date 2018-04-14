import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MapWithSearch } from './map-with-search';

export default class ModalWindow extends React.PureComponent {
  render() {
    const { toggleModal, addRow, setVolume, setFrom, setTo } = this.props.actions;
    const { showModal, volume, from, to, customers, directions, fromAddress, toAddress } = this.props.clientProps;
    
    const onButtonAddClick = (_from, _fromAddress, _to, _toAddress, _volume) => {
      addRow({ from: _from, to: _to, volume: _volume, fromAddress: _fromAddress, toAddress: _toAddress }, directions, customers);
      toggleModal();
    };

    return (
      <Modal
        size="large"
        isOpen={showModal}
      >
        <ModalHeader>
          Добавить запись
        </ModalHeader>
        <ModalBody>
          <MapWithSearch
            setData={setFrom}
            from
          />
          <MapWithSearch
            setData={setTo}
          />
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">м3</span>
            </div>
            <input onChange={e => setVolume(e.target.value)} type="text" className="form-control" placeholder="Объем товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-success"
            onClick={() => onButtonAddClick(from, fromAddress, to, toAddress, volume)}
          >
            Добавить
          </Button>
          <Button
            className="btn-danger"
            onClick={toggleModal}
          >
            Отменить
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}
