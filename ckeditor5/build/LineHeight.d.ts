import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
export default class LineHeightPlugin extends Plugin {
    static get requires(): string[];
    static get pluginName(): string;
    init(): void;
}
