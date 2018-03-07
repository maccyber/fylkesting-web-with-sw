import DropDownMenu from './DropDownMenu'
import { COMPANY, COLORS, APP } from '../config'

export default ({ username = false, online }) => (
  <nav>
    <ul className='left'>
      <li>
        <a href='/'>
          <img style={{ width: '36px' }} alt={COMPANY.name} src={COMPANY.logo} />
        </a>
      </li>
      <li>
        <a href='/'>
          <span className='app-name'>{APP.name}</span>
        </a>
      </li>
    </ul>
    { username
      ? <ul className='right'>
        <li><a href='/'>Forsiden</a></li>
        <li><a href='/forslag'>Forslag</a></li>
        <li><a href='/live'>Live</a></li>
        <li>
          <DropDownMenu name={username}>
            <div className='menu'><a href='/import'>Import</a></div>
            <div className='menu'><a href='/profile'>Profil</a></div>
            <div className='menu'><a href='/api/logout'>Logg ut</a></div>
          </DropDownMenu>
        </li>
      </ul>
      : <ul className='right'>
        <li><a href='/'>Forsiden</a></li>
        <li><a href='/forslag'>Forslag</a></li>
        <li><a href='/live'>Live</a></li>
        <li><a href='/api/login'>Logg inn</a></li>
        <li className='connectivity'>OFFLINE</li>
      </ul>
    }
    <style jsx>{`
      img {
        width: 36px;
      }
      a {
        text-transform: uppercase;
      }
      .connectivity {
        display: ${online ? 'none' : 'block'};
        background-color:#E36049;
        color:#fff;
        padding:2px 4px;
        border-radius: 2px;
      }
      .menu {
        border-bottom: 1px solid #d6d6d6;
        line-height: 50px;
      }
      .menu:hover, .menu:hover a {
        background: ${COLORS.secondary};
        color: ${COLORS.secondaryOpposite};
      }
      nav {
        grid-area: header;
        display: flex;
        justify-content: space-between;
        background: ${COLORS.primary};
        margin-bottom: 20px;
        height: 60px;
        -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        display: flex;
        align-items: center;
      }
      ul.left {
        justify-content: flex-start;
      }
      ul.right {
        justify-content: flex-end;
      }
      li {
        font-size: large;
        margin: 10px;
        align-self: center;
      }
      @media screen and (max-width: 800px) {
        .app-name {
          display: none;
        }
    `}
    </style>
  </nav>
)
