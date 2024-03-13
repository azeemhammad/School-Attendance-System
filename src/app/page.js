"use client";
import React, { useEffect } from 'react'
import LoginPage from './screens/login/page'
import { useRouter } from 'next/navigation';

const Home = () => {
  const navigate = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData)
      navigate.replace("/dashboard")
  }, [])

  return (
    <div>
      <LoginPage />
    </div>
  )
}

export default Home