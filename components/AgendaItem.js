import AgendaItemListForslag from './AgendaItemListForslag'
import { COLORS, OPENGOV_URL, OPENGOV_PATH, MAIL } from '../config'
import Button from './Button'

export default ({ meeting, item, adminView, toggleForslag, setNowPlaying, toggleShowForslag, deleteForslag, hideButtons = false, large = false }) => (
  <div className='wrapper'>
    <h2>{item.agendanumber} - {item.title}</h2>
    <div className='item'>
      { !hideButtons &&
        <a href={`${OPENGOV_URL}${OPENGOV_PATH}/AgendaItems/Details/${item.id}`} target='_blank'>
          <div className='button'>
            Se dokumenter
          </div>
        </a>
      }
      { !adminView && !hideButtons &&
        <a href={`mailto:${MAIL}?subject=Forslag sak ${item.agendanumber}`} target='_blank' className='button'>
          Lever forslag
        </a>
      }
      { !adminView && !hideButtons && meeting.now === item.id &&
        <Button
          backgroundColor={COLORS.primary}
          color={COLORS.primaryOpposite}
          value='Behandles nå'
        />
      }
      { adminView && !hideButtons &&
        <Button
          dataAgendaItem={item.id}
          onClick={toggleForslag}
          value='Registrer forslag'
        />
      }
      { adminView && !hideButtons &&
        <Button
          backgroundColor={meeting.now === item.id ? COLORS.primary : null}
          dataAgendaItem={item.id}
          dataAgendaNow={meeting.now}
          onClick={setNowPlaying}
          color={meeting.now === item.id ? COLORS.primaryOpposite : null}
          value={meeting.now === item.id ? 'Behandles nå' : 'Sett til behandling'}
        />
      }
    </div>
    <AgendaItemListForslag
      meeting={meeting}
      item={item}
      adminView={adminView}
      toggleShowForslag={toggleShowForslag}
      deleteForslag={deleteForslag}
      toggleForslag={toggleForslag}
      large={large} />
    <style jsx>
      {`
        h2 {
          font-size: ${large ? '40px' : 'x-large'};
        }
        a {
          padding: 0px;
          margin: 0px;
          font-size: 12px;
        }
        .item {
          display: flex;
        }
        .wrapper {
          text-align: left;
          padding: ${large ? '40px' : '10px'};
          border-radius: 0;
          background-color: #FFF;
          box-shadow: 0 2px 2px 0 rgba(0,0,0,.16), 0 0 2px 0 rgba(0,0,0,.12);
          margin-top: 10px;
        }

        .button {
          background-color: white;
          color: #353535;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          padding: 10 px;
          font-size: 14px;
          width: 175px;
          height: 40px;
          line-height: 40px
          margin: 10px;
          cursor: pointer;
          text-transform: uppercase;
          border-radius: 2px;
          transition: all 0.3s ease 0s;
        }

        .button:hover {
          background-color: ${COLORS.primary};
          color: ${COLORS.secondary};
        }

        @media screen and (max-width: 800px) {
          .item {
            display: grid;
          }
        }
      `}
    </style>
  </div>
)
