import { NextPage } from "next";


type Product = {
  title: string,
  cost: string,
  image: string
}

const Item = ({title, cost, image}: Product) => {

  const abbreviate = (title: string) => {
    if (title.length < 50) return title;

    return title.substring(0, 50) + "..."
  }

  return (
    <div className="border rounded p-2 h-64 hover:ring ring-blue-100">
      <img className="h-40 w-40" src={`https://${image}`} />
      <h1>{abbreviate(title)}</h1>
      <h2>{cost}</h2>
    </div>
  )
}

const Home: NextPage = () => {
  console.log(products);

  return (
    <div className="flex min-h-screen w-2/3 justify-center mx-auto">
      <div className="grid grid-cols-3 w-full gap-4 pt-4 h-full">
        {
          products.filter((p) => parseInt(p.cost.substring(1)) > 0).map((p) => <Item key={p.title} title={p.title} cost={p.cost} image={p.image} />)
        }
      </div>
    </div>
  )
}

export default Home;