import { EditorCommands } from '@prezly/slate-commons';
import { AttachmentNode, isAttachmentNode } from '@prezly/slate-types';
import { Editor } from 'slate';

const getCurrentFileAttachmentElement = (editor: Editor): AttachmentNode | null => {
    const [currentNode] = EditorCommands.getCurrentNodeEntry(editor) || [];
    if (currentNode && isAttachmentNode(currentNode)) {
        return currentNode;
    }
    return null;
};

export default getCurrentFileAttachmentElement;
