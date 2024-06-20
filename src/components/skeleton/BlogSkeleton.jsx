import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Blog = () => {
    return (
        <div style={{ cursor: "default", border: "2px solid #acb7c4", position: "relative", borderRadius:"0.5rem" }} className=" bg-[#b6cc8f] w-full h-auto sm:w-[19rem] md:w-[21rem] sm:h-[29.5rem]" >

            <div style={{ display: "flex", backgroundColor: "#acb7c4", borderTopLeftRadius: "0.5rem", borderTopRightRadius: "0.5rem", padding: "0.25rem", alignItems: "center", gap: "1rem", paddingLeft: "1rem" }}>
                <Skeleton count={1} height={30} width={30} className='rounded-full object-cover' />
                <Skeleton count={1} height={20} width={100} />
            </div>

            <div className='px-5'>
                <div className='py-[1rem]'>
                    <Skeleton count={1} height="13rem" width="full" />
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

const BlogSkeleton = () => {
    return (

        <div className="sm:px-1 md:px-0 max-[640px]:w-[90%] sm:w-[100%] md:w-[95%] mx-auto flex py-4 flex-wrap gap-y-4 justify-around">
            <Blog />
            <Blog />
            <Blog />
            <Blog />
        </div>
    )
}

export default BlogSkeleton