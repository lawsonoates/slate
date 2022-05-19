import classNames from 'classnames';
import type { ComponentType, FunctionComponent } from 'react';
import React from 'react';
import type { DropdownProps } from 'react-bootstrap';
import { Dropdown as BootstrapDropdown, MenuItem } from 'react-bootstrap';

import styles from './Dropdown.module.scss';

export namespace Dropdown {
    export interface Option<Value extends string> {
        hidden?: boolean;
        label: string;
        render?: ComponentType<{ option: Option<Value>; selected: boolean }>;
        value: Value;
    }

    export interface Props<Value extends string> extends Omit<DropdownProps, 'onChange'> {
        onChange: (value: Value) => void;
        options: Option<Value>[];
        value?: Value;
    }
}

export function Dropdown<Value extends string = string>({
    className,
    onChange,
    options,
    value,
    ...props
}: Dropdown.Props<Value>): ReturnType<FunctionComponent<Dropdown.Props<Value>>> {
    const selectedOption = options.find((option) => option.value === value);
    const visibleOptions = options.filter(({ hidden }) => !hidden);

    function handleSelect(newValue: any) {
        if (value !== newValue) {
            // if current value is equal to selected one, do nothing,
            // this saves us a little work in the callback
            onChange(newValue as Value);
        }
    }

    return (
        <BootstrapDropdown
            {...props}
            className={classNames(styles.Dropdown, className)}
            onSelect={handleSelect}
        >
            <BootstrapDropdown.Toggle>{selectedOption?.label}</BootstrapDropdown.Toggle>
            <BootstrapDropdown.Menu>
                {visibleOptions.map((option) => {
                    const Render = option.render ?? PlainLabel;
                    return (
                        <MenuItem
                            className={classNames(styles.MenuItem, {
                                [styles.selected]: option.value === value,
                            })}
                            eventKey={option.value}
                            key={option.value}
                        >
                            <Render option={option} selected={option.value === value} />
                        </MenuItem>
                    );
                })}
            </BootstrapDropdown.Menu>
        </BootstrapDropdown>
    );
}

function PlainLabel(props: { option: { label: string } }) {
    return <>{props.option.label}</>;
}
