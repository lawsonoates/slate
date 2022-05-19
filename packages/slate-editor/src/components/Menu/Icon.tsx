import classNames from 'classnames';
import type { FunctionComponent, HTMLAttributes } from 'react';
import React from 'react';

export interface Props {
    className?: string;
    icon: FunctionComponent<HTMLAttributes<SVGElement>>;
}

export function Icon({ className, icon: IconComponent }: Props) {
    return <IconComponent className={classNames('editor-menu__icon', className)} />;
}
