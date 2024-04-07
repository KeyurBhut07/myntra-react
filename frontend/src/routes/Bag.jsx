import React from "react";
import BagSummery from "../components/BagSummery";
import BagItem from "../components/BagItem";
import { useSelector } from "react-redux";

const Bag = () => {
  const bagItems = useSelector((store) => store.bag);
  const items = useSelector((store) => store.items);
  const bagItem = items.filter((item) => {
    const foundItem = bagItems.indexOf(item.id);
    return foundItem >= 0;
  });
  return (
    <>
      <main>
        <div className="bag-page">
          <div className="bag-items-container">
            {bagItem.map((item) => (
              <BagItem key={item.id} item={item} />
            ))}
          </div>
          <BagSummery />
        </div>
      </main>
    </>
  );
};

export default Bag;
