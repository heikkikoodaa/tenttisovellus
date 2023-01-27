const VaihtoehtoKentta = ({
  index,
  muutaVaihtoehtoKenttaa,
  vastaus,
  onkoOikea,
  id,
  poistaVaihtoehto,
}) => {
  return (
    <div className="lisaa-kysymys-kentat">
      <p>{`Vaihtoehto ${index + 1}`}</p>
      <input
        className="lisaa-kysymys kentta"
        type="text"
        placeholder="vaihtoehto"
        name="teksti"
        value={vastaus}
        onChange={(e) => muutaVaihtoehtoKenttaa(e, id)}
      />
      <input
        className="lisaa-kysymys checkbox"
        type="checkbox"
        name="oikein"
        checked={onkoOikea}
        onChange={(e) => muutaVaihtoehtoKenttaa(e, id)}
      />
      <p>Oikea vastaus?</p>
      <span
        className="poistonappi"
        name="poista"
        onClick={(e) => poistaVaihtoehto(e, id)}
      >
        Poista vaihtoehto
      </span>
    </div>
  );
};

export default VaihtoehtoKentta;
