import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import LogoLink from '../../Buttons/LogoLink'
import Toggle from '../../Language/Toggle'
import Text from '../../Text'


interface INavLeftDesktop {
    currentPage: "home" | "group" | ''
    groupRoute: string,
    setShowLogoutModal: Dispatch<SetStateAction<boolean>>
}

const NavLeftDesktop:React.FC<INavLeftDesktop> = ({currentPage,groupRoute, setShowLogoutModal}) => {


    return (
        <div className='fixed top-0 left-0 h-full flex flex-end pr-5 py-16 border-r border-gray-200 w-3/12 xl:pr-10'>
            
            <div className='flex flex-col h-full ml-auto'>
                <div className='w-28'>
                        <LogoLink yellow={true} />  

                </div>
                <div className='mt-16'>

                <Toggle />
                </div>
  
            <div className='flex flex-col mt-16'>
                <Link href='/'>
                    <a className={`flex mb-5 lg:hover:scale-105  ${currentPage === "home" && 'font-bold'}`}>
                        <Text type='label' textEng='Home' textKor='홈' />
                    </a>
                </Link>

                <Link href={groupRoute}>
                    <a className={`flex lg:hover:scale-105   ${currentPage === "group" && 'font-bold'}`}>
                        <Text type='label' textEng='Group' textKor='그룹' />
                    </a>
                </Link>
            </div>

            <button className=' mt-auto text-left flex lg:hover:scale-105 ' onClick={()=> setShowLogoutModal(true)}>
                <Text type='label' textEng='Sign Out' textKor='로그아웃' />
            </button>
            </div>
        </div>
    )
}

export default NavLeftDesktop
