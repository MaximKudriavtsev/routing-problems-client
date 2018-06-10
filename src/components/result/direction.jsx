import * as React from 'react';

export default class Direction extends React.PureComponent {
  render() {
    const { minimalChain, rows } = this.props;
    return (
      <div>
        <p>Длина маршрута: {minimalChain.length / 1000} км</p>
        {/* {minimalChain.chain.map(item => <span>{item} </span>)} */}
        {minimalChain.chain.map((item, index) => {
          if (item > 0) return (<p><b style={{ color: '#28a745' }}>&#9899; {index}: {rows[item].fromAddress}</b></p>);
          if (item < 0) return (<p><b style={{ color: '#dc3545' }}>&#9899; {index}: {rows[-item].toAddress}</b></p>);
          return <p>&#9899; <b>{index}: г. Тула ГАРАЖ</b></p>
        })}
        <p><span style={{ color: '#28a745' }}>Загрузка</span><span style={{ color: '#dc3545' }}> Доставка</span></p>
      </div>
    );
  }
}