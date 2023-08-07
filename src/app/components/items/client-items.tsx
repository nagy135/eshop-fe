"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Modal, Button } from "rsuite";
import { Item } from "@/app/types";
import { getItems } from "./items";

interface IClientItems {
  items: Item[];
  categoryId?: number;
}

type ModalState = {
  item: Item | null;
};

const defaultModalState: ModalState = {
  item: null,
};

export default function ClientItems({ items, categoryId }: IClientItems) {
  const [itemBag, setItemBag] = useState<Item[]>(items);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [modalState, setModalState] = useState(defaultModalState);

  const observerTarget = useRef(null);

  const handleOpen = (item: Item) => {
    setModalState({ item });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const newPage = useCallback(async () => {
    const newItems = await getItems(categoryId, page + 1, undefined, true);
    setItemBag((p) => [...p, ...newItems]);
    setPage((p) => p + 1);
  }, [page]);

  const newPageRef = useRef(newPage);
  useEffect(() => {
    newPageRef.current = newPage;
  }, [newPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          await newPageRef.current();
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);
  return (
    <>
      <div className="container relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16 sm:gap-4 sm:gap-y-8 sm:mx-auto px-4">
        {itemBag.map((item, i) => (
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
        <div className="absolute bottom-0 h-[300px]" ref={observerTarget}></div>
      </div>
      {!!modalState.item ? (
        <Modal open={open} onClose={handleClose}>
          <Modal.Header>
            <Modal.Title className="text-lg capitalize">
              {modalState.item?.name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="relative">
              <Image
                src={`http://api:8000/media/${modalState.item.image__image[0]}`}
                width={300}
                height={300}
                className="w-full object-contain rounded h-96 group-hover:scale-105 transition duration-200"
                alt="Banner"
              />
              <div className="flex flex-row-reverse">
                <div className="font-bold bg-black/75 text-white p-1 rounded text-lg">
                  {modalState.item.price}€
                </div>
              </div>
            </div>
            <div className="mx-2 mt-9 text-justify">
              {modalState.item.description}
            </div>
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
                onClick={handleClose}
                appearance="primary"
                className="bg-green-700"
                color="green"
              >
                Buy
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : null}
    </>
  );
}
