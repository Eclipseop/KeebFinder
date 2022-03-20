const Header = () => {
  return (
    <header className="pb-2">
      <h1 className="font-semibold text-xl tracking-widest text-center">Keeb Finder</h1>
      <div className="flex flex-row w-full justify-around">
        <a href='keycaps'>Keycaps</a>
        <a href='switches'>Switches</a>
      </div>
    </header>
  );
};

export default Header;