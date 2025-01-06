"use client";

import { useEffect, useState } from "react";

import { Tree, Select } from "antd";
const { DirectoryTree } = Tree;
const { Option } = Select;

import { getCategories } from "@/actions/category.action";
import Loaderbar from "../Loaderbar";

export default function CategoryTreeSelection({ form, setForm }) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [treeData, setTreeData] = useState([]);

  const handleCategorySelect = (selectedNode) => {
    if (selectedNode.isLeaf) {
      setForm((prevForm) => {
        const existingSub = prevForm.subCategories.find(
          (sub) => sub.name === selectedNode.parentTitle
        );

        return {
          ...prevForm,
          subCategories: existingSub
            ? prevForm.subCategories.map((sub) =>
                sub.name === selectedNode.parentTitle
                  ? {
                      ...sub,
                      items: [
                        ...new Set([
                          ...sub.items,
                          { name: selectedNode.title, slug: selectedNode.key },
                        ]),
                      ],
                    }
                  : sub
              )
            : [
                ...prevForm.subCategories,
                {
                  name: selectedNode.parentTitle,
                  slug: selectedNode.key,
                  items: [{ name: selectedNode.title, slug: selectedNode.key }],
                },
              ],
        };
      });
    } else if (selectedNode.children && selectedNode.parentTitle) {
      setForm((prevForm) => {
        const existingSub = prevForm.subCategories.find(
          (sub) => sub.name === selectedNode.title
        );

        return existingSub
          ? prevForm
          : {
              ...prevForm,
              subCategories: [
                ...prevForm.subCategories,
                { name: selectedNode.title, slug: selectedNode.key, items: [] },
              ],
            };
      });
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        categoryName: selectedNode.title,
        slug: selectedNode.key,
        subCategories: [],
      }));
    }
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.name === value);

    setForm((prevForm) => ({
      ...prevForm,
      categoryName: value,
      slug: selectedCategory?.slug || "",
      subCategories: [],
    }));
  };

  const handleSubCategoryChange = (selectedValues) => {
    console.log(selectedValues);
    setForm((prevForm) => ({
      ...prevForm,
      subCategories: selectedValues.map((sub) => ({
        name: sub,
        items: prevForm.subCategories.find((s) => s.name === sub)?.items || [],
      })),
    }));
  };

  const handleItemChange = (subCategoryName, selectedValues) => {
    setForm((prevForm) => ({
      ...prevForm,
      subCategories: prevForm.subCategories.map((sub) =>
        sub.name === subCategoryName
          ? {
              ...sub,
              items: selectedValues.map((value) => {
                const [name, slug] = value.split("|");
                return { name, slug };
              }),
            }
          : sub
      ),
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { category } = await getCategories();

        const publishedCategories = category.filter(
          (cat) => cat.published === true
        );

        setCategories(publishedCategories);

        const formattedTreeData = publishedCategories.map((cat) => ({
          title: cat.name,
          key: cat.slug,
          children:
            cat.subcategories?.map((sub) => ({
              title: sub.name,
              key: sub.slug,
              parentTitle: cat.name,
              children:
                sub.items?.map((item, index) => ({
                  title:
                    typeof item === "string" ? item : item.name || "بدون نام",
                  key: item.slug,
                  isLeaf: true,
                  parentTitle: sub.name,
                })) || [],
            })) || [],
        }));

        setTreeData(formattedTreeData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleSelect = (keys, info) => {
    handleCategorySelect(info.node);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full flex items-center gap-3 flex-col-reverse  md:flex-row md:justify-between">
        <Select
          placeholder="انتخاب دسته‌بندی"
          onChange={handleCategoryChange}
          value={form.categoryName}
          style={{ width: "50%", marginBottom: 10 }}
        >
          {categories.map((cat) => (
            <Option key={cat.slug} value={cat.name}>
              {cat.name}
            </Option>
          ))}
        </Select>{" "}
        {form.slug && (
          <div className="my-5 text-gray flex-1">
            <strong>اسلاگ:</strong> {form.slug}
          </div>
        )}
      </div>
      <div className="w-full flex items-center gap-3 flex-col md:flex-row">
        {form.categoryName && (
          <Select
            placeholder="انتخاب زیر‌دسته‌بندی‌ها"
            mode="multiple"
            onChange={handleSubCategoryChange}
            value={form.subCategories.map((sub) => sub.name)}
            style={{ width: "100%", marginBottom: 10 }}
          >
            {categories
              .find((cat) => cat.name === form.categoryName)
              ?.subcategories.map((sub) => (
                <Option key={sub.name} value={sub.name}>
                  {sub.name}
                </Option>
              ))}
          </Select>
        )}

        {form.subCategories.map((sub) => (
          <Select
            key={sub.name}
            placeholder={`انتخاب آیتم‌های زیر‌دسته ${sub.name}`}
            mode="multiple"
            onChange={(value) => handleItemChange(sub.name, value)}
            value={sub.items.map((item) => `${item.name}|${item.slug}`)}
            maxTagCount={2}
            style={{ width: "100%", marginBottom: 10 }}
          >
            {categories
              .find((cat) => cat.name === form.categoryName)
              ?.subcategories.find((s) => s.name === sub.name)
              ?.items.map((item) => (
                <Option
                  key={`${item.name}|${item.slug}`}
                  value={`${item.name}|${item.slug}`}
                >
                  {item.name}
                </Option>
              ))}
          </Select>
        ))}
      </div>
      {isLoading ? (
        <Loaderbar />
      ) : (
        <DirectoryTree
          multiple
          onSelect={handleSelect}
          treeData={treeData}
          className="dark:bg-dark1 dark:text-lightGray"
        />
      )}
    </div>
  );
}
