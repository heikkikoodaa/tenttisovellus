import Home from '../Home';
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

it('Home, snapshot test', () => {
  const component = renderer.create(<Home />);
  let tree = component.toJSON();
  console.log(tree);
  expect(tree).toMatchSnapshot();
});

test('Is hero image present in the Home component', () => {
  render(<Home />);
  const heroImage = screen.getByAltText('abstract human standing');
  expect(heroImage).toBeInTheDocument();
});

test('Is title present on the landing page', () => {
  render(<Home />);
  const heading = screen.getByText('Tervetuloa tenttisovellukseen! 🍜');
  expect(heading).toBeInTheDocument();
});
