"use client";

import { Button, Modal } from "rsuite";
import { useBucketContext } from "../contexts/providers";
import ItemTable from "./item-table";

export default function Order() {
  const { bucketOpen, setBucketOpen } = useBucketContext();
  if (!bucketOpen) return null;

  return (
    <Modal open={bucketOpen} onClose={() => setBucketOpen(false)}>
      <Modal.Header>
        <Modal.Title className="text-lg capitalize">Create Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ItemTable />
      </Modal.Body>
      <Modal.Footer>
        <div className="m-2">
          <Button
            onClick={() => setBucketOpen(false)}
            appearance="primary"
            className="bg-red-400"
            color="red"
          >
            Cancel
          </Button>

          <Button
            onClick={() => alert("next!")}
            appearance="primary"
            className="bg-green-700"
            color="green"
          >
            Next
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
