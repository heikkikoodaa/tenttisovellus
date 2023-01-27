const Home = () => {
  return (
    <div className="home-container">
      <img
        className="home-picture"
        src="/images/home.png"
        alt="abstract human standing"
      />
      <div className="home-introduction">
        <h1>Tervetuloa tenttisovellukseen! 🍜</h1>
        <p>
          Tenttisovelluksen avulla sinusta tulee entistäkin fiksumpi ihminen.
          Sovelluksen käytön jälkeen jäät miettimään, miten oletkaan aiemmin
          pärjännyt ilman.
        </p>
      </div>
    </div>
  );
};

export default Home;
