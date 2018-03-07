import Layout from './Layout'
import Navbar from './Navbar'
import Main from './Main'

export default ({ username, online, children }) => (
  <Layout>
    <Navbar username={username} online={online} />
    <Main>
      { children }
    </Main>
  </Layout>
)
