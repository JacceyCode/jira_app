import { ReactNode } from "react";

type Props = {
  name: string;
  buttonComponent?: ReactNode;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <section className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold capitalize dark:text-white`}
      >
        {name}
      </h1>
      {buttonComponent}
    </section>
  );
};

export default Header;
