import {Link, Navigate, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";

export default function PriceTablePage() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="relative flex h-[75vh] content-center items-center justify-center">
        <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/40 bg-cover bg-center" />
        <div className="-mt-16 max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="mx-auto w-full px-4 text-center lg:w-8/12">
              <h1 class="text-3xl font-bold tracking-tight leading-none text-white md:text-4xl lg:text-5xl dark:text-white">Lựa chọn kế hoạch cùng HomeUs</h1>
              <h1 class="mt-8 text-xl font-bold tracking-tight leading-none text-white md:text-2xl lg:text-3xl dark:text-white">Trải nghiệm các gói tin</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="relative -mt-32 px-8 flex flex-col max-w-6xl mx-auto mb-16">
        <div class="space-y-8 space-x-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-y-0 md:space-x-0">
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-4 text-xl text-center font-medium text-blue-600 dark:text-gray-400">Miễn phí</h5>
              <div class="flex items-baseline justify-center text-gray-900 dark:text-white">
                  <span class="text-5xl font-extrabold tracking-tight">0</span>
                  <span class="text-3xl font-semibold">đ</span>
                  <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400"></span>
              </div>
              <ul role="list" class="space-y-5 my-7">
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Xem thông tin nhà</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Thuê nhà</span>
                  </li>
                  <li class="flex space-x-3 line-through decoration-gray-500">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500">Đăng tin cho thuê</span>
                  </li>
                  <li class="flex space-x-3 line-through decoration-gray-500">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500">Tin nổi bật</span>
                  </li>
              </ul>
              <Link to={'/'}>
                <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Dùng ngay</button>
              </Link>
              <button type="button" class="mt-4 text-blue-600 border border-blue-600 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Hướng dẫn</button>
          </div>
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-4 text-xl text-center font-medium text-violet-700 dark:text-gray-400">Gói thường</h5>
              <div class="flex items-baseline justify-center text-gray-900 dark:text-white">
                  <span class="text-5xl font-extrabold tracking-tight">100</span>
                  <span class="text-3xl font-semibold">đ</span>
                  <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/tuần</span>
              </div>
              <ul role="list" class="space-y-5 my-7">
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-violet-700 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Xem thông tin nhà</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-violet-700 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Thuê nhà</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-violet-700 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Đăng tin cho thuê</span>
                  </li>
                  <li class="flex space-x-3 line-through decoration-gray-500">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500">Tin nổi bật</span>
                  </li>
              </ul>
              <Link to={user?'/account/places':'/login'}>
                <button type="button" class="text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Chọn ngay</button>
              </Link>
              <button type="button" class="mt-4 text-violet-600 border border-violet-600 hover:bg-violet-100 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Xem demo</button>
          </div>
          <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <h5 class="mb-4 text-xl text-center font-medium text-pink-600 dark:text-gray-400">Gói cao cấp</h5>
              <div class="flex items-baseline justify-center text-gray-900 dark:text-white">
                  <span class="text-5xl font-extrabold tracking-tight">300</span>
                  <span class="text-3xl font-semibold">đ</span>
                  <span class="ml-1 text-xl font-normal text-gray-500 dark:text-gray-400">/tuần</span>
              </div>
              <ul role="list" class="space-y-5 my-7">
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-pink-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Xem thông tin nhà</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-pink-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Thuê nhà</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-pink-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Đăng tin cho thuê</span>
                  </li>
                  <li class="flex space-x-3">
                      <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5 text-pink-600 dark:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Check icon</title><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                      <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">Tin nổi bật</span>
                  </li>
              </ul>
              <Link to={user?'/account/places':'/login'}>
                <button type="button" class="text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Chọn ngay</button>
              </Link>
              <button type="button" class="mt-4 text-pink-600 border border-pink-600 hover:bg-pink-100 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center">Xem demo</button>
          </div>
        </div>
      </div>
    </>
  );
}