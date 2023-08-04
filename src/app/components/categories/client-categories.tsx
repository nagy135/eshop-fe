"use client";

import { Categories } from "./types";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import Link from "next/link";

interface ICategories {
  categories: Categories;
}

export default function ClientCategories({ categories }: ICategories) {
  return (
    <div className="w-full mt-2">
      <div>
        {categories.map((category, i) => (
          <Dropdown key={`category-group-${i}`} title={category.data.name}>
            {category.children &&
              category.children.map((child, i) => {
                return child.children ? (
                  <Dropdown.Menu
                    key={`category-menu-${i}`}
                    title={child.data.name}
                  >
                    {child.children &&
                      child.children.map((child2) => {
                        return (
                          <Link
                            className="hover:no-underline"
                            href={`/categories/${child2.id}`}
                          >
                            <Dropdown.Item key={`category-${child2.id}`}>
                              {child2.data.name}
                            </Dropdown.Item>
                          </Link>
                        );
                      })}
                  </Dropdown.Menu>
                ) : (
                  <Link
                    className="hover:no-underline"
                    href={`/categories/${child.id}`}
                  >
                    <Dropdown.Item key={`category-${child.id}`}>
                      {child.data.name}
                    </Dropdown.Item>
                  </Link>
                );
              })}
          </Dropdown>
        ))}
      </div>
    </div>
  );
}
