import styles from "./PanelControlSearch.module.css";
import MultiRangeSlider from "./multiRangeSlider";
function PanelControlSearch({
  dataControl,
  setDataDifficulty,
  setminMaxDis,
  setminMaxSlop,
}) {
  return (
    <>
      {dataControl.distMax ? (
        <div className={styles.filter}>
          <p>Distancia</p>

          <MultiRangeSlider
            min={Math.round(dataControl.distMin)}
            max={Math.round(dataControl.distMax)}
            setminMax={setminMaxDis}
          />

          <p>Desnivel</p>

          <MultiRangeSlider
            min={dataControl.slopemin}
            max={dataControl.slopeMax}
            setminMax={setminMaxSlop}
          />

          <p>Dificultadad</p>

          <select
            className={styles.select}
            onChange={(e) => {
              setDataDifficulty(e.target.value);
            }}
          >
            <option value="todos"> Todos </option>
            {dataControl.difficulty.map((ele) => (
              <option key={ele} value={ele}>
                {ele}
              </option>
            ))}
          </select>
        </div>
      ) : null}
    </>
  );
}

export default PanelControlSearch;
