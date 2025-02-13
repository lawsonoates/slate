import { EditorCommands } from '@prezly/slate-commons';
import type { SlateEditor } from '@udecode/plate-common';
import { Range } from 'slate';

export function createOnCut(editor: SlateEditor) {
    return function (event: React.ClipboardEvent<HTMLDivElement>): void {
        event.preventDefault();

        editor.setFragmentData(event.clipboardData);

        const { selection } = editor;

        if (!selection) {
            return;
        }

        if (Range.isExpanded(selection)) {
            editor.deleteFragment();
            return;
        }

        // Code above this comment is a refactored copy of `onCut` handler from  `Editable`
        // from `slate-react`.
        // Code below this comment is meant to fix an issue with void element not being removed
        // from editor when cutting it when selection is collapsed.
        // see: https://app.clubhouse.io/prezly/story/20076/cutting-ctrl-x-does-not-work-on-blocks

        const [voidEntry] = Array.from(
            editor.nodes({
                match: (node) => EditorCommands.isVoid(editor, node),
            }),
        );

        if (voidEntry) {
            const [, voidEntryPath] = voidEntry;
            editor.removeNodes({ at: voidEntryPath, voids: true });
        }
    };
}
