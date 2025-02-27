'use client'

import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Marquee from 'react-fast-marquee'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { ShoppingCart } from '@mui/icons-material'
import { Avatar } from '@mui/material'
const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://i.pinimg.com/736x/0e/33/5c/0e335cb0a65bd4a3bc45f86b03a54568.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Customized Lehengas',
          href: '#',
          imageSrc: 'https://i.pinimg.com/736x/05/e9/06/05e906ef0de6fda44d3e347bb330ae5e.jpg',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Kurti Sets', href: '/product?category=kurti' },
            { name: 'Sarees', href: '/product?category=saree' },
            { name: 'Handwork Blouses', href: '#' },
            { name: 'Co-Ord sets', href: '#' },
            { name: 'Lehenga sets', href: '#' },
            { name: 'Bottoms', href: '#' },
            { name: 'Gowns', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://i.pinimg.com/236x/fd/1c/4f/fd1c4fa5b789bdcf930494e47e17b79a.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Kurtas',
          href: '#',
          imageSrc: 'https://i.pinimg.com/236x/66/a8/60/66a860ed53f50452ea3baaf96866703c.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Kurtas', href: '#' },
            { name: 'Shirts', href: '#' },
            { name: 'Sherwanis', href: '#' },
            { name: 'T-Shirts', href: '#' },
            { name: 'Bottoms', href: '#' },
            { name: 'Activewear', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [

  ],
}


export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);


  return (
    <div className="bg-white ">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear "
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out "
          >
            <div className="flex  z-40 px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2 z-40">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8 z-40">
                    <div className="grid grid-cols-2 gap-x-4 z-40">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full h-auto object-cover object-top rounded-lg bg-gray-100  group-hover:opacity-90"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                          </a>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900 ">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link href={item.href} className="-m-2 block p-2 text-gray-500 hover:text-gray-700">
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>
            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a href="#">
                  <Avatar alt="Anu" src="/path-to-avatar.jpg" className="w-8 h-8 cursor-pointer bg-pink-400" />
                </a>
              </div>
            </div>


          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white ">
        <div className="flex h-7 top-0 left-0 w-full items-center justify-center bg-[#e21273e1] px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          <Marquee pauseOnHover="True" >
            <span>Free Shipping over worldwide</span>
          </Marquee>
        </div>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://rajasreesingamshetty5geetha.github.io/Assests-web/logo.jpg"
                    className="h-12 w-auto"
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch lg:z-40">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center hover:text-pink-500 pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:underline-offset-8 hover:underline focus:outline-none">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition "
                      >

                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover object-top group-hover:opacity-90 "
                                    />
                                    <Link href={item.href} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </Link>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-gray-800">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <a href="#">
                    <Avatar alt="Anu" src="/path-to-avatar.jpg" className="w-8 h-8 cursor-pointer bg-pink-400" />
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                </div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button className='relative' onClick={() => window.open('/cart', '_blank')} >
                    {cart.length > 0 && (
                      <div className=" absolute -mt-2 ml-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cart.length}
                      </div>
                    )}
                    <ShoppingCart className="h-5 w-5 text-gray-600 mt-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}


