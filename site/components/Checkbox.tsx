
type Props = {
    array: string[],
    value: string,
    click: () => void;
}

const Checkbox = ({array, value, click}: Props) => {
  return (
    <div className="space-x-1" onClick={click}>
      <input className="space-x-3" type="checkbox" checked={array.includes(value)} />
      <label>{value}</label>
    </div>
  );
};

export default Checkbox;