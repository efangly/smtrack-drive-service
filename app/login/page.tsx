'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { RiAtLine, RiKey2Line } from 'react-icons/ri'
import axios, { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'

export default function Login () {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState({
    status: false,
    tag: '',
    message: ''
  })
  const [loginForm, setLoginForm] = useState({
    userName: '',
    userPassword: ''
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsError({
      status: false,
      tag: '',
      message: ''
    })
    setIsLoading(true)

    if (loginForm.userName !== '' && loginForm.userPassword !== '') {
      try {
        const response = await axios.post<ResponseTypes<LogInType>>(
          `${process.env.NEXT_PUBLIC_API}/auth/login`,
          {
            username: loginForm.userName,
            password: loginForm.userPassword
          }
        )
        if (response.data.data.token) {
          const decoded: TokenType = await jwtDecode(response.data.data.token)
          if (decoded.role === 'SUPER') {
            document.cookie = `token=${response.data.data.token}; path=/`
            router.push('/')
          } else {
            setIsLoading(false)
            setIsError({
              status: true,
              tag: 'error',
              message: `Access denied!`
            })
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          setIsError({
            status: true,
            tag: 'error',
            message: error.response?.data?.message
          })
        }
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsError({
        status: true,
        tag: 'warning',
        message: 'Please complete this field!'
      })
      setIsLoading(false)
    }
  }

  return (
    <div className='min-h-dvh flex flex-col items-center justify-center gap-7'>
      <div className='card bg-base-100 w-[370px] sm:w-[500px] md:w-[500px] lg:w-[600px] h-max shadow-xl'>
        <div className='card-body px-5 sm:px-7 lg:px-10'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            {isError.status && (
              <div role='alert' className={`alert alert-${isError.tag}`}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6 shrink-0 stroke-current'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
                <span>{isError.message}</span>
              </div>
            )}
            <span className='text-center text-[32px] font-bold'>Log in</span>
            <label className='input input-bordered flex items-center gap-2'>
              <RiAtLine
                fill='currentColor'
                width={16}
                hanging={16}
                opacity={0.7}
              />
              <input
                type='text'
                className='grow'
                placeholder={'Username'}
                autoComplete='username'
                value={loginForm.userName}
                onChange={e =>
                  setLoginForm({ ...loginForm, userName: e.target.value })
                }
                autoFocus
              />
            </label>
            <label className='input input-bordered flex items-center gap-2'>
              <RiKey2Line
                fill='currentColor'
                width={16}
                hanging={16}
                opacity={0.7}
              />
              <input
                type='password'
                className='grow'
                placeholder={'Password'}
                autoComplete='current-password'
                value={loginForm.userPassword}
                onChange={e =>
                  setLoginForm({ ...loginForm, userPassword: e.target.value })
                }
              />
            </label>
            <div className='card-actions'>
              <button
                type='submit'
                className='btn btn-primary w-full text-[16px]'
              >
                {isLoading ? (
                  <span className='loading loading-ring loading-md'></span>
                ) : (
                  'Log in'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
