import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, updateProfile, deleteAccount, error } = useAuth();
    const navigate = useNavigate();
    
    const [name, setName] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [localError, setLocalError] = useState<string | null>(null);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);
        
        try {
            await updateProfile(name, email);
            setIsEditing(false);
        } catch (err) {
            console.log(err)
            setLocalError("Erreur lors de la mise à jour du profil");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            navigate("/");
        } catch (err) {
            console.log(err)
            setLocalError("Erreur lors de la suppression du compte");
        }
    };

    if (!user) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-warning">
                    Vous devez être connecté pour accéder à cette page.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h2>Profil Utilisateur</h2>
                            {!isEditing && (
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => setIsEditing(true)}
                                >
                                    Modifier
                                </button>
                            )}
                        </div>
                        <div className="card-body">
                            {(error || localError) && (
                                <div className="alert alert-danger">
                                    {error || localError}
                                </div>
                            )}
                            
                            {isEditing ? (
                                <form onSubmit={handleUpdateProfile}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Nom d'utilisateur</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="d-flex gap-2">
                                        <button 
                                            type="submit" 
                                            className="btn btn-success"
                                        >
                                            Enregistrer
                                        </button>
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setName(user.username);
                                                setEmail(user.email);
                                            }}
                                        >
                                            Annuler
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="row">
                                    <div className="col-12">
                                        <p><strong>Nom:</strong> {user.username}</p>
                                        <p><strong>Email:</strong> {user.email}</p>
                                    </div>
                                </div>
                            )}
                            
                            {!isEditing && !showDeleteConfirm && (
                                <div className="mt-4 pt-3 border-top">
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={() => setShowDeleteConfirm(true)}
                                    >
                                        Supprimer mon compte
                                    </button>
                                </div>
                            )}
                            
                            {showDeleteConfirm && (
                                <div className="mt-4 pt-3 border-top">
                                    <div className="alert alert-warning">
                                        <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                                        <div className="d-flex gap-2 mt-3">
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={handleDeleteAccount}
                                            >
                                                Confirmer la suppression
                                            </button>
                                            <button 
                                                className="btn btn-secondary" 
                                                onClick={() => setShowDeleteConfirm(false)}
                                            >
                                                Annuler
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 