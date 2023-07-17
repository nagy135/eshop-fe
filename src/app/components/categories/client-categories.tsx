"use client";

import { Categories } from "./types";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

interface ICategories {
  categories: Categories;
}

export default function ClientCategories({ categories }: ICategories) {
  return (
    <div className="w-full">
      <div>
        {categories.map((category) => (
          <Dropdown title={category.data.name}>
            {category.children &&
              category.children.map((child) => {
                return child.children ? (
                  <Dropdown.Menu title={child.data.name}>
                    {child.children &&
                      child.children.map((child2) => {
                        return (
                          <Dropdown.Item>{child2.data.name}</Dropdown.Item>
                        );
                      })}
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Item>{child.data.name}</Dropdown.Item>
                );
              })}
          </Dropdown>
        ))}
      </div>
    </div>
  );
}
