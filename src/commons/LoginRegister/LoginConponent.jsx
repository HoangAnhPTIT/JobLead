import React from 'react'
import FormLogin from './formLogin'
import Image from 'next/image'
export default function LoginConponent() {
  return (
    <div>
      <section className="h-screen flex justify-center items-center">
        <div className="container px-6 py-12 h-full ">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="">
              <Image
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                alt="Phone image"
                width={500}
                height={500}
              />
            </div>
            <div className="">
              <FormLogin />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
