import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'

const MyBlogs = () => {
    return (
        <div style={{
            width: "25rem",
            minHeight: "32rem",
            marginBottom: "3rem",
            marginTop: "1rem",
            cursor: "default", border: "2px solid #acb7c4", transition: "0s"
        }} className=" bg-[#b6cc8f] rounded-lg relative" >

            <div style={{ display: "flex", backgroundColor: "#acb7c4", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", padding: "0.25rem", alignItems: "center", gap: "0.5rem", paddingLeft: "1rem", flexWrap: "wrap", justifyContent: "space-between" }}>
                <div className='flex gap-4'>
                    <Skeleton count={1} height={30} width={30} className='rounded-full object-cover' />
                    <Skeleton count={1} height={20} width={100} />
                </div>
                <div className='flex gap-4'>
                    <Skeleton count={1} width={75} height={25} />
                    <Skeleton count={1} width={75} height={25} />
                </div>
            </div>

            <div className='px-5'>
                <div className='py-[1rem]'>
                    <Skeleton count={1} height="14rem" width="full" />
                </div>

                <Skeleton count={1} height={20} width={75} className='py-3' />

                <Skeleton count={1} height={20} width={150} className='py-3' />

                <Skeleton count={3} height={15} width="full" />

                <div className="flex justify-between sm:absolute sm:bottom-0 sm:left-[1rem] sm:w-[90%] pb-2" >
                    <Skeleton width={75} height={20} />
                    <Skeleton width={75} height={20} />
                </div>
            </div>

        </div>
    )
}

const MyBlogsSkeleton = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000)
    }, [])

    return (
        <>
            {
                loading ? <>
                    <MyBlogs />
                    <MyBlogs />
                    <MyBlogs />
                    <MyBlogs />
                    <MyBlogs />
                    <MyBlogs />
                </> : <section className='flex flex-col gap-5 py-5 w-full bg-white items-center'>
                    <h1 className='text-3xl uppercase text-center text-red-500 font-bold'>You haven't created any Blogs Yet</h1>
                    <Link className='p-2 bg-violet-500 rounded-md text-white' to={'/createBlog'}>Create Blog</Link>
                </section>
            }

        </>
    )
}

export default MyBlogsSkeleton