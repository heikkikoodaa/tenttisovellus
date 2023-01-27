import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div id="error-page">
      <h1>404 - Hakemaasi sivua ei löydy</h1>
      <h2>Hups! 🤦‍♂️</h2>
      <p>
        Jotain meni nyt pieleen! Hätä ei ole tämän näköinen, sillä olemme
        lähettäneet koulutetut apinat korjaamaan ongelmaa
      </p>
      <Link
        style={{
          color: 'white',
          fontWeight: 'bold',
          textDecoration: 'underline',
        }}
        to="/"
      >
        Palaa takaisin etusivulle
      </Link>
    </div>
  );
};

export default ErrorPage;
