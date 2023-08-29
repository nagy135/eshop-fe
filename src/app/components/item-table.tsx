"use client";

import { Button } from "rsuite";
import { Table, Column, HeaderCell, Cell } from "rsuite-table";
import { useBucketContext, useSyncedUser } from "@/app/contexts/providers";
import { MdDelete } from "react-icons/md";
import { Item } from "../types";
import { removeItemFromBucket } from "../queries/remove-item-from-bucket";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { QueryKeys } from "../queries/enums";
import toast from "react-hot-toast";

export default function ItemTable() {
  const user = useSyncedUser();
  const queryClient = useQueryClient();
  const { items, setItems } = useBucketContext();
  if (!items) return null;

  const deleteItemFromBucketHandler = useCallback(
    async (id: number) => {
      if (!user) return;
      const promise = removeItemFromBucket(id, user.id);
      toast.promise(promise, {
        loading: "removing",
        success: "Item removed from bucket",
        error: "Error during removing",
      });
      // NOTE: items are not null because we wouldnt have button to click on to get here otherwise
      const bucketId = await promise;
      console.log(
        "================\n",
        "bucketId: ",
        bucketId,
        "\n================"
      );
      setItems((e) => e!.filter((item) => item.id !== id));
      queryClient.invalidateQueries({ queryKey: [QueryKeys.BUCKET] });
    },
    [user]
  );

  return (
    <Table data={items} height={400}>
      <Column width={100} flexGrow={1} resizable={true} align="left">
        <HeaderCell>Name</HeaderCell>
        <Cell dataKey="name" />
      </Column>

      <Column minWidth={50} resizable={true} fullText={true}>
        <HeaderCell>Description</HeaderCell>
        <Cell dataKey="description" />
      </Column>

      <Column minWidth={50} flexGrow={1} resizable={true} align="right">
        <HeaderCell>Price</HeaderCell>
        <Cell dataKey="price" />
      </Column>

      <Column width={45} fixed="right">
        <HeaderCell>...</HeaderCell>

        <Cell className="group" style={{ padding: "6px" }}>
          {(rowDataRaw) => {
            const rowData = rowDataRaw as Item;
            return (
              <Button
                color="red"
                appearance="ghost"
                onClick={() => deleteItemFromBucketHandler(rowData.id)}
              >
                <MdDelete color="red" />
              </Button>
            );
          }}
        </Cell>
      </Column>
    </Table>
  );
}
