import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsAction } from "../store/itemsSlice";
import { fetchStatusAction } from "../store/fetchStatus";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchStatus.fetchDone) return;
    const controllers = new AbortController();
    const signal = controllers.signal;
    dispatch(fetchStatusAction.markFetchingStarted());
    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(fetchStatusAction.markFetchingFinished());
        dispatch(itemsAction.addInitialItems(items));
        dispatch(fetchStatusAction.markFetchDone());
      });

    return () => {
      controllers.abort();
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;
