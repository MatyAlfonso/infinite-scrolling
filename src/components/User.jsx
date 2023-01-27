export const User = ({ firstName, lastName, image }) => {
    return (
        <div className='flex justify-center'>
            <div className='bg-blue-200 m-4'>
                <p className='p-4 text-center text-3xl text-white font-bold'>{firstName} {lastName}</p>
                <img src={image} alt={`A profile picture from ${firstName + " " + lastName}`} />
            </div>
        </div>
    )
}
