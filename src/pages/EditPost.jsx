import {useState, useEffect} from 'react';
import { Container, PostForm } from '../components/index';
import blogService from '../appwrite/blog.service';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [post, setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            blogService.getPost(slug).then(post => {
                if (post) {
                    setPost(post);
                }
            });
        }
    }, [slug, navigate]);

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null;
};

export default EditPost;