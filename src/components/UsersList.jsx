import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { User, LoadingSpinner } from './index';

export const UsersList = () => {

  const { loading, users, skip, setLastElement } = useInfiniteScroll();

  return (
    <div className='flex flex-wrap justify-center'>
      {
        users.map((user, i) => {
          return i === users.length - 1 && skip <= 75 ? (
            <div
              key={user.id}
              ref={setLastElement}
            >
              <User
                firstName={user.firstName}
                lastName={user.lastName}
                image={user.image}
              />
            </div>
          ) : (
            <User
              key={user.id}
              firstName={user.firstName}
              lastName={user.lastName}
              image={user.image}
            />
          )
        })
      }
      {
        loading &&
        <LoadingSpinner />
      }
    </div>
  )
}
