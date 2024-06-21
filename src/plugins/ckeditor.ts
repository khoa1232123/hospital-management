//@ts-ignore
import { Editor } from "ckeditor5-custom-build";
import { LineHeight } from "@rickx/ckeditor5-line-height";

Editor.builtinPlugins.push(LineHeight);

export { Editor };
