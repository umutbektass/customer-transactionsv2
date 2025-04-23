import { getServerSession } from 'next-auth';
import LoginContainer from '../components/home/login-container'
import { authOptions } from '../lib/auth';
import { redirect } from 'next/navigation';
export default async function Home() {
  const session = await getServerSession(authOptions)
  if(!session?.user){
    return (
      <main>
        <LoginContainer/>
      </main>
       );
  }
  else {
    redirect('/verify-login-2fa')
  }
 

}
