import ClickAwayListener from "react-click-away-listener";
import { useState } from "react";
import styles from "./model-select.module.css";

export default function ModelSelect({
  placeholder = "",
  label,
  isMulti = false,
  options,
  value,
  onChange,
  onInputChange,
  isDisabled = false,
  noOptionsMessage = "No options",
  style,
}) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOverlayOpen(false);
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOverlayOpen(!overlayOpen);
        }}
        className={`${styles.new__model__select__container} ${styles.new__model__select__container__special}`}
      >
        {isMulti ? (
          <>
            <div>{placeholder}:</div>
            <div>{value ? value.length : 0} item selected</div>
          </>
        ) : (
          <>
            {!value && <div>{placeholder}</div>}
            {value && <div>{value.label}</div>}
          </>
        )}
        {/* <span>V</span> */}
        <svg
          class="svg-icon"
          style={{
            width: "1.5em",
            height: "1.5em",
            verticalAlign: "middle",
            fill: "black",
            overflow: "hidden",
          }}
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M512.726547 675.318646c-8.063653 0-15.790638-3.245927-21.435195-9.006118L231.175103 400.906809c-11.603269-11.837606-11.410887-30.840402 0.427742-42.442648 11.837606-11.601222 30.841426-11.410887 42.442648 0.427742l238.681054 243.534596L751.407602 358.891903c11.601222-11.839653 30.602995-12.033058 42.442648-0.427742 11.839653 11.603269 12.031011 30.605042 0.427742 42.442648L534.161742 666.312528C528.517185 672.072719 520.791224 675.318646 512.726547 675.318646z" />
        </svg>
        {overlayOpen && (
          <div className={styles.new__model__select__container__special__panel}>
            {options
              .filter((x) => x.value != null)
              .map((item, index) => {
                let selected = null;
                // if (!isMulti) {
                //   selected = item.value == value?.value;
                // } else {
                //   if (value) {
                //     selected = value.find((x) => x.value == item.value);
                //   }
                // }
                if (value) {
                  selected = value.find((x) => x.value == item.value);
                }
                return (
                  <div
                    className={styles.new__model__select__container__special__panel__entry}
                    style={{
                      backgroundColor: selected ? "#008738" : null,
                      borderRadius: selected ? "5px" : null,
                      color: selected ? "white" : null,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      //   if (!isMulti) {
                      //     onChange(!selected ? { label: item.label, value: item.value } : null);
                      //     setOverlayOpen(false);
                      //   } else {
                      //     if (!selected) {
                      //       value.push({ label: item.label, value: item.value });
                      //       onChange(value);
                      //     } else {
                      //       let newValue = value.filter((x) => x.value != selected.value);
                      //       onChange(newValue);
                      //     }
                      //   }
                      if (!selected) {
                        value.push({ label: item.label, value: item.value });
                        onChange(value);
                      } else {
                        let newValue = value.filter((x) => x.value != selected.value);
                        onChange(newValue);
                      }
                    }}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
        )}
      </button>
    </ClickAwayListener>
  );
}
