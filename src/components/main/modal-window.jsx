import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MapWithSearch } from './map-with-search';

export default class ModalWindow extends React.PureComponent {
  render() {
    const { toggleModal, addRow, setVolume, setFrom, setTo, setWeight } = this.props.actions;
    const { showModal, volume, weight, from, to, customers, directions, fromAddress, toAddress, volumes, weights } = this.props.clientProps;
    
    const onButtonAddClick = (_from, _fromAddress, _to, _toAddress, _volume, _weight) => {
      addRow({ from: _from, to: _to, volume: _volume, fromAddress: _fromAddress, toAddress: _toAddress, weight: _weight }, directions, customers, volumes, weights);
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
            <input onChange={e => setVolume(e.target.value * 1)} type="text" className="form-control" placeholder="Объем товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">кг</span>
            </div>
            <input onChange={e => setWeight(e.target.value * 1)} type="text" className="form-control" placeholder="Вес товара" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="btn-success"
            onClick={() => onButtonAddClick(from, fromAddress, to, toAddress, volume, weight)}
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
