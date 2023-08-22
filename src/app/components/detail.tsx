"use client";

import { Button, Modal } from "rsuite";
import { Item } from "../types";
import Image from "next/image";
import { useCallback } from "react";
import { useBucketContext, useSyncedUser } from "@/app/contexts/providers";
import { addItemToBucket } from "../queries/add-item-to-basket";

interface IDetail {
  handleClose: any;
  open: boolean;
  item: Item;
}

export default function Detail({ handleClose, item, open: isOpen }: IDetail) {
  const user = useSyncedUser();
  const { setItems } = useBucketContext();

  const handleItemAdding = useCallback(
    async (itemId: number, userId: number) => {
      const bucketId = await addItemToBucket(itemId, userId);
      setItems((e) => e);
    },
    []
  );

  const handleBuy = useCallback(async () => {
    if (!user) alert("not logged in");
    else {
      await handleItemAdding(item.id, user.id);
    }
    handleClose();
  }, [item, user]);
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title className="text-lg capitalize">{item.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="relative">
          <Image
            src={`http://api:8000/media/${item.image__image[0]}`}
            width={300}
            height={300}
            className="w-full object-contain rounded h-96 group-hover:scale-105 transition duration-200"
            alt="Banner"
          />
          <div className="flex flex-row-reverse">
            <div className="font-bold bg-black/75 text-white p-1 rounded text-lg">
              {item.price}€
            </div>
          </div>
        </div>
        <div className="mx-2 mt-9 text-justify">{item.description}</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="m-2">
          <Button
            onClick={handleClose}
            appearance="primary"
            className="bg-red-400"
            color="red"
          >
            Cancel
          </Button>

          <Button
            onClick={handleBuy}
            appearance="primary"
            className="bg-green-700"
            color="green"
          >
            Buy
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
