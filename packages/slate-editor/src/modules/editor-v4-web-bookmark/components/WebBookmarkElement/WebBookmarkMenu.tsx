import type { BookmarkNode } from '@prezly/slate-types';
import { BookmarkCardLayout } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelected, useSlate } from 'slate-react';

import type { OptionsGroupOption } from '#components';
import { Button, Link, OptionsGroup, Toggle, Toolbox, VStack } from '#components';
import { Delete, ExternalLink, ItemsLayoutHorizontal, ItemsLayoutVertical } from '#icons';

import { EventsEditor } from '#modules/editor-v4-events';

import { removeWebBookmark } from '../../transforms';

import styles from './WebBookmarkMenu.module.scss';

interface Props {
    element: BookmarkNode;
}

const LAYOUT_OPTIONS: OptionsGroupOption<BookmarkCardLayout>[] = [
    {
        value: BookmarkCardLayout.VERTICAL,
        Icon: ({ isActive }) => (
            <ItemsLayoutVertical
                className={classNames(styles.optionIcon, { [styles.active]: isActive })}
            />
        ),
        label: 'Vertical',
    },
    {
        value: BookmarkCardLayout.HORIZONTAL,
        Icon: ({ isActive }) => (
            <ItemsLayoutHorizontal
                className={classNames(styles.optionIcon, { [styles.active]: isActive })}
            />
        ),
        label: 'Horizontal',
    },
];

export const WebBookmarkMenu: FunctionComponent<Props> = ({ element }) => {
    const editor = useSlate();
    const isSelected = useSelected();

    function handleRemove() {
        const removedElement = removeWebBookmark(editor);

        if (removedElement) {
            EventsEditor.dispatchEvent(editor, 'web-bookmark-removed', {
                uuid: removedElement.uuid,
            });
        }
    }

    if (!isSelected) {
        return null;
    }

    return (
        <>
            <Toolbox.Header withCloseButton>Web bookmark settings</Toolbox.Header>

            <Toolbox.Section noPadding>
                <Link href="#" Icon={ExternalLink} fullWidth>
                    View
                </Link>
            </Toolbox.Section>

            <Toolbox.Section caption="Preview image">
                <Toggle>Show preview image</Toggle>
            </Toolbox.Section>

            <Toolbox.Section caption="Card layout">
                <VStack spacing="spacing-1-5">
                    <OptionsGroup<BookmarkCardLayout>
                        name="card-layout"
                        type="radio"
                        options={LAYOUT_OPTIONS}
                        selected={element.layout}
                        onChange={() => null} // FIXME
                        columns={3}
                    />
                    <Toggle>Open in new tab</Toggle>
                </VStack>
            </Toolbox.Section>

            <Toolbox.Footer>
                <Button variant="clear" Icon={Delete} fullWidth onMouseDown={handleRemove}>
                    Remove web bookmark
                </Button>
            </Toolbox.Footer>
        </>
    );
};
