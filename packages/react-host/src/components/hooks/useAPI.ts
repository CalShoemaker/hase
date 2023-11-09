import { useState, useEffect } from "react";

const useAPI = (url: string) => {
  const [dogs, setDogs] = useState([]);
  //const data = useSelector(selectDogs);

  useEffect(() => {
    fetch("http://localhost:3000/" + url)
      .then((res) => res.json())
      .then((dogs) => setDogs(dogs))
      .catch(console.log);
  }, [url]);

  return [dogs];
};

export default useAPI;
