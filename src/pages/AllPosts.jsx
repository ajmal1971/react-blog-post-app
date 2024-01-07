import {useState, useEffect} from 'react';
import {Container, PostCard} from "../components/index";
import blogService from '../appwrite/blog.service';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        blogService.getPosts([]).then(res => {
            if (res.documents) {
                setPosts(res.documents);
            }
        })
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        posts.map(item => (
                            <div key={item.$id} className='p-2 w-1/4'>
                                <PostCard {...item}/>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    );
};

export default AllPosts;