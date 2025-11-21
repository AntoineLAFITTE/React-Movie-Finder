import { useState } from "react";



type ChildProps = {
  value: string;
};

function Child({ value }: ChildProps) {

  console.log("Rendu de Child");

  return <p>Valeur : {value}</p>;

}



export default function Parent() {

  const [count, setCount] = useState(0);

  return (

    <div>

      <button onClick={() => setCount(count + 1)}>Incrémenter</button>

      <Child value="Statique" />

    </div>

  );

}
