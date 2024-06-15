import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import Command from "@ckeditor/ckeditor5-core/src/command";
import {
  addListToDropdown,
  createDropdown,
} from "@ckeditor/ckeditor5-ui/src/dropdown/utils";
import Model from "@ckeditor/ckeditor5-ui/src/model";
import Collection from "@ckeditor/ckeditor5-utils/src/collection";
import icons from "@ckeditor/ckeditor5-core/theme/icons/paragraph.svg";

export default class LineHeight extends Plugin {
  static get pluginName() {
    return "LineHeight";
  }

  init() {
    const editor = this.editor;

    editor.commands.add("lineHeight", new LineHeightCommand(editor));

    editor.ui.componentFactory.add("lineHeight", (locale) => {
      const command = editor.commands.get("lineHeight");
      const dropdownView = createDropdown(locale);

      const items = new Collection();
      const options = [
        { title: "1", value: "1" },
        { title: "1.2", value: "1.2" },
        { title: "1.4", value: "1.4" },
        { title: "1.6", value: "1.6" },
        { title: "1.8", value: "1.8" },
        { title: "2", value: "2" },
      ];

      options.forEach((option) => {
        const itemModel = new Model({
          commandValue: option.value,
          label: option.title,
          withText: true,
        });

        itemModel.on("execute", () => {
          editor.execute("lineHeight", { value: option.value });
          editor.editing.view.focus();
        });

        items.add(itemModel);
      });

      addListToDropdown(dropdownView, items);

      dropdownView.buttonView.set({
        label: "Line Height",
        icon: icons,
        tooltip: true,
      });

      dropdownView.bind("isEnabled").to(command);

      return dropdownView;
    });
  }
}

class LineHeightCommand extends Command {
  execute(options: { value: string }) {
    const editor = this.editor;
    const value = options.value;

    editor.model.change((writer) => {
      const blocks = editor.model.document.selection.getSelectedBlocks();

      for (const block of blocks) {
        writer.setAttribute("lineHeight", value, block);
      }
    });
  }

  refresh() {
    const editor = this.editor;
    const blocks = Array.from(
      editor.model.document.selection.getSelectedBlocks()
    );
    const isAllowed = blocks.every((block) => block.is("paragraph"));

    this.isEnabled = isAllowed;

    if (isAllowed) {
      const firstBlock = blocks[0];
      this.value = firstBlock.getAttribute("lineHeight") || "1";
    }
  }
}
