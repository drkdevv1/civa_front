import React, { useEffect, useState } from 'react';
import { getBusDetails } from '../../requests/api/bus';
import { Bus } from '../../interfaces/Bus';
import '../BusModal/BusModal.css';
import {
    FiX, FiLoader, FiAlertTriangle,
    FiCheckCircle, FiXCircle, FiHash, FiCreditCard,
    FiCalendar, FiLayers, FiTag, FiMessageSquare
} from 'react-icons/fi';
import { FaBus } from 'react-icons/fa';

interface BusModalProps {
    busId: number;
    onClose: () => void;
}

// Función auxiliar para formatear la fecha desde el array
const formatDate = (dateArray: number[] | string) => {
    if (Array.isArray(dateArray) && dateArray.length >= 6) {
        // Si es un array, extraer los componentes [año, mes, día, hora, minuto, segundo]
        const [year, month, day, hour, minute] = dateArray;

        const date = new Date(year, month - 1, day, hour, minute);

        // Formatear la fecha para español
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (typeof dateArray === 'string') {
        const date = new Date(dateArray);

        if (isNaN(date.getTime())) {
            return "Fecha no disponible";
        }

        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return "Fecha no disponible";
};

const BusModal: React.FC<BusModalProps> = ({ busId, onClose }) => {
    const [bus, setBus] = useState<Bus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const data = await getBusDetails(busId);
                setBus(data);
            } catch (error) {
                console.error('Error fetching bus details:', error);
                setError('Error al cargar los detalles del bus');
            } finally {
                setLoading(false);
            }
        };

        fetchBusDetails();
    }, [busId]);

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>
                        <FaBus size={18} />
                        Detalles del Bus
                    </h2>
                    <button className="close-button" onClick={onClose}>
                        <FiX size={20} />
                    </button>
                </div>

                <div className="modal-content">
                    {loading ? (
                        <div className="loading-message">
                            <FiLoader size={30} className="spinner" />
                            <span>Cargando detalles...</span>
                        </div>
                    ) : error ? (
                        <div className="error-message">
                            <FiAlertTriangle size={18} />
                            {error}
                        </div>
                    ) : bus ? (
                        <div className="bus-details">
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FiHash size={16} style={{ marginRight: '5px' }} />
                                    ID:
                                </span>
                                <span className="detail-value">{bus.id}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FaBus size={16} style={{ marginRight: '5px' }} />
                                    Número de Bus:
                                </span>
                                <span className="detail-value">{bus.numeroBus}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FiCreditCard size={16} style={{ marginRight: '5px' }} />
                                    Placa:
                                </span>
                                <span className="detail-value">{bus.placa}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FiCalendar size={16} style={{ marginRight: '5px' }} />
                                    Fecha Creación:
                                </span>
                                <span className="detail-value">
                                    {formatDate(bus.fechaCreacion)}
                                </span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FiTag size={16} style={{ marginRight: '5px' }} />
                                    Marca:
                                </span>
                                <span className="detail-value">{bus.marcaNombre}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-label">
                                    <FiLayers size={16} style={{ marginRight: '5px' }} />
                                    Estado:
                                </span>
                                <span className={`status-badge ${bus.activo ? 'active' : 'inactive'}`}>
                                    {bus.activo ? (
                                        <>
                                            <FiCheckCircle size={14} />
                                            Activo
                                        </>
                                    ) : (
                                        <>
                                            <FiXCircle size={14} />
                                            Inactivo
                                        </>
                                    )}
                                </span>
                            </div>
                            <div className="detail-row features">
                                <span className="detail-label">
                                    <FiMessageSquare size={16} style={{ marginRight: '5px' }} />
                                    Características:
                                </span>
                                <span className="detail-value">{bus.caracteristicas}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="error-message">
                            <FiAlertTriangle size={18} />
                            No se encontraron detalles del bus
                        </div>
                    )}
                </div>

                <div className="modal-footer">
                    <button className="close-modal-button" onClick={onClose}>
                        <FiX size={16} />
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusModal;