import React from "react";
import {
  Grid as DXGrid,
  Table,
  TableHeaderRow
} from "@devexpress/dx-react-grid-bootstrap4";

export default class Grid extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: "id", title: "ID" },
        { name: "fromAddress", title: "Начальный адрес" },
        { name: "toAddress", title: "Конечный адрес" },
        { name: "volume", title: "Объем груза" },
        { name: "weight", title: "Вес груза" },
      ]
    };
  }
  render() {
    const { rows } = this.props;
    const { columns } = this.state;

    return (
      <DXGrid rows={rows} columns={columns}>
        <Table />
        <TableHeaderRow />
      </DXGrid>
    );
  }
}