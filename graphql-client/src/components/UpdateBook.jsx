import { useState, useEffect} from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom'; 

const UPDATE_BOOK = gql`
    mutation UpdateBook($id: ID!, $title: String!, $author: String!){ 
        updateBook(id: $id, title: $title, author: $author){
            id
            title
            author
        }
    }
`;

const GET_BOOK = gql`
    query GetBook($id: ID!){
        book(id: $id){ 
            id
            title
            author
        }
    }
`;



function UpdateBook() {
    const { id } = useParams();
    const { loading, error, data, refetch } = useQuery(GET_BOOK, { variables: {id}});
    const [updateBook] = useMutation(UPDATE_BOOK);

    const [ bookData, setBookData] = useState({ title: '', author : ''});

    const handleBookUpdate = async(id, title, author) => {
        await updateBook({ variables: {id, title, author}});
        refetch();
        navigate('/');
    } 
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.book) {
            setBookData({ title: data.book.title, author: data.book.author });
        }
    }, [data]);

    return (
        <>
            {data?.book ? (
                <div>
                <h2> Update</h2>
                <label for="title">Title: </label>
                <input type="text"
                    value={bookData.title}
                    placeholder={data?.book?.title}
                    onChange={(e) => setBookData({ ...bookData, title: e.target.value })}
                    />
                <br></br>
                <label for="author">Author: </label>
                <input type="text"
                    value={bookData.author}
                    onChange={(e) => setBookData({ ...bookData, author: e.target.value })}/>
                <br></br>
                <button onClick={() => handleBookUpdate(id, bookData.title, bookData.author)}>Save Changes</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
            ) : (
                <p> Book not found</p>
            )}
        </>
    )
}

export default UpdateBook;