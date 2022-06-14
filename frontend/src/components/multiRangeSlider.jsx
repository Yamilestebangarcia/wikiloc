import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./multiRangeSlider.module.css";

const MultiRangeSlider = ({ min, max, setminMax }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    //aqui paso los valores a la prop que se le pasa onchange
    setminMax({ min: minVal, max: maxVal });
  }, [minVal, maxVal]);

  return (
    <div className={styles.multiRangeSlider}>
      <div className={styles.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(event) => {
            const value = Math.min(+event.target.value, maxVal - 1);
            setMinVal(value);
            event.target.value = value.toString();
          }}
          className={[
            styles.thumb,
            styles.thumb__zindex_3,
            styles.thumb__zindex_5,
          ].join(" ")}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(event) => {
            const value = Math.max(+event.target.value, minVal + 1);
            setMaxVal(value);
            event.target.value = value.toString();
          }}
          className={[styles.thumb, styles.thumb__zindex_4].join(" ")}
        />

        <div className={styles.slider}>
          <div className={styles.slider__track} />
          <div ref={range} className={styles.slider__range} />
          <div className={styles.slider__left_value}>{minVal}</div>
          <div className={styles.slider__right_value}>{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
