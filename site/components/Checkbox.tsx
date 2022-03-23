
type Props = {
    array: string[],
    value: string,
    click: () => void;
}

const Checkbox = ({array, value, click}: Props) => {
  return (
    <div className="space-x-1">
      <input className="space-x-3" type="checkbox" checked={array.includes(value)} onChange={click} />
      <label>{value}</label>
    </div>
  );
};

export default Checkbox;