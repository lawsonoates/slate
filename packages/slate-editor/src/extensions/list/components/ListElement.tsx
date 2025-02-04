import type { ListNode } from '@prezly/slate-types';
import { Alignment, BULLETED_LIST_NODE_TYPE, NUMBERED_LIST_NODE_TYPE } from '@prezly/slate-types';
import classNames from 'classnames';
import type { HTMLAttributes, Ref } from 'react';
import React, { forwardRef } from 'react';

interface Props extends HTMLAttributes<HTMLUListElement | HTMLOListElement> {
    element: ListNode;
}

export const ListElement = forwardRef<HTMLUListElement | HTMLOListElement, Props>(
    ({ children, className: customClassName, element, ...props }: Props, ref) => {
        const className = classNames(
            'pl-4 text-editor-text text-editor-paragraph leading-editor-paragraph',
            {
                'list-disc': element.type === BULLETED_LIST_NODE_TYPE,
                'list-decimal': element.type === NUMBERED_LIST_NODE_TYPE,
                // Inherit alignment
                'text-inherit': element.align === undefined,
                // Explicit alignments with list markers inside
                'pl-0 pr-0 list-inside': element.align !== undefined,
                'text-left': element.align === Alignment.LEFT,
                'text-center': element.align === Alignment.CENTER,
                'text-right': element.align === Alignment.RIGHT,
            },
            // Nested list styles
            '[&_.list-decimal]:list-[lower-latin]',
            '[&_.list-decimal_.list-decimal]:list-[lower-roman]',
            '[&_.list-decimal_.list-decimal_.list-decimal]:list-decimal',
            '[&>ul]:m-0 [&>ol]:m-0', // Remove margins from nested lists
            customClassName,
        );

        if (element.type === BULLETED_LIST_NODE_TYPE) {
            return (
                <ul {...props} className={className} ref={ref as Ref<HTMLUListElement>}>
                    {children}
                </ul>
            );
        }

        return (
            <ol {...props} className={className} ref={ref as Ref<HTMLOListElement>}>
                {children}
            </ol>
        );
    },
);

ListElement.displayName = 'ListElement';
