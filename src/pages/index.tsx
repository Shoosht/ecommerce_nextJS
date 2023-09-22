import Navbar from '../../components/navbar/page';
import IndexPage from '../../components/index_page/page';
import Footer from '../../components/footer/page';
import {AuthContextProvider} from './context/auth-context';



export default function Home() {
  return (
    <>
      <div>
      <AuthContextProvider>
        <Navbar></Navbar>
        <IndexPage></IndexPage>
        <Footer></Footer>
      </AuthContextProvider>
      

      <style jsx global>{`
        * {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
          
        }`}</style>
    </div>
    </>
  )
}
