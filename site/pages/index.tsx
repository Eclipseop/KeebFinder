import { NextPage } from "next";

const Button = ({text, link}: {text: string, link: string}) => {
  return (
    <a href={link} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded">{text}</a>
  );
};

const Home: NextPage = () => {
  return (
    <div className="min-h-screen bg-gray-200 flex flex-col justify-center items-center">
      <div className="space-y-9 text-center">
        <h1 className="text-3xl">Keeb Finder</h1>
        <div className="space-x-2">
          <Button text="Shop Keycaps" link="keycaps" />
          <Button text="Shop Switches" link="switches" />
        </div>
      </div>
    </div>
  );
};

export default Home;