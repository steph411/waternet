import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'






const useProtectedRedirect = (to: string) => {
  const [session, loading] = useSession();
  if (typeof window !== 'undefined') {
    
    const router = useRouter();
    if (!session && !loading) {
      console.log({ notsession: session });
      router.push(`${to}`)
    }
  }
}


export default useProtectedRedirect