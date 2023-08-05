"use client";

import { useState } from "react";
import Image from "next/image";
import { Modal, Button, Placeholder } from "rsuite";
import { Item } from "@/app/types";

interface IClientItems {
  items: Item[];
}

type ModalState = {
  item: Item | null;
};

const defaultModalState: ModalState = {
  item: null,
};

export default function ClientItems({ items }: IClientItems) {
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(defaultModalState);
  const handleOpen = (item: Item) => {
    setModalState({ item });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 sm:gap-4 sm:gap-y-8 sm:mx-auto px-4">
        {items.map((item, i) => (
          <div
            key={`item-${i}`}
            onClick={() => handleOpen(item)}
            className="p-3 drop-shadow-2xl h-64 group cursor-pointer"
          >
            {item.image__image.length ? (
              <div className="object-contain">
                <Image
                  src={`http://api:8000/media/${item.image__image[0]}`}
                  width={300}
                  height={300}
                  className="w-full object-cover rounded h-64 group-hover:scale-105 transition duration-200"
                  alt="Banner"
                />
              </div>
            ) : null}

            <Button className="absolute bottom-0 right-0 font-bold bg-white text-black p-2 rounded ">
              {item.name}
            </Button>
            <div className="absolute top-0 left-0 font-bold bg-black/75 text-white p-1 rounded text-lg hover:scale-110">
              {item.price}€
            </div>
          </div>
        ))}
      </div>
      <Modal open={open && !!modalState.item} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title className="text-lg capitalize">
            {modalState.item?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            src={`http://api:8000/media/${modalState.item?.image__image[0]}`}
            width={300}
            height={300}
            className="w-full object-contain rounded h-96 group-hover:scale-105 transition duration-200"
            alt="Banner"
          />
          <Placeholder.Paragraph />
          <Placeholder.Paragraph />
          <Placeholder.Paragraph />
          <Placeholder.Paragraph />
          <Placeholder.Paragraph />
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            appearance="primary"
            className="bg-red-400"
            color="red"
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
