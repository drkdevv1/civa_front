import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Buses/Buses.css';
import { useAuth } from '../../../context/AuthContext';
import { getBuses } from '../../../requests/api/bus';
import BusesTable from '../../../components/BusesTable/BusesTable';
import BusModal from '../../../components/BusModal/BusModal';
import { Bus } from '../../../interfaces/Bus';
import { FiLogOut, FiAlertCircle, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';

const Buses: React.FC = () => {
    const [buses, setBuses] = useState<Bus[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedBusId, setSelectedBusId] = useState<number | null>(null);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchBuses = async () => {
        setLoading(true);
        try {
            const data = await getBuses(currentPage);
            setBuses(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching buses:', error);
            setError('Error al cargar los buses. Por favor intenta nuevamente.');

            if ((error as Error).message?.includes('401')) {
                logout();
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBuses();
    }, [currentPage]);

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
    };

    const handleViewDetails = (busId: number) => {
        setSelectedBusId(busId);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBusId(null);
    };

    const handleSignOut = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="buses-container">
            <div className="buses-header">
                <h1 className="buses-title">
                    <FaBus size={24} />
                    Listado de Buses
                </h1>
                <button onClick={handleSignOut} className="sign-out-button">
                    <FiLogOut size={16} />
                    Cerrar Sesión
                </button>
            </div>

            {error && (
                <div className="error-message">
                    <FiAlertCircle size={18} />
                    {error}
                </div>
            )}

            <BusesTable
                buses={buses}
                loading={loading}
                onViewDetails={handleViewDetails}
            />

            <div className="pagination-controls">
                <div className="page-info">
                    Página {currentPage + 1} de {totalPages}
                </div>
                <div className="pagination-buttons">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 0}
                        className={`pagination-button ${currentPage === 0 ? 'disabled' : ''}`}
                    >
                        <FiChevronLeft size={16} />
                        Anterior
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage + 1 >= totalPages}
                        className={`pagination-button ${currentPage + 1 >= totalPages ? 'disabled' : ''}`}
                    >
                        Siguiente
                        <FiChevronRight size={16} />
                    </button>
                </div>
            </div>

            {showModal && selectedBusId && (
                <BusModal
                    busId={selectedBusId}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default Buses;