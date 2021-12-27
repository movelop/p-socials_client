import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import { MasonryLayout, Spinner } from '.';

const Feed = () => {
    const [pins, setPins] = useState(null)
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);

       if(categoryId){
        const query = searchQuery(categoryId);
        client.fetch(query)
            .then((data) => {
                setPins(data);
                setLoading(false);
            })
       } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            })
       } 
    }, [categoryId]);

    const ideaName = categoryId || 'new';

    if(loading) return <Spinner message = {`We are adding ${ideaName} ideas to your feed!`} />
    if(!pins?.length) return (
        <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
            No Pins Available!
        </div>
    )

    return (
        <div>
            {pins && <MasonryLayout pins = {pins} />}
        </div>
    )
}

export default Feed
