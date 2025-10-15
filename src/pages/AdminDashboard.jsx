import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from '../firebase/config';

const AdminDashboard = () => {
    const [clients, setClients] = useState([]);
    const [content, setContent] = useState({});
    const [firebaseApp, setFirebaseApp] = useState(null);

    useEffect(() => {
        const initFirebase = async () => {
            const app = await initializeFirebase();
            setFirebaseApp(app);
        };
        initFirebase();
    }, []);

    useEffect(() => {
        if (firebaseApp) {
            const db = getFirestore(firebaseApp);

            const fetchClients = async () => {
                const clientsCollection = collection(db, "clients");
                const clientsSnapshot = await getDocs(clientsCollection);
                const clientsData = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setClients(clientsData);
            };

            const fetchContent = async () => {
                const contentCollection = collection(db, "content");
                const contentSnapshot = await getDocs(contentCollection);
                const contentData = contentSnapshot.docs.reduce((acc, doc) => {
                    acc[doc.id] = doc.data().value;
                    return acc;
                }, {});
                setContent(contentData);
            };

            fetchClients();
            fetchContent();
        }
    }, [firebaseApp]);

    const handleContentChange = (e) => {
        const { name, value } = e.target;
        setContent(prevContent => ({ ...prevContent, [name]: value }));
    };

    const handleContentUpdate = async (e) => {
        e.preventDefault();
        const db = getFirestore(firebaseApp);
        for (const key in content) {
            const docRef = doc(db, "content", key);
            await updateDoc(docRef, { value: content[key] });
        }
        alert('Content updated successfully!');
    };

    if (!firebaseApp) {
        return <div class='suspense-loading'>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h2>Admin Dashboard</h2>

                <h3>Website Content Management</h3>
                <form onSubmit={handleContentUpdate} className="content-form">
                    <div className="form-group">
                        <label htmlFor="homeTitle">Home Page Title:</label>
                        <input
                            type="text"
                            id="homeTitle"
                            name="homeTitle"
                            value={content.homeTitle || ''}
                            onChange={handleContentChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="aboutText">About Page Text:</label>
                        <textarea
                            id="aboutText"
                            name="aboutText"
                            value={content.aboutText || ''}
                            onChange={handleContentChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update Content</button>
                </form>

                <h3>Client Data</h3>
                <div className="table-container">
                    <table className="client-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Business Name</th>
                                <th>Business Type</th>
                                <th>Company Website</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>{client.businessName}</td>
                                    <td>{client.businessType}</td>
                                    <td>
                                        {client.companyWebsite ? 
                                            <a href={client.companyWebsite} target="_blank" rel="noopener noreferrer">{client.companyWebsite}</a> : 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
