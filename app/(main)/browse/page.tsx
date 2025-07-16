'use client'
import CardSkeleton from '@/components/CardSkeleton';
import DrinkCard from '@/components/DrinkCard';
import Loading from '@/components/Loading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabaseClient';
import { Drink } from '@/types'
import { useState, useEffect, useRef, useCallback } from 'react'

const LIMIT = 20; // Amount to retrieve each fetch

const Browse = () => {
  const [drinkList, setDrinkList] = useState<Drink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("")
  const [filters, setFilters] = useState<string[]>([])

  // Pages
  const [totalPages, setTotalPages] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [pageList, setPageList] = useState<(number | string)[]>([])

  const handlePageNav = (index: number) => {
    if (index < 1 || index > totalPages) {
      return;
    }
    setPage(index)
    getPagination(index, totalPages)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const getPagination = (currentPage: number, totalPages: number) => {
    const maxButtons = 10; // You can adjust this
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
        .select('*, DrinkIngredients(*)', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching count:', error.message);
        return;
      }

      const pages = Math.ceil((count ?? 0) / LIMIT);
      setTotalPages(pages);
      getPagination(page, pages)
    };

    fetchTotalPages();
  }, []);

  useEffect(() => {

    const getDrinks = async () => {
      setLoading(true)
      const start = (page - 1) * LIMIT
      const end = start + LIMIT - 1
      const { data, error } = await supabase.from("drinks").select("*, DrinkIngredients(*)").range(start, end);

      if (error) {
        console.log("Error:", error.message);
      }
      else {
        setDrinkList(data);
      }

      setLoading(false)
    }

    getDrinks();
  }, [page])


  return (
    <div className='flex flex-col justify-center items-center gap-y-7'>

      {/* Search Bar */}
      <div className='flex justify-center items-center gap-x-3'>
        <Label htmlFor='search' className='text-3xl text-blue-300'>Search:</Label>
        <Input type='text' name='search' id='search' className='bg-gray-900 text-blue-300 placeholder:text-gray-400 placeholder:text-xl md:text-xl w-sm h-12' placeholder='Ex: Mojito' />
      </div>

      {/* Drink List */}
      <div className='flex-1 flex flex-wrap justify-center items-center gap-10'>
        {loading ?
          Array(18).fill(0).map((_, index) => (
            <CardSkeleton key={index} />
          ))
          : drinkList.map((drink, index) => (
            <DrinkCard {...drink} key={index} />
          ))}

      </div>

        {!loading && totalPages > 0 && 
        <ul className='flex justify-center items-center gap-x-5'>
          <li onClick={() => handlePageNav(page - 1)} className={`text-2xl font-semibold hover:cursor-pointer text-secondary`}>{'<'}Prev Page</li>
          {pageList.map((p, index) => {
            
            if (typeof p !== 'number')
              return <li key={index} className={`text-2xl font-semibold hover:cursor-pointer text-secondary`}>{p}</li>

            return (
            <li onClick={() => handlePageNav(p)} key={index} className={`underline text-2xl font-semibold hover:cursor-pointer ${page === p ? 'text-primary' : 'text-secondary'}`}>{p}</li>
          )})}
          <li onClick={() => handlePageNav(page + 1)} className={`text-2xl font-semibold hover:cursor-pointer text-secondary`}>Next Page {'>'}</li>
        </ul>
        }
    </div>
  )
}

export default Browse