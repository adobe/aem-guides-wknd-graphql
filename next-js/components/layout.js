/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 */

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from "next/router";
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export const siteTitle = 'WKND';

const navigation = [
  { name: 'Adventures', href: '/' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Layout({ children }) {
  const router = useRouter();
  const isCurrentPage = (path) => {
    return path === '/' ? router.pathname === '/' : router.pathname.indexOf(path) === 0
  };
  return (
    <div className="min-h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="AEM WKND built in Next.js"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_URL}/wknd-logo-dk.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="cq:pagemodel_router" content="disabled" />
      </Head>

      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-700 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <a href='/'>
                      <img
                        className="block lg:hidden h-8 w-auto"
                        src={process.env.NEXT_PUBLIC_URL + "/wknd-logo-dk.svg"}
                        alt="WKND"
                      />
                      <img
                        className="hidden lg:block h-8 w-auto"
                        src={process.env.NEXT_PUBLIC_URL + "/wknd-logo-dk.svg"}
                        alt="WKND"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                        >
                          <a
                            aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                            className={classNames(
                              isCurrentPage(item.href) ? 'bg-yellow-300 text-gray-700' : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      isCurrentPage(item.href) ? 'bg-yellow-300 text-gray-700' : 'text-gray-800 hover:bg-yellow-200 hover:text-gray-700',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={isCurrentPage(item.href) ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <main>{children}</main>
      <footer className="bg-gray-200 text-center lg:text-left">
        <div className="text-gray-700 text-center p-4">
          &copy;2022, <a className="text-gray-800" href="https://wknd.site/">WKND Site.</a>
        </div>
      </footer>
    </div>
  );
}
