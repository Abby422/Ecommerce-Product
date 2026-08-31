import { GrInstagram, GrFacebook } from 'react-icons/gr';
import { FiTwitter } from 'react-icons/fi';
import './Footer.css';

// <li> elements need a list parent — the original put them straight in a div.
const COLUMNS = [
  { title: 'About Us', items: ['Story', 'Clients', 'Testimonials'] },
  { title: 'Services', items: ['Marketing', 'Development', 'Sales'] },
];

const SOCIALS = [
  { label: 'Facebook', Icon: GrFacebook },
  { label: 'Instagram', Icon: GrInstagram },
  { label: 'Twitter', Icon: FiTwitter },
];

function Footer() {
  return (
    <footer className="Footer-container">
      <div className="footer">
        {COLUMNS.map((column) => (
          <div className="footer-wrapper" key={column.title}>
            <h5>{column.title}</h5>
            <ul>
              {column.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-wrapper">
          <h5>Socials</h5>
          <ul>
            {SOCIALS.map(({ label, Icon }) => (
              <li key={label}>
                <Icon /> {label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="footer-legal">
        SPACEJOY — a portfolio project. © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
