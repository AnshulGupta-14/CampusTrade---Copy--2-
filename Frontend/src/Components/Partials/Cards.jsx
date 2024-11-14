import React from "react";
import Card from "./Card";
import { useMediaQuery } from "react-responsive";

const Cards = React.memo(({ data, close, onUpdate }) => {
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  return (
    <>
      {isDesktop && (
        <div className="w-full flex flex-wrap items-center gap-5 pt-10 px-6">
          {data.map((item) => (
            <Card
              key={item._id}
              data={item}
              close={close}
              onUpdate={onUpdate}
            ></Card>
          ))}
        </div>
      )}

      {!isDesktop && (
        <div className="w-full flex flex-wrap items-center gap-5 pt-10 px-[2.5%]">
          {data.map((item) => (
            <Card
              key={item._id}
              data={item}
              close={close}
              onUpdate={onUpdate}
            ></Card>
          ))}
        </div>
      )}
    </>
  );
});

export default Cards;
