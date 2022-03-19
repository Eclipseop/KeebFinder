import { Product } from "@prisma/client";

const Item = ({product}: { product: Product }) => {

  const abbreviate = (name: string) => {
    if (name.length < 50) return name;
  
    return name.substring(0, 40) + "...";
  };
  
  return (
    <div className="border rounded p-2 h-72 hover:ring ring-blue-100 flex flex-col">
      <img 
        className="h-40 w-40 ease-in-out duration-75 hover:absolute hover:h-96 hover:w-96" 
        alt="keyboard image"
        src={`${product.image.startsWith('http') ? '' : 'https://'}${product.image}`} 
      />
      <div className="flex-grow">
        <h1>{abbreviate(product.name)}</h1>
        <h2>From: {product.price}</h2>
      </div>
      <a href={product.url} target="_blank" className="bg-blue-500 hover:bg-blue-600 text-white w-full p-1 rounded mt-1 text-center" rel="noreferrer">Buy on <span className="font-semibold">{product.from}</span></a>
    </div>
  );
};

export default Item;