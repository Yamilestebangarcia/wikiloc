function Select({ changeLimit, classNameC }) {
  return (
    <>
      <select onChange={changeLimit} className={classNameC}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
      </select>
      ;
    </>
  );
}
export default Select;
