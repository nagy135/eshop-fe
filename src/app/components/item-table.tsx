import { Table, Button } from "rsuite";
import { useBucketContext } from "../contexts/providers";
import { MdDelete } from "react-icons/md";

const { Column, HeaderCell, Cell } = Table;

export default function ItemTable() {
  const { items } = useBucketContext();
  if (!items) return null;

  return (
    <Table
      data={items}
      autoHeight={true}
      onRowClick={(rowData) => {
        console.log(rowData);
      }}
    >
      <Column minWidth={50} flexGrow={1} resizable={true} align="left" fixed>
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column minWidth={150} resizable={true} fullText={true}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>

      <Column minWidth={50} flexGrow={1} resizable={true} align="right">
        <HeaderCell>Price</HeaderCell>
        <Cell dataKey="price" />
      </Column>

      <Column minWidth={15} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell className="group" style={{ padding: "6px" }}>
          {(rowData) => (
            <Button
              color="red"
              appearance="ghost"
              onClick={() => alert(`id:${rowData.id}`)}
            >
              <MdDelete color="red" />
            </Button>
          )}
        </Cell>
      </Column>
    </Table>
  );
}
