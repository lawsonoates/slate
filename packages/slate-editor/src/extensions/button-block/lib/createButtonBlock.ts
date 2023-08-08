import { v4 as generateUuid } from 'uuid';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function createButtonBlock(
    props: Partial<Omit<ButtonBlockNode, 'type' | 'children'>>,
): ButtonBlockNode {
    const {
        href = '',
        new_tab = false,
        layout = ButtonBlockNode.Layout.CENTER,
        variant = ButtonBlockNode.Variant.DEFAULT,
        uuid = generateUuid(),
        label = 'Click me!',
    } = props;

    return {
        href,
        layout,
        new_tab,
        label,
        type: ButtonBlockNode.Type,
        uuid,
        variant,
        children: [{ text: '' }],
    };
}
