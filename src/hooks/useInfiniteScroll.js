import { useEffect, useState, useRef } from "react";

export const useInfiniteScroll = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [skip, setSkip] = useState(0);
    const [lastElement, setLastElement] = useState(null);

    const observer = useRef(
        new IntersectionObserver(
            (entries) => {
                const first = entries[0];
                if (first.isIntersecting) {
                    setSkip(prevSkip => prevSkip + 25);
                }
            })
    );

    const fetchUsers = () => {
        setLoading(true);
        fetch(`https://dummyjson.com/users?limit=25&skip=${skip}`)
            .then(response => response.json())
            .then(data => {
                setUsers(prevUsers => [...prevUsers, ...data.users]);
                setLoading(false);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        if (skip <= 75) {
            fetchUsers();
        }
    }, [skip]);


    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        }
    }, [lastElement]);

    return { loading, users, skip, setLastElement };
}