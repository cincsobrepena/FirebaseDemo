// import { Link } from 'react-router-dom'
// import {getDocs, collection, deleteDoc, doc, onSnapshot} from 'firebase/firestore';
// import {db} from '../firebase/config'
// import { useEffect,useState } from 'react';
// import DeleteIcon from '../assets/delete.svg'
// import UpdateIcon from '../assets/update.svg'

// // styles
// import './Home.css'

// export default function Home() {

//   const [articles, setArticles] = useState(null);

//   useEffect(() => {
//     const ref = collection(db, 'articles');
//     // onSnapshot(ref, (snapshot)=>{
//     //     console.log(snapshot);
//     //     let results = []
//     //      snapshot.docs.forEach(doc => {
//     //        results.push({id: doc.id, ...doc.data()});
//     //      });
//     //     setArticles(results);
//     //   })

//     getDocs(ref)
//       .then((snapshot)=>{
//         let results = []
//         console.log(snapshot)
//         snapshot.docs.forEach(doc => {
//           results.push({id: doc.id, ...doc.data()});
//         });
//         setArticles(results);
//       })    
//   },[])

//   const handleUpdate = async (id) => {
//     // const ref = doc(db, 'articles', id)
//     // await deleteDoc(ref);
//   }
  
//   const handleDelete = async (id) => {
//     const ref = doc(db, 'articles', id)
//     await deleteDoc(ref);
//   }
  
//   return (
//     <div className="home">
//       <h2>Articles</h2>      
//       {articles && articles.map(article => (
//         <div key={article.id} className="card">
//           <h3>{article.title}</h3>
//           <p>Written by {article.author}</p>
//           <Link to={`/articles/${article.id}`}>Read More...</Link>
//           <img 
//             className="icon"
//             onClick={() => handleDelete(article.id)}
//             src={DeleteIcon} alt="delete icon" 
//           />
//           <img 
//             className="icon"
//             onClick={() => handleDelete(article.id)}
//             src={UpdateIcon} alt="update icon" 
//           />
//         </div>
//       ))}
//     </div>
//   )
// }


import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';
import DeleteIcon from '../assets/delete.svg';
import UpdateIcon from '../assets/update.svg';
import UpdateForm from './FormArticle.js';

// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  useEffect(() => {
    const ref = collection(db, 'articles');
    getDocs(ref)
      .then((snapshot) => {
        let results = [];
        snapshot.docs.forEach(doc => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setArticles(results);
      })
  }, [])

  const handleUpdate = (article) => {
    setShowUpdateForm(true);
    setCurrentArticle(article);
    setUpdatedTitle(article.title);
    setUpdatedAuthor(article.author);
    setUpdatedDescription(article.description);
  }

  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
    await deleteDoc(ref);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const ref = doc(db, 'articles', currentArticle.id);
    await updateDoc(ref, {
      title: updatedTitle,
      author: updatedAuthor,
      description: updatedDescription,
    });
    setShowUpdateForm(false);
    setCurrentArticle(null);
    setUpdatedTitle('');
    setUpdatedAuthor('');
    setUpdatedDescription('');
    // Refresh articles list
    const snapshot = await getDocs(collection(db, 'articles'));
    let results = [];
    snapshot.docs.forEach(doc => {
      results.push({ id: doc.id, ...doc.data() });
    });
    setArticles(results);
  }

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles && articles.map(article => (
        <div key={article.id} className="card">
          <h3>{article.title}</h3>
          <p>Written by {article.author}</p>
          <Link to={`/articles/${article.id}`}>Read More...</Link>
          <img
            className="icon"
            onClick={() => handleDelete(article.id)}
            src={DeleteIcon} alt="delete icon"
          />
          <img
            className="icon"
            onClick={() => handleUpdate(article)}
            src={UpdateIcon} alt="update icon"
          />
        </div>
      ))}
      {showUpdateForm && (
        <div className="create">
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowUpdateForm(false)}>&times;</span>
              <form onSubmit={handleFormSubmit}>
                <h3>Update Article</h3>

                <label>
                  <span>Title:</span>
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </label>
                <label>
                <span>Author:</span>
                  <input
                    type="text"
                    value={updatedAuthor}
                    onChange={(e) => setUpdatedAuthor(e.target.value)}
                  />
                </label>
                <label>
                <span>Description:</span>
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
