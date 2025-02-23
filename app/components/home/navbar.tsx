'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FaImages, FaRightFromBracket } from 'react-icons/fa6'
import { jwtDecode } from 'jwt-decode'
import axios, { AxiosError } from 'axios'

const Navbar = () => {
  const router = useRouter()
  const [userProfile, setUserProfile] = useState<UserType>({} as UserType)
  const logOutModalRef = useRef<HTMLDialogElement>(null)

  const decodeToken = async (token: string) => {
    const decoded: TokenType = await jwtDecode(token)

    try {
      const response = await axios.get<ResponseTypes<any>>(
        `${process.env.NEXT_PUBLIC_API}/auth/user/${decoded.id}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      )
      setUserProfile(response.data.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data?.message)
      }
      console.error(error)
    }
  }

  const logOut = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/login')
  }

  useEffect(() => {
    const cookies = document.cookie.split('; ')
    const tokenCookie = cookies.find(row => row.startsWith('token='))
    if (tokenCookie) {
      decodeToken(tokenCookie.split('=')[1])
    }
  }, [])

  return (
    <div className='navbar bg-base-200 h-20 px-4 rounded-xl shadow-lg'>
      <div className='flex-1'>
        <Link href='/' className='btn btn-ghost text-3xl'>
          <FaImages size={48} /> SMTrack Media Server
        </Link>
      </div>
      <div className='flex-none gap-2'>
        <div className='text-lg font-bold'>
          <div>{userProfile.display ?? '-'}</div>
        </div>
        <div className='dropdown dropdown-end'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost btn-circle avatar'
          >
            <div className='w-12 rounded-full'>
              <img src={userProfile.pic} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            <li>
              <a onClick={() => logOutModalRef.current?.showModal()}>
                <FaRightFromBracket /> Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      <dialog ref={logOutModalRef} className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>LogOut!</h3>
          <p className='py-4'>Do you want to logout?</p>
          <div className='flex items-center gap-2 justify-end'>
            <button
              onClick={() => logOutModalRef.current?.close()}
              className='btn btn-ghost'
            >
              Cancel
            </button>
            <button onClick={logOut} className='btn btn-ghost bg-red-500'>
              Log out
            </button>
          </div>
        </div>
        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}

export default Navbar
