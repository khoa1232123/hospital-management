import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LineHeight from "./lineheight";

ClassicEditor.builtinPlugins.push(LineHeight);

ClassicEditor.defaultConfig = {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "lineHeight",
      "|",
      "insertTable",
      "mediaEmbed",
      "undo",
      "redo",
    ],
  },
  lineHeight: {
    options: [1, 1.2, 1.4, 1.6, 1.8, 2],
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  language: "en",
};

export default { ClassicEditor };
