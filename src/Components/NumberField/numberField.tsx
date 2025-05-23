// eslint-disable-next-line import/no-extraneous-dependencies
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
// eslint-disable-next-line import/no-unresolved
import { NumberField } from '@base-ui-components/react/number-field';
import { JSX } from 'react';
import styles from './numberField.module.css';

function CursorGrowIcon() {
  return (
    <svg
      width="26"
      height="14"
      viewBox="0 0 24 14"
      fill="black"
      stroke="white"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.6"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 5H10" />
    </svg>
  );
}

interface NumberInputProps {
  defaultValue: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number | null) => void;
}

export default function NumberInput(
  { defaultValue, onChange }: NumberInputProps,
): JSX.Element {
  const id = React.useId();
  return (
    <NumberField.Root
      id={id}
      defaultValue={defaultValue}
      onValueChange={onChange}
      className={styles.Field}
      min={1}
      max={10}
    >
      <NumberField.ScrubArea className={styles.ScrubArea}>
        <label htmlFor={id} className={styles.Label}>
          Meal Multiplier:
        </label>
        <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
          <CursorGrowIcon />
        </NumberField.ScrubAreaCursor>
      </NumberField.ScrubArea>

      <NumberField.Group className={styles.Group}>
        <NumberField.Decrement className={styles.Decrement}>
          <MinusIcon />
        </NumberField.Decrement>
        <NumberField.Input className={styles.Input} />
        <NumberField.Increment className={styles.Increment}>
          <PlusIcon />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  );
}

// NumberInput.propTypes = {
//   defaultValue: PropTypes.number.isRequired,
//   onChange: PropTypes.func,
// };

// NumberInput.defaultProps = {
//   onChange: () => {},
// };
