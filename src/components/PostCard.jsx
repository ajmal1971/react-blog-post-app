/* eslint-disable react/prop-types */
import blogService from '../appwrite/blog.service';
import {Link} from 'react-router-dom';

const PostCard = ({$id, title, featuredimage}) => {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={blogService.getFilePreview(featuredimage)} alt={title} className='rounded-xl'/>
                </div>
                <h2 className='text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    );
};

export default PostCard;