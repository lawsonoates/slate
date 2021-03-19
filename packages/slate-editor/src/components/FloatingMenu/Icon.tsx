import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import SvgIcon from '../SvgIcon';

export interface Props {
    className?: string;
    icon: BrowserSpriteSymbol;
}

const Icon: FunctionComponent<Props> = ({ className, icon }) => (
    <SvgIcon className={classNames('floating-menu__icon', className)} icon={icon} />
);

export default Icon;
