import React, { useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeFirebase } from '../firebase/config';

const ClientDashboard = () => {
    const [clientData, setClientData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const app = initializeFirebase();
        const auth = getAuth(app);
        const db = getFirestore(app);

        const fetchClientData = async () => {
            const currentUser = auth.currentUser;

            if (currentUser) {
                try {
                    const docRef = doc(db, "clients", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setClientData(docSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching client data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchClientData();
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-content">
                <h2>Client Dashboard</h2>
                {loading ? (
                    <p>Loading your information...</p>
                ) : clientData ? (
                    <div className="client-info">
                        <p><strong>Name:</strong> {clientData.firstName} {clientData.lastName}</p>
                        <p><strong>Email:</strong> {clientData.email}</p>
                        <p><strong>Business Name:</strong> {clientData.businessName}</p>
                        <p><strong>Business Type:</strong> {clientData.businessType}</p>
                        {clientData.companyWebsite && 
                            <p><strong>Company Website:</strong> 
                                <a href={clientData.companyWebsite} target="_blank" rel="noopener noreferrer"> {clientData.companyWebsite}</a>
                            </p>}
                        <p><strong>Registration Year:</strong> {clientData.registrationYear}</p>
                        <p><strong>Unique ID:</strong> {clientData.uniqueNumber}</p>
                    </div>
                ) : (
                    <p>Could not load client information.</p>
                )}
            </div>
        </div>
    );
};

export default ClientDashboard;
