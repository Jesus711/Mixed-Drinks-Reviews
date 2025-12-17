'use client'
import CardSkeleton from '@/components/CardSkeleton';
import DrinkCard from '@/components/DrinkCard';
import Loading from '@/components/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { Drink } from '@/types'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react'

const LIMIT = 20; // Amount to retrieve each fetch
const SKELETON_CARDS = 20;

const BrowsePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Browse />
    </Suspense>
  )
}


const Browse = () => {
  const [drinkList, setDrinkList] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<string[]>([])

  // Pages
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageList, setPageList] = useState<(number | string)[]>([])


  const router = useRouter();
  const params = useSearchParams();
  const searchParam = typeof params.get("search") === "string" ? params.get("search")! : "";


  const handlePageNav = (index: number) => {
    if (index < 1 || index > totalPages) {
      return;
    }
    setPage(index)
    getPagination(index, totalPages)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const getPagination = (currentPage: number, totalPages: number) => {
    const pagination: (number | string)[] = [];

    // Always show first and last page
    const firstPage = 1;
    const lastPage = totalPages;

    // Calculate middle range (5 pages centered around current)
    let startPage = Math.max(currentPage - 2, firstPage + 1);
    let endPage = Math.min(currentPage + 2, lastPage - 1);

    // Adjust if near the start or end
    if (startPage <= firstPage + 1) {
      startPage = firstPage + 1;
      endPage = Math.min(firstPage + 5, lastPage - 1);
    }

    if (endPage >= lastPage - 1) {
      endPage = lastPage - 1;
      startPage = Math.max(lastPage - 5, firstPage + 1);
    }

    // Always include first page
    pagination.push(firstPage);

    // Ellipsis after first page if needed
    if (startPage > firstPage + 1) {
      pagination.push('...');
    }

    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    // Ellipsis before last page if needed
    if (endPage < lastPage - 1) {
      pagination.push('...');
    }

    // Always include last page
    pagination.push(lastPage);

    setPageList(pagination);
  }

  // Get total number of pages
  useEffect(() => {
    const fetchTotalPages = async () => {
      const { count, error } = await supabase
        .from('drinks')
        .select('*, drink_ingredients(*)', { count: 'exact', head: true }).ilike("name", `%${searchParam}%`);

      if (error) {
        console.error('Error fetching count:', error.message);
        return;
      }
      const pages = Math.ceil((count ?? 0) / LIMIT);
      setTotalPages(pages);
      getPagination(page, pages)
    };

    fetchTotalPages();
  }, [searchParam]);


  useEffect(() => {

    const getDrinks = async () => {
      setLoading(true)
      const start = (page - 1) * LIMIT
      const end = start + LIMIT - 1
      const { data, error } = await supabase.from("drinks").select("*, drink_ingredients(*)").ilike("name", `%${searchParam}%`).range(start, end);

      if (error) {
        console.log("Error:", error.message);
      }
      else {
        setDrinkList(data);
      }
      setLoading(false);
    }

    getDrinks();
  }, [page, searchParam])

  const handleNavigation = () => {
    router.push(`/browse?search=${search}`)
    setPage(1)
    setSearch("")
  }


  return (
      <div className='flex flex-col justify-center items-center md:gap-y-7 gap-y-5'>

        {/* Search Bar */}
        <div className='flex md:flex-row flex-col justify-center items-center md:gap-x-3 md:gap-y-0 gap-y-3'>
          <Label htmlFor='search' className='text-3xl text-blue-300'>Search:</Label>
          <Input type='text' name='search' id='search' value={search} onChange={(e) => setSearch(e.target.value)} className='bg-gray-900 text-blue-300 placeholder:text-gray-400 placeholder:text-xl md:text-xl xs:w-sm w-[300px] h-12' placeholder='Ex: Mojito' />
          <Button className='bg-blue-400 text-black text-xl hover:cursor-pointer' type='button' variant={'default'} onClick={handleNavigation}>Search</Button>
        </div>

        {!loading && searchParam !== "" ? drinkList.length === 0 ? (
          <h1 className='md:text-left text-center md:text-3xl text-xl text-blue-300 font-bold'>No Drinks Found!</h1>
        ) : (<h1 className='md:text-left text-center md:text-3xl text-xl text-blue-300 font-bold'>'{searchParam}' Drink Results:</h1>) : <></>}

        {/* Drink List */}
        <div className='flex-1 flex flex-wrap justify-center items-center gap-8'>
          {loading ?
            Array(SKELETON_CARDS).fill(0).map((_, index) => (
              <CardSkeleton key={index} />
            ))
            : drinkList.map((drink, index) => (
              <DrinkCard {...drink} key={index} />
            ))}
        </div>

        
        {!loading && totalPages > 1 && (
          <div className='flex flex-col justify-center items-center'>
            <h2 className='text-blue-300 md:text-2xl text-xl font-bold'>Pages:</h2> 
            <ul className='flex justify-center items-center gap-x-5'>
              <li onClick={() => handlePageNav(page - 1)} className={`md:block hidden md:text-2xl text-sm font-semibold hover:cursor-pointer text-secondary`}>{'<'}Prev Page</li>
              {pageList.map((p, index) => {

                if (typeof p !== 'number')
                  return <li key={index} className={`md:text-2xl text-lg font-semibold hover:cursor-pointer text-secondary`}>{p}</li>

                return (
                  <li onClick={() => handlePageNav(p)} key={index} className={`underline md:text-2xl text-lg font-semibold hover:cursor-pointer ${page === p ? 'text-primary' : 'text-secondary'}`}>{p}</li>
                )
              })}
              <li onClick={() => handlePageNav(page + 1)} className={`md:block hidden md:text-2xl text-sm font-semibold hover:cursor-pointer text-secondary`}>Next Page{'>'}</li>
            </ul>
            <Button variant={'link'} onClick={() => window.scrollTo(0,0)} className='md:text-2xl text-lg font-bold hover:cursor-pointer'>Back to Top</Button>
          </div>
          )
        }
      </div>
  )
}

export default BrowsePage