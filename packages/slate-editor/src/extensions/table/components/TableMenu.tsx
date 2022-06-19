import { TableEditor } from '@prezly/slate-tables';
import type { TableNode } from '@prezly/slate-types';
import React from 'react';
import { useSlateStatic } from 'slate-react';

import { HStack, Toggle } from '#components';
import { Button, Toolbox } from '#components';
import { Delete, Add } from '#icons';

interface Props {
    element: TableNode;
    onClose: () => void;
}

export function TableMenu({ element, onClose }: Props) {
    const editor = useSlateStatic();

    return (
        <Toolbox.Panel>
            <Toolbox.Header withCloseButton onCloseClick={onClose}>
                Table settings
            </Toolbox.Header>

            <Toolbox.Section caption="Layout">
                <Toggle
                    name="borders"
                    value={element.border}
                    onChange={() => TableEditor.updateTable(editor, { border: !element.border })}
                >
                    With borders
                </Toggle>
                <Toggle
                    name="header-row"
                    value={element.header?.some((h) => h === 'first_row')}
                    onChange={() => TableEditor.toggleTableHeader(editor, undefined, 'first_row')}
                >
                    First row as header
                </Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Rows">
                <HStack spacing="1">
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TableEditor.insertRowAbove(editor)}
                    >
                        Above
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TableEditor.insertRowBelow(editor)}
                    >
                        Below
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => TableEditor.removeRow(editor)}
                    />
                </HStack>
            </Toolbox.Section>

            <Toolbox.Section caption="Columns">
                <HStack spacing="1">
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TableEditor.insertColumnLeft(editor)}
                    >
                        Above
                    </Button>
                    <Button
                        icon={Add}
                        variant="primary"
                        fullWidth
                        round
                        noPadding
                        onClick={() => TableEditor.insertColumnRight(editor)}
                    >
                        Below
                    </Button>
                    <Button
                        icon={Delete}
                        variant="primary"
                        round
                        onClick={() => TableEditor.removeColumn(editor)}
                    />
                </HStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button
                    variant="clear-faded"
                    icon={Delete}
                    fullWidth
                    onClick={() => TableEditor.removeTable(editor)}
                >
                    Remove table
                </Button>
            </Toolbox.Footer>
        </Toolbox.Panel>
    );
}
