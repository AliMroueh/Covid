import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getCovidData } from '../actions/covidActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Nav from '../components/Nav';
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

export default function Home() {
  const dispatch = useDispatch();
  const CovidData = useSelector(state => state.CovidData);
  const {loading, CovData, error} = CovidData;

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  let dates = [];

  useEffect(() => {
    dispatch(getCovidData())
  }, [dispatch]);

  if(!loading){
    CovData?.map(cov => dates.push(cov.date))
  }

  let AllCases = []
  selected.length > 0 && (AllCases = CovData?.filter(cov => cov.date === selected))
  console.log(AllCases)

  // if(document.getElementsByClassName("w-72 font-medium h-auto")){
  // console.log(document.getElementsByClassName("w-72 font-medium h-auto")?.innerHTML)
  // }
  return (
    <div>
      <Nav />
      <div className="bg-cyan-900 flex flex-col justify-center h-screen pt-20 overflow-auto rounded-lg shadow">
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      
     {/* Start select box */}
     <div className="w-72 font-medium h-auto items-center self-center">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected.slice(0,10)
          : "Select Year"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter date"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {dates?.map((date,index) => (
          <li
            key={index}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              date?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              date?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (date?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(date);
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {date.slice(0,10)}
          </li>
        ))}
      </ul>
    </div>
     {/* End select box */}
      
        <table className='shadow-2x1 font-[Poppins] border-2 border-cyan-200 w-11/12 mx-auto'>
          <thead className='text-white'>
            <tr>
          <th className='py-3 bg-cyan-800'>Hospital cases</th>
          <th className='py-3 bg-cyan-800'>Propable cases</th>
          <th className='py-3 bg-cyan-800'>Propable death</th>
          <th className='py-3 bg-cyan-800'>Confirm cases</th>
          <th className='py-3 bg-cyan-800'>Confirm death</th>
          <th className='py-3 bg-cyan-800'>Total cases</th>
          <th className='py-3 bg-cyan-800'>Total deaths</th>
          <th className='py-3 bg-cyan-800'>case 0-9</th>
          <th className='py-3 bg-cyan-800'>case 80-older</th>
          </tr>
          </thead>
          <tbody>
            {AllCases?.map((casee,index) => 
              <tr key={index} className='hover:bg-cyan-100 bg-cyan-300 cursor-pointer duration-300'>
                <td className='py-3 px-6'>{casee.hospitalizedcases}</td>
                <td className='py-3 px-6'>{casee.probablecases}</td>
                <td className='py-3 px-6'>{casee.probabledeaths}</td>
                <td className='py-3 px-6'>{casee.confirmedcases}</td>
                <td className='py-3 px-6'>{casee.confirmeddeaths}</td>
                <td className='py-3 px-6'>{casee.totalcases}</td>
                <td className='py-3 px-6'>{casee.totaldeaths}</td>
                <td className='py-3 px-6'>{casee.cases_age0_9}</td>
                <td className='py-3 px-6'>{casee.cases_age80_older}</td>
            </tr>
              )}
            {/* <tr className='hover:bg-cyan-100 bg-cyan-300 cursor-pointer duration-300'>
              <td className='py-3 px-6'>smith</td>
              <td className='py-3 px-6'>3</td>
              <td className='py-3 px-6'>sm</td>
              <td className='py-3 px-6'>yoga</td>
              <td className='py-3 px-6'>boga</td>
              <td className='py-3 px-6'>boga</td>
              <td className='py-3 px-6'>boga</td>
              <td className='py-3 px-6'>boga</td>
              <td className='py-3 px-6'>boga</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      </div>
  )
}
