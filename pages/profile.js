import Session from '../components/Session'
import Page from '../components/Page'

const Index = ({ user }) => (
  <Page username={user ? user.userPrincipalName : null}>
    <div>
      <div className='userPhoto'>
        <img src='/static/placeholder.png' />
      </div>
      <div className='userInfo'>
        <div>
          Navn: {user && user.displayName}
        </div>
        <div>
          Brukernavn: {user && user.userPrincipalName}
        </div>
        <div>
          E-post: {user && user.mail}
        </div>
        <div>
          Telefon: {user && user.mobilePhone}
        </div>
        <div>
          Avdeling: {user && user.officeLocation}
        </div>
        <div>
          Jobb tittel: {user && user.jobTitle}
        </div>
      </div>
    </div>
    <style jsx>
      {`
        .userPhoto {
          float: left;
          margin-right: 5px;
        }
        .userInfo {
          text-align: left;
        }
      `}
    </style>
  </Page>
)

export default Session(Index)
