import React,{useEffect} from 'react'
import {useRouter} from 'next/router'


interface Props{
	to: string
}

const Redirect: React.FC<Props> = ({to="/"}) => {
	const router = useRouter() 
	useEffect(() => {
		router.push(to)	
	})	
	return null
}


export default Redirect