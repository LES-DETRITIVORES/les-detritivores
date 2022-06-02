interface Props {
  number: number;
  text: any;
}
const Content = ({ number, text }: Props) => (
  <div className="flex space-x-2">
    <span className="h-10 text-3xl border-b-4 text-orangeDTTV border-orangeDTTV -rotate-3">
      {number}
    </span>
    <p className="text-xl font-light">{text}</p>
  </div>
);
export default Content;
