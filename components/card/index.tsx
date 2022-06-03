import { Icons } from "components/icons";
import Link from "next/link";

interface Props {
  title: any;
  icon: any;
  link: string;
}
const Card = ({ title, icon, link }: Props) => {
  return (
    <div className="col-span-4 space-y-5">
      <h1 className="text-xl font-bold text-orangeDTTV">{title}</h1>
      <div className="m-auto rounded-full bg-greenDTTV w-36 dark:bg-orangeDTTV">
        {icon}
      </div>
      <p className="mx-0 text-lg font-light smph:mx-2">{title}</p>
      <div className="justify-center">
        <button className="inline-flex px-3 py-2 font-medium text-white transition-all bg-orangeDTTV hover:bg-orange-600 rounded-2xl focus:outline-none focus:ring-2 ring-orange-500">
          <Icons
            icons="plus"
            className="text-white fill-current w-5 h-5 mr-1 mt-0.5"
          />
          <Link href={link}>
            <span className="focus:outline-none text-[1rem] font-light">
              En savoir plus
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
};
export default Card;
