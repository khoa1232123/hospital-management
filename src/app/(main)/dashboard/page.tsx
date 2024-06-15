"use client";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// @ts-ignore
import { Editor } from "ckeditor5-custom-build";
// import { useState } from "react";
//@ts-ignore

// Editor.builtinPlugins.push(LineHeight);
// window.CKEDITOR_TRANSLATIONS = window.CKEDITOR_TRANSLATIONS || {};
// window.CKEDITOR_TRANSLATIONS["en"] = window.CKEDITOR_TRANSLATIONS["en"] || {};
// Object?.assign(window.CKEDITOR_TRANSLATIONS["en"].dictionary, {
//   Save: "Zapisz",
// });
const imageConfiguration = {
  resizeOptions: [
    {
      name: "resizeImage:original",
      value: null,
      label: "Original",
    },
    {
      name: "resizeImage:custom",
      label: "Custom",
      value: "custom",
    },
    {
      name: "resizeImage:40",
      value: "100px",
      label: "40%",
    },
    {
      name: "resizeImage:60",
      value: "60",
      label: "60%",
    },
  ],
  toolbar: ["resizeImage" /* ... */],
};
const editorConfiguration = {
  // lineHeight: {
  //   // specify your otions in the lineHeight config object. Default values are [ 0, 0.5, 1, 1.5, 2 ]
  //   options: [0.5, 1, 1.5, 2, 2.5],
  // },
  removePlugins: ["Title"],
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 36, 48],
  },
  placeholder: "Hello...",
  menuBar: {
    isVisible: true,
  },
  image: imageConfiguration,
  toolbar: [
    "lineHeight",
    "heading",
    "|",
    "fontFamily",
    "fontSize",
    "bold",
    "italic",
    "underline",
    "bulletedList",
    "numberedList",
    "outdent",
    "indent",
    "alignment:left",
    "alignment:right",
    "alignment:center",
    "alignment:justify",
    "fontColor",
    "fontBackgroundColor",
    "link",
    "imageInsert",
    "insertTable",
    "undo",
    "redo",
  ],
  additionalLanguages: "all",
  language: "en",
  en: {
    Edit: "Chỉnh sửa 2",
  },
};

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div>
      <CKEditor
        //@ts-ignore
        editor={Editor}
        config={{ ...editorConfiguration }}
      />
    </div>
  );
};

export default DashboardPage;
